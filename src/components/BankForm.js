import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import navigate hook
import api from "../api/axios"; // ✅ axios instance with token support
import "./BankForm.css";
import Toast from "./Toast";
import BackHeader from "./BackHeader";
import Header from "./Header";

export default function BankForm() {
  const router = useRouter(); // ✅ Initialize navigate
  const [accNo, setAccNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [name, setName] = useState("");

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const fieldsFilled =
    accNo.trim() !== "" && ifsc.trim() !== "" && name.trim() !== "";

  const isAccValid = /^[0-9]{5,18}$/.test(accNo);
  const isIFSCValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const isNameValid = name.trim().length >= 3;

  /* -------------------------------------------
     ✅ Toast utility
  ------------------------------------------- */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);

    setTimeout(() => {
      setToastVisible(true);
    }, 20);
  };

  /* -------------------------------------------
     ✅ Submit Handler (REAL BACKEND INTEGRATION)
  ------------------------------------------- */
  const handleSubmit = async () => {
    // Frontend validation first
    if (!isAccValid) return triggerToast("❌ Invalid Account Number");
    if (!isIFSCValid) return triggerToast("❌ Invalid IFSC Code");
    if (!isNameValid) return triggerToast("❌ Invalid Account Holder Name");

    try {
      const payload = {
        bankName: name, // ✅ Your backend expects bankName (not accName)
        accountNo: accNo,
        ifscCode: ifsc.toUpperCase(),
        accountName: name,
      };

      const res = await api.post("/exchange/methods", payload);

      if (res.data.success) {
        triggerToast("✅ Bank account added successfully");

        // ✅ Clear form
        setAccNo("");
        setIfsc("");
        setName("");
        // console.log(res.data?.data?.method?._id);
        localStorage.setItem("selected_bank_id", res.data?.data?.method?._id);

        // ✅ Redirect after short delay so user can see the toast
        setTimeout(() => {
          router.push("/sell-usdt");
        }, 1500);

        return;
      }

      triggerToast("❌ Something went wrong");
    } catch (err) {
      console.error("Bank add error:", err);

      const msg =
        err?.response?.data?.message ||
        "❌ Failed to add bank account. Try again.";

      triggerToast(msg);
    }
  };

  return (
    <>
      <Header title="Bind bank card" showBack showBackLink="/bank-card/list" />

      <div className="bank-page">
        {/* <BackHeader title="Bind bank card" /> */}

        {/* ✅ Toast Popup */}
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />

        <div className="field-row">
          <label>AccNo</label>
          <input
            type="text"
            placeholder="Please enter Account No"
            value={accNo}
            onChange={(e) => setAccNo(e.target.value)}
          />
        </div>

        <div className="separator" />

        <div className="field-row">
          <label>IFSC</label>
          <input
            type="text"
            placeholder="Please enter IFSC"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
          />
        </div>

        <div className="separator" />

        <div className="field-row">
          <label>AccName</label>
          <input
            type="text"
            placeholder="Please enter Payee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* ✅ Commit button */}
        <button
          className={`commit-btn ${fieldsFilled ? "enabled" : ""}`}
          disabled={!fieldsFilled}
          onClick={handleSubmit}
        >
          Commit
        </button>

        <p className="footer-note">
          Please check the information carefully before submission. If transfer
          issues occur due to incorrect information, it is the user's
          responsibility.
        </p>
      </div>
    </>
  );
}
