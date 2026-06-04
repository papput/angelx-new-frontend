import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter, useSearchParams } from "next/navigation";
import api from "../api/axios";
import Toast from "./Toast";
import DeleteConfirmModal from "./DeleteConfirmModal"; // ✅ Import modal

import "./DepositRecharge.css";

import usdtLogo from "../assets/USDT_Logo.png";
import trc20Icon from "../assets/trc20.png";
import qrFallback from "../assets/qr.png";
import copy from "../assets/recharge/copy.png";
import warn from "../assets/recharge/warn_notice.png";
import alertIcon from "../assets/recharge/prompt.png";
import support from "../assets/exchange/customer.png";
import back from "../assets/base/arrow_back.png";
import LoaderSmall from "./LoaderSmall";
import { QRCodeCanvas } from "qrcode.react";

export default function DepositRecharge() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const depositId = searchParams.get("id");

  const [deposit, setDeposit] = useState(null);
  const [txid, setTxid] = useState("");

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });

  const [remaining, setRemaining] = useState("00:00:00");
  const [expired, setExpired] = useState(false);
  const [redirectFlag, setRedirectFlag] = useState(false);

  const [whatsAppConfig, setWhatsAppConfig] = useState(null);
  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    phone = phone.replace(/^\+/, ""); // remove + if exists

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const loadWhatsAppConfig = async () => {
      try {
        const res = await api.get("/auth/get-whatsapp");
        if (res.data?.success) {
          setWhatsAppConfig(res.data.data);
        }
      } catch (err) {
        console.log("Failed to load WhatsApp config:", err.message);
      } finally {
      }
    };

    loadWhatsAppConfig();
  }, []);

  /* -----------------------------------------------------
     TOAST
  ------------------------------------------------------ */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  /* -----------------------------------------------------
     FETCH DEPOSIT DETAILS
  ------------------------------------------------------ */
  useEffect(() => {
    const fetchDeposit = async () => {
      if (!depositId) {
        triggerToast("Invalid Deposit Id");
        setRedirectFlag(true);
        return;
      }

      try {
        const res = await api.get(`/deposit/${depositId}`);

        if (!res.data?.success || !res.data.data.deposit) {
          triggerToast("Invalid Deposit Id");
          setRedirectFlag(true);
          return;
        }

        const dp = res.data.data.deposit;
        setDeposit(dp);

        if (dp.status === "completed") triggerToast("Successfully deposited");
        if (dp.status === "awaiting_txid") triggerToast("Processing");
        if (dp.status === "expired") {
          triggerToast("Deposit Expired");
          setExpired(true);
        }
      } catch (err) {
        triggerToast("Invalid Deposit Id");
        setRedirectFlag(true);
      }
    };

    fetchDeposit();
  }, [depositId]);

  /* -----------------------------------------------------
     REDIRECT IF INVALID ID
  ------------------------------------------------------ */
  // useEffect(() => {
  //   if (!redirectFlag) return;
  //   const t = setTimeout(() => router.push("/deposit-usdt"), 1300);
  //   return () => clearTimeout(t);
  // }, [redirectFlag, navigate]);

  /* -----------------------------------------------------
     COUNTDOWN TIMER
  ------------------------------------------------------ */
  useEffect(() => {
    if (!deposit) return;

    const updateTimer = () => {
      const now = Date.now();
      const exp = new Date(deposit.expiresAt).getTime();
      const diff = exp - now;

      if (diff <= 0) {
        setRemaining("00:00:00");
        if (!expired) {
          setExpired(true);
          triggerToast("Deposit Expired");
        }
        return;
      }

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      setRemaining(`${h}:${m}:${s}`);
    };

    updateTimer();
    const t = setInterval(updateTimer, 1000);
    return () => clearInterval(t);
  }, [deposit, expired]);

  /* -----------------------------------------------------
     COPY FUNCTION
  ------------------------------------------------------ */
  const handleCopy = async (text) => {
    // Try modern clipboard API first
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        triggerToast("Copied");
        return;
      }
    } catch (err) {
      // fall back below
    }

    // Fallback for ALL mobile, iOS, older browsers & webviews
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      // Prevent mobile keyboard from opening
      textarea.setAttribute("readonly", "");

      // Required for iOS Safari to allow copy
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);

      // Select text
      textarea.select();
      textarea.setSelectionRange(0, text.length); // iOS support

      // Execute copy command
      const success = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (success) {
        triggerToast("Copied");
      } else {
        triggerToast("Failed to copy");
      }
    } catch (err) {
      triggerToast("Failed to copy");
    }
  };

  /* -----------------------------------------------------
     SUBMIT TXID
  ------------------------------------------------------ */
  const submitTxid = async () => {
    if (!txid.trim() || expired) return;

    try {
      const res = await api.post("/deposit/submit-txid", {
        depositId: deposit._id,
        txid: txid.trim(),
      });

      if (!res.data.success) {
        triggerToast(res.data.message || "Failed to submit TxID");
        return;
      }

      triggerToast("TXID Submitted Successfully");
      router.push("/deposit/list");
    } catch (err) {
      const msg = err.response?.data?.message;
      triggerToast(msg || "Failed to submit TxID");
    }
  };

  /* -----------------------------------------------------
     CANCEL DEPOSIT (API CALL)
  ------------------------------------------------------ */
  const confirmCancel = async () => {
    if (!deposit?._id) return;

    try {
      const res = await api.post(`/deposit/cancel/${deposit._id}`);
      if (res.data.success) {
        triggerToast("Deposit cancelled successfully");
        setModal({ open: false, id: null });

        // Refresh deposit or redirect
        setTimeout(() => {
          router.push("/deposit/list");
        }, 1200);
      } else {
        triggerToast(res.data.message || "Failed to cancel deposit");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to cancel deposit request";
      triggerToast(msg);
    }
  };

  /* -----------------------------------------------------
     LOADING / REDIRECT
  ------------------------------------------------------ */
  if (!deposit && !redirectFlag) {
    return <LoaderSmall show={true} />;
  }

  if (redirectFlag) {
    return (
      <>
        <Toast message={toastMsg} visible={toastVisible} />
        <div className="du-loading">Redirecting...</div>
      </>
    );
  }

  const status = deposit.status;
  const isPending = status === "pending" && !expired;
  const isCompleted = status === "completed";
  const [hh = "00", mm = "00", ss = "00"] = remaining.split(":");

  /* -----------------------------------------------------
     RENDER UI
  ------------------------------------------------------ */
  return (
    <div className="du-root">
      {/* HEADER */}
      <div className="du-topbar">
        <div className="du-back" onClick={() => router.back()}>
          <AppImage src={back} alt="QR" onClick={() => router.back()} />
        </div>
        <div className="du-title">Deposit USDT</div>
        <div className="du-icons">
          <AppImage src={alertIcon} className="du-alert" />
          <AppImage
            src={support}
            className="du-help"
            onClick={() => handleWhatsAppClick()}
          />
        </div>
      </div>

      <div className="du-wrap">
        <div className="du-head">Scan the QR code and pay</div>
        {/* import {QRCodeCanvas} from "qrcode.react"; */}
        <div className="du-qr">
          <div className="qr-box">
            <QRCodeCanvas
              value={deposit.methodId.address}
              size={150}
              level="H"
            />
          </div>
        </div>

        {/* TIMER */}
        <div className="du-timer">
          <div className="group">
            {hh.split("").map((d, i) => (
              <span key={i} className="box">
                <div className="border_line"></div>
                {d}
              </span>
            ))}
          </div>

          <span className="sep">:</span>

          <div className="group">
            {mm.split("").map((d, i) => (
              <span key={i} className="box">
                <div className="border_line"></div>
                {d}
              </span>
            ))}
          </div>

          <span className="sep">:</span>

          <div className="group">
            {ss.split("").map((d, i) => (
              <span key={i} className="box">
                <div className="border_line"></div>
                {d}
              </span>
            ))}
          </div>

          <span className="remain">remaining</span>
        </div>
        <p className="du-sub_top">
          If you have transaction fee, don't forget to add it. The transfer
          amount must match the deposit amount
        </p>
        {/* TXID INPUT */}
        <div className="txid-bar">
          <input
            value={txid}
            disabled={!isPending}
            placeholder="Please enter Txid"
            onChange={(e) => setTxid(e.target.value)}
          />

          <button
            disabled={!isPending || !txid.trim()}
            onClick={submitTxid}
            className={`txid-btn ${isPending && txid.trim() ? "on" : ""}`}
          >
            Submit
          </button>
        </div>
        <p className="du-sub">
          Your deposit USDT deposit will be immediately to your wallet once
          enter Txid
        </p>
        {/* CARD */}
        <div className="du-card">
          <div className="row.">
            <div className="label">Deposit amount</div>
            <div className="value icon">
              <AppImage src={usdtLogo} alt="usdt" />
              <span>{deposit.amount}</span>
            </div>
          </div>

          <div className="divider" />

          <div className="row col">
            <div className="label">Deposit address</div>
            <div className="mono">
              {deposit.methodId.address}
              <AppImage
                src={copy}
                className="copy"
                onClick={() => handleCopy(deposit.methodId.address)}
              />
            </div>
          </div>

          {/* Warning */}
          <div className="dep-warning">
            <span className="dep-warning-ic">
              <AppImage src={warn} alt="Deposit Banner" />
            </span>
            <div>
              Only support{" "}
              <span style={{ color: "red" }}>
                {deposit.methodId.networkCode}
              </span>
              , Any losses caused by your improper operation will be borne by
              yourself. Please operate with caution and double-check the
              recharge address carefully
            </div>
          </div>

          <div className="row col mt12">
            <div className="label">Deposit ID</div>
            <div className="mono">
              {deposit._id}
              <AppImage
                src={copy}
                className="copy"
                onClick={() => handleCopy(deposit.methodId.address)}
              />
            </div>
          </div>

          <div className="divider lg" />

          <div className="">
            <div className="label">Network</div>
            <div className="value icon">
              <AppImage src={trc20Icon} alt="net" />
              <span
                className="label"
                style={{
                  color: "black",
                  fontWeight: "lighter",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                }}
              >
                USDT–{deposit.methodId.networkCode}
              </span>
            </div>
          </div>

          <div className="divider sm" />

          <div className="">
            <div className="label">Create time</div>
            <div
              className="label"
              style={{
                color: "black",
                paddingTop: "7px",
                paddingBottom: "7px",
              }}
            >
              {new Date(deposit.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="du-only">
          • {deposit.methodId.networkCode}–USDT only
        </div>
      </div>

      {/* FOOTER BUTTON (Visible only for pending status) */}
      {isPending && (
        <div className="du-cancel-wrapper">
          <button
            className="du-cancel"
            onClick={() => setModal({ open: true, id: deposit._id })}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Confirm Cancel Modal */}
      <DeleteConfirmModal
        open={modal.open}
        accountNo={deposit?._id || ""}
        onClose={() => setModal({ open: false, id: null })}
        onConfirm={confirmCancel}
      />

      {/* ✅ Toast Popup */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
