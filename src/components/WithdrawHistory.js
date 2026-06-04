import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import Toast from "../components/Toast";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import "./WithdrawHistory.css";

/* Image placeholders — replace with actual imports later */
import usdtIcon from "../assets/USDT_Logo.png";
import trc20Icon from "../assets/trc20.png";
import networkIcon from "../assets/trc20.png"; // example icon for network
import copyIcon from "../assets/copy_gray.png";
import BackHeader from "./BackHeader";
import Header from "./Header";

export default function WithdrawHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null, acc: "" });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  /* --------------------------------------------
     ✅ Toast Helper
  --------------------------------------------- */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  /* --------------------------------------------
     ✅ Fetch Withdrawal History
  --------------------------------------------- */
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/withdraw/history");
      if (res.data?.success) {
        setRecords(res.data.data.withdrawals || []);
      } else {
        triggerToast("Failed to load withdrawal history");
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
     ✅ Cancel Confirmation
  --------------------------------------------- */
  const askCancel = (withdrawal) =>
    setModal({
      open: true,
      id: withdrawal._id,
      acc: withdrawal.walletId.walletAddress,
    });

  const confirmCancel = async () => {
    try {
      if (!modal.id) return;
      const res = await api.post(`/withdraw/cancel/${modal.id}`);
      if (res.data.success) {
        triggerToast("Withdrawal cancelled successfully");
        setModal({ open: false, id: null, acc: "" });
        fetchHistory();
      } else {
        triggerToast(res.data.message || "Failed to cancel withdrawal");
        setModal({ open: false, id: null, acc: "" });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Error cancelling withdrawal";
      triggerToast(msg);
      setModal({ open: false, id: null, acc: "" });
    }
  };

  /* --------------------------------------------
     ✅ Render
  --------------------------------------------- */
  return (
    <>
      <Header title="withdraw history" showBack showBackLink="/withdraw-usdt" />

      <div className="withdraw-history-page">
        {/* Header */}
        {/* <div className="wh-header">
        <div className="back-icon">←</div>
        <span className="header-title">Withdraw History</span>
        <div className="header-right"></div>
      </div> */}

        {/* History List */}
        {loading ? (
          <p className="wh-loading">Loading...</p>
        ) : records.length === 0 ? (
          <div className="wh-empty">
            <p>No withdrawal records found.</p>
          </div>
        ) : (
          <div className="wh-list">
            {records.map((item) => {
              const maskedId =
                item._id.slice(0, 4) + "****" + item._id.slice(-4);

              const statusClass =
                item.status === "pending"
                  ? "orange"
                  : item.status === "approved"
                  ? "green"
                  : "red";

              const statusText =
                item.status === "pending"
                  ? "Processing"
                  : item.status === "approved"
                  ? "Completed"
                  : "Failed";

              return (
                <div key={item._id} className="wh-card">
                  <div className="wh-card-top">
                    <AppImage src={copyIcon} className="copy-icon" alt="copy" />
                    <span className="txid">{maskedId}</span>
                    <span className={`status ${statusClass}`}>
                      {statusText}
                    </span>
                  </div>

                  <div className="wh-inner-box">
                    <div className="row">
                      <span className="label">Network</span>
                      <div className="val-row">
                        <AppImage
                          src={networkIcon}
                          className="net-icon"
                          alt="trc20"
                        />
                        <span className="network-value">USDT–TRC20</span>
                      </div>
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
                      <AppImage src={usdtIcon} className="usdt-icon" alt="usdt" />
                      <span className="amount-num">{item.amount}</span>
                    </div>
                  </div>

                  {/* Cancel button for pending status */}
                  {/* {item.status === "pending" && (
                  <button
                    className="cancel-btn"
                    onClick={() => askCancel(item)}
                  >
                    Cancel
                  </button>
                )} */}
                </div>
              );
            })}

            <div className="wh-nomore">No more data</div>
          </div>
        )}

        {/* Confirm Cancel Modal */}
        <DeleteConfirmModal
          open={modal.open}
          accountNo={modal.acc}
          onClose={() => setModal({ open: false, id: null, acc: "" })}
          onConfirm={confirmCancel}
        />

        {/* Toast */}
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </div>
    </>
  );
}
