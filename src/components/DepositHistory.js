// src/pages/DepositHistory.jsx
import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";

import "./DepositHistory.css";

import usdtLogo from "../assets/USDT_Logo.png";
import trc20Logo from "../assets/trc20.png";
import copyIcon from "../assets/copy_gray.png";
import arrowBack from "../assets/base/arrow_back.png"; // ✅ your PNG
import empty from "../assets/base/empty.png";
import LoaderSmall from "./LoaderSmall";
import BackHeader from "./BackHeader";
import Header from "./Header";

export default function DepositHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const router = useRouter();

  /* -------------------------------------------
      MASK DEPOSIT ID (TC19****4860)
  ------------------------------------------- */
  const maskId = (id) => {
    if (!id) return "";
    return id.substring(0, 2) + "****" + id.substring(id.length - 4);
  };

  /* -------------------------------------------
      MAP STATUS TO COLORS + LABELS
  ------------------------------------------- */
  const statusClass = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case "awaiting_txid":
        return "status processing"; // Blue/green - processing
      case "pending":
        return "status pending"; // Yellow - pending
      case "completed":
        return "status completed"; // Green
      case "failed":
      case "cancelled":
      case "expired":
        return "status failed"; // Red
      default:
        return "status";
    }
  };

  const statusLabel = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case "awaiting_txid":
        return "Processing";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "cancelled":
        return "Cancelled";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  /* -------------------------------------------
      FETCH HISTORY FROM BACKEND
  ------------------------------------------- */
  const fetchData = async (pg = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/deposit/history?page=${pg}&limit=10`);

      const list = res.data?.data?.deposits || [];
      const pag = res.data?.data?.pagination || {};

      setRecords(list);
      setHasNext(pag.hasNext);
      setPage(pag.currentPage);
    } catch (err) {
      console.error("History Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  /* -------------------------------------------
      CARD CLICK HANDLER
  ------------------------------------------- */
  const handleCardClick = (id) => {
    router.push(`/recharge/detail?id=${id}`);
  };

  /* -------------------------------------------
      UI RENDER
  ------------------------------------------- */
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
        }}
      >
        <BackHeader title="Deposit History" />
      </div> */}

      <Header
        title="Deposit History"
        showBack
        showBackLink="/deposit-usdt"
        // showHistory
        // historyLink="/deposit/list"
      />

      <div className="deposit-page">
        {/* HEADER */}
        {/* <div className="header">
          <div className="back-icon" onClick={() => router.back()}>
            <AppImage
              src={arrowBack}
              alt="back"
              style={{ width: "24px", marginLeft: "10px" }}
              onClick={() => router.back()}
            />
          </div>

          <span className="header-title">Deposit History</span>

          <div className="header-right"></div>
        </div> */}

        {/* LIST */}
        <div className="list-wrap">
          {loading ? (
            <LoaderSmall show={true} />
          ) : records.length === 0 ? (
            <div className="bl-empty">
              <AppImage src={empty} className="empty" alt="" /> Empty
              {/* <a className="bl-add" href="/add-bank-account">
              + Add bank account
            </a> */}
            </div>
          ) : (
            records.map((item) => {
              const id = maskId(item._id.toString());
              return (
                <div
                  key={item._id}
                  className="card"
                  onClick={() => handleCardClick(item._id)}
                >
                  {/* TOP */}
                  <div className="card-top">
                    <AppImage src={copyIcon} className="copy-icon" alt="copy" />
                    <span className="txid">{id}</span>
                    <span className={statusClass(item.status)}>
                      {statusLabel(item.status)}
                    </span>
                  </div>

                  {/* INNER BOX */}
                  <div className="inner-box">
                    <div className="row">
                      <span className="label">Network</span>
                      <div className="val-row">
                        <AppImage
                          src={trc20Logo}
                          className="net-icon"
                          alt={item.methodId?.networkCode}
                        />
                        <span className="network-value">
                          {item.methodId?.name} – {item.methodId?.networkCode}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <span className="label">Create time</span>
                      <span className="value_history">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <div className="amount-row">
                    <span className="amount-label">Amount</span>
                    <div className="amount-val">
                      <AppImage src={usdtLogo} className="usdt-icon" alt="usdt" />
                      <span className="amount-num">{item.amount}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {!loading && <div className="no-more">No more data</div>}
        </div>
      </div>
    </>
  );
}
