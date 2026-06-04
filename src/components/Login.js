import React, { useState, useEffect } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import "./Login.css";
import BackHeader from "./BackHeader";

import flag from "../assets/login/india.png";
import Loader from "./Loader";

import arrowBack from "../assets/base/arrow_back.png";
import "./BackHeader.css";

import Toast from "../components/Toast"; // ✅ IMPORT TOAST
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [pageState, setPageState] = useState("login");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  // Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const router = useRouter();
  const { refreshAuth } = useAuth();

  /* ------------------------------------------
        TOAST TRIGGER
  ------------------------------------------- */
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
  };

  /* ------------------------------------------
        TIMER LOGIC
  ------------------------------------------- */
  useEffect(() => {
    if (pageState !== "otp") return;
    if (timer === 0) return;

    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [pageState, timer]);

  /* ------------------------------------------
        SEND OTP
  ------------------------------------------- */
  const sendOtp = async () => {
    try {
      if (mobile.length !== 10) {
        triggerToast("Enter valid mobile number");
        return;
      }

      setLoading(true);
      setLoader(true);

      const res = await api.post("/auth/send-otp", { phone: mobile });

      if (!res.data.success) {
        triggerToast(res.data.message || "Failed to send OTP");
        return;
      }

      setPageState("otp");
      setTimer(60);
      setOtp("");
    } catch (err) {
      console.error("Send OTP Error:", err);
      triggerToast(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  /* ------------------------------------------
      VERIFY OTP (UPDATED)
------------------------------------------- */
  const verifyOtp = async () => {
    try {
      if (otp.length !== 6) {
        triggerToast("Enter valid OTP");
        return;
      }

      setLoading(true);
      setLoader(true);

      const res = await api.post("/auth/verify-otp", { phone: mobile, otp });

      if (!res.data.success) {
        triggerToast(res.data.message || "Invalid OTP");
        return;
      }

      const { token, data } = res.data;

      // Save login session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      refreshAuth();

      // Smooth redirect
      setTimeout(() => {
        router.push("/exchange");
      }, 600);
    } catch (err) {
      console.error("Verify OTP Error:", err);
      triggerToast(
        err.response?.data?.message || "Failed to verify OTP. Try again."
      );
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  /* ------------------------------------------
        HELPERS
  ------------------------------------------- */
  const maskNumber = (num) => {
    if (num.length !== 10) return num;
    return num.slice(0, 2) + "****" + num.slice(6);
  };

  const handleNext = () => {
    if (mobile.length === 10) sendOtp();
    else triggerToast("Enter valid 10 digit mobile number");
  };

  const handleResend = () => sendOtp();

  /* ------------------------------------------
        LOGIN SCREEN
  ------------------------------------------- */
  if (pageState === "login") {
    return (
      <div className="login-page">
        <div className="bh-header">
          <AppImage
            src={arrowBack}
            alt="Back"
            className="bh-back-icon"
            onClick={() => router.push("/exchange")}
          />
        </div>

        <div className="login-head">
          <h2 className="login-title">Login account</h2>
          <p className="login-subtitle">please enter mobile number</p>
        </div>

        <div className="login-input-box">
          <div className="login-input-row">
            <div className="login-flag-wrap">
              <AppImage
                src={flag}
                alt="Flag"
                style={{ width: "27px", paddingRight: "5px" }}
              />
              <span className="login-country">+91</span>
            </div>

            <div className="login-divider"></div>

            <input
              type="tel"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="login-input"
              placeholder="Enter number"
            />
          </div>
        </div>

        <div className="login-btn-wrap">
          <button
            onClick={handleNext}
            className={
              mobile.length === 10 ? "login-btn active" : "login-btn disabled"
            }
            disabled={loading}
          >
            Next
            {loading && <Loader show={true} />}
          </button>
        </div>

        {/* TOAST */}
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </div>
    );
  }

  /* ------------------------------------------
        OTP SCREEN
  ------------------------------------------- */
  return (
    <div className="otp-page">
      <div className="bh-header">
        <AppImage
          src={arrowBack}
          alt="Back"
          className="bh-back-icon"
          onClick={() => setPageState("login")}
        />
      </div>

      <h2 className="otp-title">Please enter SMS OTP</h2>

      <p className="otp-subtitle">
        SMS OTP sent to&nbsp;
        <span className="otp-number">+91 {maskNumber(mobile)}</span>
      </p>

      <div className="otp-input-box-wrapper">
        <div className="otp-input-box">
          <input
            type="tel"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
          />

          {timer > 0 ? (
            <span className="otp-timer-text">
              After <span className="otp-timer">{timer}s</span>
            </span>
          ) : (
            <button onClick={handleResend} className="otp-get-btn">
              Resend
            </button>
          )}
        </div>
      </div>

      <div className="otp-btn-wrapper">
        <button
          onClick={verifyOtp}
          className={otp.length === 6 ? "otp-btn active" : "otp-btn disabled"}
          disabled={loading}
        >
          Confirm
        </button>
      </div>

      <Loader show={loader} />

      {/* TOAST */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
