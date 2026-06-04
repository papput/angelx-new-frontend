import React, { useState, useEffect } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";
import "./Global.css";
import "./WithdrawUSDT.css";

import usdtIcon from "../assets/USDT_Logo.png";
import payxIcon from "../assets/payx.jpg";
import addressIcon from "../assets/add.jpeg";
import Toast from "../components/Toast";

import FullPageLoader from "./Loader";
import BackHeaderMain from "./BackHeaderMain";
import depositBanner from "../assets/deposit1.jpg";
import addBankIcon from "../assets/exchange/add_bank.png";
import Header from "./Header";

export default function WithdrawUSDT() {
  const router = useRouter();

  const [currency, setCurrency] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState(null);
  const [walletsLoaded, setWalletsLoaded] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [available, setAvailable] = useState(0);
  const [limitBalance, setLimitBalance] = useState(0);

  const refundFee = 1;

  // 🔥 FIXED: enable button as soon as user types amount
  const canConfirm = amount && parseFloat(amount) > 0 && walletsLoaded; // wallet not required for enabling

  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  useEffect(() => {
    const selected = localStorage.getItem("selectedWallet");
    if (selected) {
      fetchWallets(selected);
    } else {
      fetchWallets(selected);
      setWallet(null);
      setWalletsLoaded(true);
    }
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/balance");
      if (res.data?.success) {
        setAvailable(Number(res.data.data.availableBalance || 0));
        setLimitBalance(Number(res.data.data.limitBalance || 0));
      }
    } catch (err) {
      triggerToast("Failed to load balance");
    } finally {
      setLoading(false);
    }
  };

  const fetchWallets = async (selectedAddr) => {
    setLoading(true);
    try {
      const res = await api.get("/wallet/list");
      if (res.data?.success) {
        const list = res.data.data.wallets || [];
        const found = list.find((w) => w.walletAddress === selectedAddr);
        setWallet(found || list[0] || null);

        const selected = localStorage.getItem("selectedWallet");
        if (!selected) {
          localStorage.setItem("selectedWallet", found || list[0] || null);
        }
      }
    } catch {
      setWallet(null);
    } finally {
      setWalletsLoaded(true);
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!canConfirm) return;

    if (!wallet) {
      triggerToast("Please add wallet address");
      return;
    }

    const withdrawAmt = parseFloat(amount);

    if (withdrawAmt > available) {
      triggerToast("Insufficient balance");
      return;
    }

    if (withdrawAmt < limitBalance) {
      triggerToast(`Minimum USDT should be ${limitBalance}`);
      return;
    }

    setShowPasswordModal(true);
  };

  const handleCloseModal = () => {
    setPassword("");
    setShowPasswordModal(false);
  };

  const handleKeyPress = (num) => {
    if (password.length < 6) setPassword((prev) => prev + num);
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (password.length === 6 && showPasswordModal) {
      submitWithdrawal();
    }
  }, [password]);

  const submitWithdrawal = async () => {
    setLoading(true);
    try {
      const res = await api.post("/withdraw/create", {
        walletId: wallet._id,
        amount: parseFloat(amount),
        transactionPassword: password,
      });

      if (res.data?.success) {
        triggerToast(res.data.message || "Withdrawal successful");
        handleCloseModal();
        fetchBalance();
        setTimeout(() => router.push("/withdraw-history"), 1500);
      } else {
        triggerToast(res.data?.message || "Withdrawal failed");
        setPassword("");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Server error, please retry";
      triggerToast(msg);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div
        className=""
        style={{
          padding: "0px 16px",
          position: "fixed",
          top: "0",
          backgroundColor: "white",
          width: "100%",
          zIndex: "99999",
        }}
      >
        <BackHeaderMain title="USDT Deposit" lastLink="/withdraw-history" />
      </div> */}

      <Header
        title="Withdraw USDT"
        showBack
        showBackLink="/exchange"
        showHistory
        historyLink="/withdraw-history"
      />

      <div className="withdraw-page">
        {/* GLOBAL LOADER */}
        <FullPageLoader show={loading} />

        {/* <div className="withdraw-header">
          <div className="back-arrow" onClick={() => router.back()}>
            ←
          </div>
          <h2 className="header-title">Withdraw USDT</h2>
          <div
            className="header-icon"
            onClick={() => {
              router.push("");
            }}
          >
            ⟳
          </div>
        </div> */}

        <div className="content_usdt-wrapper">
          {/* Banner */}
          <div className="dep-banner">
            <AppImage src={depositBanner} alt="Deposit Banner" />
          </div>

          <div className="content_usdt">
            <div className="select-address-header">
              <h3 className="section-title">Select address</h3>
              <AppImage
                src={addressIcon}
                alt="add address"
                className="address-add-icon"
                onClick={() => router.push("/withdraw/bind/bankCard")}
              />
            </div>

            <div className="currency-row">
              <label className="label">Currency</label>
              <div className="currency-options">
                <button
                  className={`currency-pill ${
                    currency === "PAYX" ? "active" : ""
                  }`}
                  onClick={() => setCurrency("PAYX")}
                >
                  <AppImage
                    src={payxIcon}
                    alt="PAYX"
                    className="currency-pill-icon"
                  />
                  PAYX
                </button>
                <button
                  className={`currency-pill ${
                    currency === "USDT" ? "active" : ""
                  }`}
                  onClick={() => setCurrency("USDT")}
                >
                  <AppImage
                    src={usdtIcon}
                    alt="USDT"
                    className="currency-pill-icon"
                  />
                  USDT
                </button>
              </div>
            </div>

            {walletsLoaded && (
              <>
                {!wallet ? (
                  <>
                    <div
                      className="add-bank-box"
                      onClick={() => router.push("/withdraw/bind/bankCard")}
                    >
                      <AppImage
                        src={addBankIcon}
                        alt="select"
                        // className="add-icon"
                        style={{ width: "20px" }}
                        onClick={() => router.push("/withdraw/bind/bankCard")}
                      />
                      <span className="add-bank-text">Add Wallet Address</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="wallet-block"
                    onClick={() => router.push("/withdraw/bankCard/list")}
                  >
                    <label className="withdraw-field-label">Wallet address</label>
                    <div className="wallet-field-line">
                      <div className="wallet-value">{wallet.walletAddress}</div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="amount-block">
              <label className="withdraw-field-label">Withdraw amount</label>
              <div className="amount-input-wrap">
                <input
                  type="number"
                  className="withdraw-amount-input"
                  placeholder="Please enter the amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="amount-unit">
                  <AppImage
                    src={usdtIcon}
                    alt="USDT"
                    className="currency-pill-icon"
                  />
                  <span className="amount-unit-text">USDT</span>
                </div>
              </div>
            </div>

            <div className="withdraw-meta">
              <div className="withdraw-meta-left">
                <div className="left">
                  <span className="blue">Available:</span>
                  <span className="bolder">{available.toFixed(2)}</span>
                  <AppImage
                    src={usdtIcon}
                    alt="usdt"
                    className="usdt-small"
                  />
                </div>
                {limitBalance ? (
                  <div className="left">
                    <span className="blue">Limit:</span>
                    <span className="bolder">{limitBalance}</span>
                    <AppImage
                      src={usdtIcon}
                      alt="usdt-small"
                      className="usdt-small"
                    />
                  </div>
                ) : null}
              </div>
              <div className="fee">Refund Fee: {refundFee} USDT</div>
            </div>

            <button
              className={`confirm-btn ${canConfirm ? "active" : ""}`}
              disabled={!canConfirm}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>

        {showPasswordModal && (
          <div className="password-overlay">
            <div className="password-modal">
              <div className="modal-header">
                <h3>Confirm transaction password</h3>
                <button className="close-btn" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p className="withdraw-info">
                  Withdraw for
                  <span className="withdraw-amt">
                    <AppImage
                      src={usdtIcon}
                      alt="usdt"
                      className="currency-pill-icon"
                    />{" "}
                    {amount}
                  </span>
                </p>
                <p className="refund-text">Refund Fee: {refundFee} USDT</p>

                <div className="password-dots">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`dot-box ${
                        i < password.length ? "filled" : ""
                      }`}
                    />
                  ))}
                </div>

                <div className="keypad">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map((key, i) => (
                    <button
                      key={i}
                      className={`key ${key === "del" ? "del" : ""}`}
                      onClick={() => {
                        if (typeof key === "number") handleKeyPress(key);
                        if (key === "del") handleDelete();
                      }}
                    >
                      {key === "del" ? "⌫" : key}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </div>
    </>
  );
}
