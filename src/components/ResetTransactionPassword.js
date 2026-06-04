import React, { useState, useEffect } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";
import "./ResetTransactionPassword.css";
import Toast from "./Toast";

/* icons */
import shieldIcon from "../assets/add.jpeg";
import lockIcon from "../assets/add.jpeg";
import backArrow from "../assets/base/transcation_pwd_back.png";
import verity from "../assets/base/transaction_verity.png";
import pwd from "../assets/base/transaction_pwd.png";

export default function ResetTransactionPassword() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  // ✅ Send OTP from backend
  const sendOtp = async () => {
    try {
      const res = await api.post("/auth/send-tp-reset-otp");
      if (res.data.success) {
        triggerToast("OTP sent successfully");
        setTimer(60);
        setCanResend(false);
      } else {
        triggerToast(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      triggerToast(
        err.response?.data?.message || "Server error while sending OTP"
      );
    }
  };

  // ✅ Auto send OTP when page loads
  useEffect(() => {
    // sendOtp();
  }, []);

  // ✅ Countdown timer logic
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Resend OTP
  const handleResend = () => {
    sendOtp();
  };

  // ✅ Confirm reset transaction password
  const handleConfirm = async () => {
    if (otp.trim() === "" || password.trim() === "") {
      triggerToast("Please fill all fields");
      return;
    }
    if (!/^\d{6}$/.test(password)) {
      triggerToast("Password must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/verify-tp-reset", {
        otp,
        transactionPassword: password,
      });

      if (res.data.success) {
        triggerToast("Transaction password updated successfully!");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        triggerToast(res.data.message || "Failed to update password");
      }
    } catch (err) {
      triggerToast(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {/* Back */}
      <div className="reset-header">
        <button className="back-btn" onClick={() => router.push("/setting")}>
          <AppImage src={backArrow} alt="load" width={"24"} />
        </button>
        <h2 className="title">Reset Transaction Password</h2>
        <p className="subtitle">OTP sent to your registered mobile number</p>
      </div>

      {/* OTP Input */}
      <div className="input-box">
        <AppImage src={verity} alt="otp" className="input-icon" />
        <input
          type="number"
          placeholder="Please enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input-field"
        />
        {canResend ? (
          <span className="otp-action" onClick={handleResend}>
            Get
          </span>
        ) : (
          <span className="otp-timer">{timer}s</span>
        )}
      </div>

      {/* Transaction Password */}
      <div className="input-box">
        <AppImage src={pwd} alt="password" className="input-icon" />
        <input
          type="password"
          placeholder="Enter new 6-digit transaction password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
          className="input-field"
        />
      </div>

      <p className="note">Transaction password must be 6 digits only</p>

      <button
        className="confirm-btn"
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm"}
      </button>

      {/* Toast */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
