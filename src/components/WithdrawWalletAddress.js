import React, { useMemo, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";
import "./WithdrawWalletAddress.css";

import trc20Red from "../assets/trc20.png";
import Toast from "../components/Toast";
import Header from "./Header";

export default function WithdrawWalletAddress() {
  const router = useRouter();

  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => {
      setToastVisible(true);
    }, 50);
  };

  /* -----------------------------------------------------
     ✅ TRON / TRC20 ADDRESS VALIDATION (Base58, 34 chars)
  ------------------------------------------------------ */
  const isTronAddress = useMemo(() => {
    if (!addr) return false;
    const re = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
    return re.test(addr);
  }, [addr]);

  const canCommit = addr.trim().length > 0;

  /* -----------------------------------------------------
     ✅ Submit Wallet Address → Backend
  ------------------------------------------------------ */
  const onCommit = async () => {
    if (!canCommit) return;

    if (!isTronAddress) {
      triggerToast("Invalid TRC20 address");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/wallet/add", {
        currency: "USDT", // ✅ REQUIRED BY BACKEND
        walletAddress: addr.trim(), // ✅ REQUIRED BY BACKEND
      });

      if (!res.data.success) {
        triggerToast(res.data.message || "Failed to save wallet");
        setLoading(false);
        return;
      }

      triggerToast("Wallet address added successfully");

      setTimeout(() => {
        router.back(); // ✅ Go back after success
      }, 800);
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "Wallet address already exists") {
        triggerToast("Wallet address already exists");
      } else {
        triggerToast(msg || "Failed to add wallet");
      }
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------------------
     ✅ UI
  ------------------------------------------------------ */
  return (
    <>
      <Header
        title="Bind wallet address"
        showBack
        showBackLink="/withdraw/bankCard/list"
        // showHistory
        // historyLink="/exchange/list"
      />

      <div className="bind-root">
        

        <div className="bind-wrap">
          {/* NETWORK */}
          <div className="kv-row top">
            <div className="kv-label">Network</div>
            <div className="kv-value network">
              <AppImage src={trc20Red} alt="TRC20" />
              <span>TRC20–USDT</span>
            </div>
          </div>

          {/* INPUT BOX */}
          <div className="field">
            <label htmlFor="wallet" className="field-label">
              Wallet
              <br />
              address
            </label>

            <input
              id="wallet"
              className="field-input"
              placeholder="Please enter wallet address"
              value={addr}
              onChange={(e) => setAddr(e.target.value.trim())}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {/* COMMIT BUTTON */}
          <div className="Commit-wrapper">
            <button
              className={`commit ${canCommit ? "on" : ""}`}
              onClick={onCommit}
              disabled={!canCommit || loading}
            >
              {loading ? "Saving..." : "Commit"}
            </button>
          </div>

          {/* NOTE */}
          <p className="bind-note">
            Please check the information carefully before submission. If
            transfer issues occur due to incorrect information provided by user,
            it is the user's own responsibility.
          </p>
        </div>

        {/* TOAST POPUP */}
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </div>
    </>
  );
}
