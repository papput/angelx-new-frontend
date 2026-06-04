import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import "./TransactionDetails.css";
import { useSearchParams } from "next/navigation";
import api from "../api/axios";

/* Icons */
import approvedIcon from "../assets/exchange/approved.png";
import processingIcon from "../assets/exchange/processing.png";
import copyIcon from "../assets/recharge/copy.png";
import copyIconWhite from "../assets/exchange/utr_copy.png";
import trade from "../assets/exchange/trade.png";
import usdtIcon from "../assets/USDT_Logo.png";

import Header from "./Header";
import Toast from "./Toast";
import LoaderSmall from "./LoaderSmall";

export default function TransactionDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  // 🔥 Toast State
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const res = await api.get(`/exchange/details/${id}`);
      setData(res.data.data || null);
    } catch (e) {
      console.log("Failed to load details", e);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (value) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    triggerToast("Copied!");
  };

  if (loading) return <LoaderSmall show={true} />;

  if (!data)
    return (
      <div className="not-found">
        <h2>Transaction Not Found</h2>
      </div>
    );

  const isCompleted = data.status === "completed";
  const isFailed = data.status === "failed";

  const method = data.method || {
    accountNo: "N/A",
    ifscCode: "N/A",
    accountName: "N/A",
  };

  return (
    <>
      <Header
        title="Exchange Detail"
        showBack
        showBackLink="/exchange/list"
        showHistory
        historyLink="/exchange/list"
      />

      <div className="txn-container">
        {/* ========================= SUCCESS ========================= */}
        {isCompleted && (
          <div className="txn-success-wrapper">
            <p className="txn-receive-label">You will receive</p>

            <p className="txn-amount">
              <span
                style={{ fontSize: "18px", position: "relative", top: "-12px" }}
              >
                ₹
              </span>
              {data.inrAmount}
            </p>

            {/* UTR + Button */}
            <div className="txn-wrapper">
              {/* UTR BOX */}
              <div className="txn-utr-box">
                <span className="txn-utr-text">UTR: {data.utr || "N/A"}</span>

                {data.utr && (
                  <AppImage
                    src={copyIconWhite}
                    className="txn-utr-copy"
                    alt="copy"
                    onClick={() => copyToClipboard(data.utr)}
                  />
                )}
              </div>

              <button className="txn-view-payment-btn">
                View payment detail
              </button>
            </div>

            {/* STATUS ROW */}
            <div className="txn-status-success-row">
              <div className="txn-status-success-block">
                <AppImage
                  src={approvedIcon}
                  className="txn-status-success-icon"
                  alt=""
                />
                <p className="txn-status-success-text">Submitted</p>
                <p className="txn-status-success-time">
                  {formatDate(data.submittedAt)}
                </p>
              </div>

              <div className="txn-status-success-line" />
              <AppImage
                src={approvedIcon}
                className="txn-status-success-icon"
                alt=""
              />
              <div className="txn-status-success-line" />

              <div className="txn-status-success-block">
                <AppImage
                  src={approvedIcon}
                  className="txn-status-success-icon"
                  alt=""
                />
                <p className="txn-status-success-text">Successful</p>
                <p className="txn-status-success-time">
                  {data.completedAt ? formatDate(data.completedAt) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================= FAILED ========================= */}
        {isFailed && (
          <div className="txn-top txn-failed">
            <p className="txn-failed-title">Exchange Failed</p>
            <p className="txn-amount txn-failed-amount">₹{data.inrAmount}</p>

            <p className="txn-failed-msg">
              Your amount has been returned to your USDT balance.
            </p>

            <p className="txn-failed-time">
              Failed on {formatDate(data.submittedAt)}
            </p>
          </div>
        )}

        {/* ========================= PENDING ========================= */}
        {!isCompleted && !isFailed && (
          <div className="txn-top">
            <p className="txn-receive-label">You will receive</p>
            <p className="txn-amount">₹{data.inrAmount}</p>

            <div className="txn-status-row">
              <div className="txn-status-block">
                <AppImage src={approvedIcon} className="txn-status-icon" alt="" />
                <p className="txn-status-text">Submitted</p>
                <p className="txn-status-time">
                  {formatDate(data.submittedAt)}
                </p>
              </div>

              <div className="txn-status-line" />

              <div className="txn-status-block">
                <AppImage src={processingIcon} className="txn-status-icon" alt="" />
                <p className="txn-status-text">Processing</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================= PAYEE INFO ========================= */}
        <div className="txn-sub-section">
          <p className="txn-section-title">Payee information</p>

          <div className="txn-row">
            <span className="txn-label">Account No</span>
            <span className="txn-value">{method.accountNo}</span>
          </div>

          <div className="txn-row">
            <span className="txn-label">IFSC</span>
            <span className="txn-value">{method.ifscCode}</span>
          </div>

          <div className="txn-row">
            <span className="txn-label">Payee Name</span>
            <span className="txn-value">{method.accountName}</span>
          </div>
        </div>

        {/* ========================= TRADE INFO ========================= */}
        <div className="txn-sub-section">
          <p className="txn-section-title">Trade information</p>

          <div className="txn-row">
            <span className="txn-label">Trade no</span>

            <span className="txn-value txn-copy-container">
              {data.id}
              <AppImage
                src={copyIcon}
                className="txn-copy-icon"
                alt="copy"
                onClick={() => copyToClipboard(data.id)}
              />
            </span>
          </div>

          <div className="txn-row txn-usdt-row">
            <span className="txn-label">Trade detail</span>

            <span className="txn-value txn-usdt-value">
              <AppImage src={usdtIcon} className="txn-usdt-icon" alt="" />
              {data.usdtAmount}
              <span className="txn-arrow">
                <AppImage src={trade} alt="" />
              </span>
              ₹{data.inrAmount}
            </span>
          </div>
        </div>
      </div>

      {/* 🔥 TOAST COMPONENT */}
      <Toast
        message={toastMsg}
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
