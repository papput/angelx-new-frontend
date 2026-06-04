import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import Toast from "../components/Toast";

import "./DepositUSDT.css";
import "./Global.css";

import TrxIcon from "../assets/recharge/TRX.png";
import EthIcon from "../assets/recharge/eth.png";
import SelectType from "../assets/recharge/select_type.png";
import tether from "../assets/recharge/usdt_icon.png";
import warn from "../assets/recharge/warn_notice.png";

import depositBanner from "../assets/deposit1.jpg";
import depositBg from "../assets/depositbg.jpg";
import eth from "../assets/recharge/eth.png";
import { useRouter } from "next/navigation";
import BackHeaderMain from "./BackHeaderMain";
import Loader from "./Loader";
import Header from "./Header";

export default function DepositUSDT() {
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [available, setAvailable] = useState(0);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();

  /* -------------------------------------------
      TOAST HANDLER
  ------------------------------------------- */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 50);
  };

  /* -------------------------------------------
      FETCH DEPOSIT METHODS
  ------------------------------------------- */
  const fetchMethods = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("user");
      const res = await api.get("/deposit/methods", {
        headers: {
          "x-user-id": userId,
        },
      });

      const arr = res.data?.data?.methods || [];
      setMethods(arr);

      if (arr.length > 0) setNetwork(arr[0].networkCode);
    } catch (err) {
      triggerToast("Failed to load deposit methods");
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/balance");
      if (res.data?.success) {
        setAvailable(Number(res.data.data.availableBalance || 0));
      }
    } catch (err) {
      triggerToast("Failed to load balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
    fetchBalance();
  }, []);

  /* -------------------------------------------
      FIND SELECTED METHOD
  ------------------------------------------- */
  const selectedMethod = methods.find((m) => m.networkCode === network);

  /* -------------------------------------------
      AMOUNT INPUT HANDLER
  ------------------------------------------- */
  const handleAmount = (e) => {
    let v = e.target.value;
    v = v.replace(/[^\d.]/g, ""); // only digits + dot
    v = v.replace(/(\..*)\./g, "$1"); // prevent double dots
    setAmount(v);
  };

  const amountNum = Number(amount || 0);
  const isAmountValid = amount.trim() !== "" && amountNum > 0;

  /* -------------------------------------------
      CHECK FOR UNFINISHED ORDER
  ------------------------------------------- */
  const checkUnfinished = async () => {
    try {
      const res = await api.get("/deposit/check-unfinished");

      // ✅ unfinished order exists
      if (!res.data.success) {
        triggerToast("You have unfinished orders");
        return false;
      }

      return true;
    } catch (err) {
      triggerToast("Failed to check unfinished orders");
      return false;
    }
  };

  /* -------------------------------------------
      SUBMIT DEPOSIT ORDER
  ------------------------------------------- */
  const submitDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAmountValid || !selectedMethod) return;

    // ✅ First check for unfinished orders
    const okToProceed = await checkUnfinished();
    if (!okToProceed) {
      setLoading(false);
      return;
    }

    // ✅ No unfinished → create deposit
    try {
      const res = await api.post("/deposit/create", {
        methodId: selectedMethod._id,
        amount: amountNum,
      });

      if (!res.data.success) {
        triggerToast(res.data.message || "Failed to create deposit");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS → redirect
      const depositId = res.data.data.deposit.id;
      window.location.href = `/recharge/detail?id=${depositId}`;
      setLoading(false);
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "You have unfinished orders") {
        triggerToast("You have unfinished orders");
      } else {
        triggerToast(msg || "Failed to create deposit");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------
      UI
  ------------------------------------------- */
  // if (loading) {
  //   return <Loader show={true} />;
  // }

  return (
    <>
      {loading && <Loader show={true} />}

      {/* <BackHeaderMain title="USDT Deposit" lastLink="/deposit/list" /> */}
      <Header
        title="USDT Deposit"
        showBack
        showBackLink="/exchange"
        showHistory
        historyLink="/deposit/list"
      />

      <div className="dep-page">
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />

        {/* Banner */}
        <div className="dep-banner">
          <AppImage src={depositBanner} alt="Deposit Banner" />
        </div>

        {/* Background Illustration */}
        <div className="dep-hero">
          <AppImage src={depositBg} alt="exchange" className="dep-hero-img" />

          {/* Deposit Card */}
          <form className="dep-card" onSubmit={submitDeposit}>
            {/* NETWORK */}
            <div className="dep-field">
              <label className="dep-label">network</label>

              <div className="dep-seg">
                {methods.map((m) => {
                  const isActive = network === m.networkCode;

                  return (
                    <button
                      key={m._id}
                      type="button"
                      onClick={() => setNetwork(m.networkCode)}
                      className={`dep-chip ${isActive ? "active" : ""}`}
                    >
                      <AppImage
                        src={m.networkCode === "TRC20" ? TrxIcon : EthIcon}
                        className="dep-chip-img"
                        alt=""
                      />

                      <span className="dep-chip-text">{m.networkCode}</span>

                      {isActive && (
                        <AppImage
                          src={SelectType}
                          alt=""
                          className="dep-chip-tick"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AMOUNT */}
            <div className="dep-field">
              <label className="dep-label">Amount</label>

              <div className="dep-input-wrap">
                <input
                  type="text"
                  value={amount}
                  inputMode="decimal"
                  onChange={handleAmount}
                  placeholder="Please enter the amount"
                  className="dep-input"
                />
                <div className="dep-input-suffix">
                  <AppImage src={tether} alt="load" />
                  <span className="dep-usdt-text">USDT</span>
                </div>
              </div>

              <div className="dep-hint-row">
                <div className="dep-hint">Available($) {available}</div>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className={`dep-btn ${isAmountValid ? "enabled" : "disabled"}`}
              disabled={!isAmountValid}
            >
              Deposit
            </button>

            {/* Warning */}
            <div className="dep-warning">
              <span className="dep-warning-ic">
                <AppImage src={warn} alt="Deposit Banner" />
              </span>
              <div>
                For the safety of your funds, the recharge address for each
                order is different. Please double-check carefully.
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
