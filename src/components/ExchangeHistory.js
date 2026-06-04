// src/pages/ExchangeHistory.jsx
import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import Toast from "../components/Toast";
import "./WithdrawHistory.css"; // reuse same styles for consistent UI

/* Image placeholders */
import exchangeIcon from "../assets/exchange.jpg"; // replace with actual icon
import bankIcon from "../assets/bankst.jpg"; // replace with actual icon
import copyIcon from "../assets/copy_gray.png";
import Header from "./Header";
import { useRouter } from "next/navigation";
import LoaderSmall from "./LoaderSmall";

export default function ExchangeHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const router = useRouter();
  /* --------------------------------------------
     ✅ Toast Helper
  --------------------------------------------- */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  /* --------------------------------------------
     ✅ Fetch Exchange History
  --------------------------------------------- */
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/exchange/history");
      if (res.data?.success) {
        setRecords(res.data.data.exchanges || []);
      } else {
        triggerToast("Failed to load exchange history");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to fetch history";
      triggerToast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* --------------------------------------------
     ✅ Render
  --------------------------------------------- */
  return (
    <div className="withdraw-history-page">
      <Header title="Exchange history" showBack showBackLink="/sell-usdt" />

      {/* History List */}
      {loading ? (
        <LoaderSmall show={true} />
      ) : records.length === 0 ? (
        <div className="wh-empty">
          <p>No exchange records found.</p>
        </div>
      ) : (
        <div className="wh-list">
          {records.map((item) => {
            const maskedId = item._id.slice(0, 4) + "****" + item._id.slice(-4);

            const statusClass =
              item.status === "pending"
                ? "green"
                : item.status === "completed"
                ? "orange"
                : "red";

            const statusText =
              item.status === "pending"
                ? "Processing"
                : item.status === "completed"
                ? "Completed"
                : "Failed";

            return (
              <div
                key={item._id}
                className="wh-card"
                onClick={() => router.push(`/transaction-details?id=${item._id}`)}
              >
                <div className="wh-card-top">
                  <AppImage src={copyIcon} className="copy-icon" alt="copy" />
                  <span className="txid">{maskedId}</span>
                  <span className={`status ${statusClass}`}>{statusText}</span>
                </div>

                <div className="wh-inner-box">
                  <div className="row">
                    <span className="label">Bank Name</span>
                    <div className="val-row">
                      <AppImage src={bankIcon} className="net-icon" alt="bank" />
                      <span className="network-value">
                        {item.methodId?.bankName || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <span className="label">Account No</span>
                    <span className="value">
                      {item.methodId?.accountNo || "N/A"}
                    </span>
                  </div>

                  <div className="row">
                    <span className="label">Create time</span>
                    <span className="value">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="amount-row">
                  <span className="amount-label">Amount</span>
                  <div className="amount-val">
                    <AppImage
                      src={exchangeIcon}
                      className="usdt-icon"
                      alt="exchange"
                    />
                    <span className="amount-num">{item.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="wh-nomore">No more data</div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
