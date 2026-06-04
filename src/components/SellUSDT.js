// src/pages/SellUSDT.jsx
import "./Global.css";
import AppImage from "@/components/AppImage";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./SellUSDT.css";
import api from "../api/axios";
import { isLoggedIn } from "../utils/auth";
import { parseExchangeRateResponse } from "../utils/exchangeRate";
import { getSelectedMethod, saveSelectedMethod } from "../utils/storage";
import loadingGif from "../assets/base/loading.gif"; // ✅ add your loading.gif

import banner from "../assets/deposit1.jpg";
import usdtLogo from "../assets/USDT_Logo.png";
import addIcon from "../assets/exchange/select_bank.png";
import addBankIcon from "../assets/exchange/add_bank.png";

// Toast Component
import Toast from "../components/Toast";
import BackHeaderMain from "./BackHeaderMain";
import Header from "./Header";
import Loader from "./Loader";

export default function SellUSDT() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [amount, setAmount] = useState(
    () => searchParams.get("amount") || "",
  );
  const [rate, setRate] = useState(0);

  // ✅ Separate balances
  const [availableBalance, setAvailableBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const [selected, setSelected] = useState(getSelectedMethod());
  const [methods, setMethods] = useState([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Toast state
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [limitBalance, setLimitBalance] = useState(0);

  const isActive = amount.trim() !== "" && Number(amount) > 0;

  const showToast = (message) => {
    setToastMsg(message);
    setToastVisible(true);
  };

  // --- Fetch rate
  const loadRate = async () => {
    try {
      const { data } = await api.get("/exchange/rate");
      const { rate: platformRate } = parseExchangeRateResponse(data);
      setRate(platformRate || 0);
    } catch {
      showToast("Failed to load rate");
    }
  };

  // --- Fetch user balances (now includes both)
  const loadBalance = async () => {
    try {
      const { data } = await api.get("/user/balance");
      const info = data?.data || {};
      setAvailableBalance(Number(info.availableBalance || 0));
      setTotalBalance(Number(info.totalBalance || 0));
      setLimitBalance(Number(info.limitBalance || 0));
    } catch {
      showToast("Failed to load balance");
    }
  };

  // --- Fetch bank methods
  const loadMethods = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/exchange/methods");
      const selectedId = localStorage.getItem("selected_bank_id");

      const list = data?.data?.methods || [];
      setMethods(list);

      // Check if previously selected method still exists
      if (selectedId) {
        const previouslySelected = list.find(
          (method) => method._id === selectedId
        );
        if (previouslySelected) {
          setSelected(previouslySelected);
          saveSelectedMethod(previouslySelected);
          setLoading(false);
          return; // Stop execution here as we found the match
        }
      }

      // If no match found, pick latest method and save it as selected
      if (list.length > 0) {
        const latestMethod = list[0]; // Assuming list is sorted with latest first
        setSelected(latestMethod);
        saveSelectedMethod(latestMethod);
        localStorage.setItem("selected_bank_id", latestMethod._id);
      }

      setLoading(false);
    } catch {
      showToast("Failed to load bank accounts");
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!isLoggedIn()) return;
    try {
      setLoading(true);
      const res = await api.get("/user/profile");
      setRate(Number(res?.data?.data?.user?.priceRate || 0));
      setLoading(false);
    } catch (err) {
      console.error("Profile API Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // loadRate();
    loadProfile();
    loadBalance();
    loadMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Computed INR received
  const receiveInr = useMemo(() => {
    const a = Number(amount || 0);
    return isNaN(a) || isNaN(rate) ? 0 : Math.floor(a * rate);
  }, [amount, rate]);

  const goAddBank = () => router.push("/add-bank-account");
  const goSelectBank = () =>
    router.push(`/bank-card/list?exchangeType=rs&amount=${amount || ""}`);

  // --- Confirm exchange creation
  // const confirm = async () => {
  //   if (!isActive) return;

  //   if (!selected?._id) {
  //     showToast("Please select a bank account first.");
  //     return;
  //   }

  //   if (Number(amount) > availableBalance) {
  //     showToast("Insufficient available balance.");
  //     return;
  //   }

  //   if (Number(amount) < limitBalance) {
  //     showToast(`Minimum USDT should be ${limitBalance}`);
  //     return;
  //   }

  //   try {
  //     setCreating(true);
  //     const { data } = await api.post("/exchange/create", {
  //       methodId: selected._id,
  //       usdtAmount: Number(amount),
  //     });
  //     showToast("Exchange request created successfully!");
  //     setAmount("");
  //     loadBalance(); // Refresh balance after successful sell
  //   } catch (e) {
  //     showToast(
  //       e?.response?.data?.message || e?.message || "Failed to create exchange"
  //     );
  //   } finally {
  //     setCreating(false);
  //   }
  // };

  const confirm = async () => {
    if (!isActive) return;

    if (!selected?._id) {
      showToast("Please select a bank account first.");
      return;
    }

    if (Number(amount) > availableBalance) {
      showToast("Insufficient available balance.");
      return;
    }

    if (Number(amount) < limitBalance) {
      showToast(`Minimum USDT should be ${limitBalance}`);
      return;
    }

    try {
      setCreating(true);

      const { data } = await api.post("/exchange/create", {
        methodId: selected._id,
        usdtAmount: Number(amount),
      });

      const exchangeId = data?.data?.exchange?.id;

      if (!exchangeId) {
        showToast("Exchange created but no ID returned");
        return;
      }

      // Navigate directly to Transaction Details page
      router.push(`/transaction-details?id=${exchangeId}`);
    } catch (e) {
      showToast(
        e?.response?.data?.message || e?.message || "Failed to create exchange"
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="sell-page">
      {/* <BackHeaderMain title={"Exchange"} lastLink={"/exchange/list"} /> */}
      <Header
        title="Exchange"
        showBack
        showBackLink="/exchange"
        showHistory
        historyLink="/exchange/list"
      />
      {/* Banner */}
      <div className="banner-wrap">
        <AppImage src={banner} alt="banner" className="banner-img" />
      </div>

      {/* Select payee */}
      <div className="sell-page-bottom">
        <div className="select-header">
          <span className="select-title">Select payee</span>
          <AppImage
            src={addIcon}
            alt="select"
            className="add-icon"
            onClick={goSelectBank}
          />
        </div>

        {loading ? (
          <div
            className="add-bank-text"
            style={{ width: "100%", padding: "60px 0px", margin: "auto" }}
          >
            <AppImage src={loadingGif} style={{ width: "24px", margin: "auto" }} />
          </div>
        ) : methods.length === 0 ? (
          <>
            <div className="add_border"></div>
            <div className="add-bank-box" onClick={goAddBank}>
              {/* <div className="green-plus-circle">
              <div className="h-line"></div>
              <div className="v-line"></div>
            </div> */}
              <AppImage
                src={addBankIcon}
                alt="select"
                // className="add-icon"
                style={{ width: "20px" }}
                onClick={goSelectBank}
              />
              <span className="add-bank-text">Add bank account</span>
            </div>
          </>
        ) : (
          <div className="selected-bank">
            <div className="sb-row">
              <div className="sb-left">
                <div className="sb-label">Account No</div>
                <div className="sb-value">{selected?.accountNo || "-"}</div>
              </div>
              <div className="sb-left">
                <div className="sb-label">IFSC</div>
                <div className="sb-value">{selected?.ifscCode || "-"}</div>
              </div>
            </div>
            <div className="sb-row">
              <div className="sb-left">
                <div className="sb-label">Payee Name</div>
                <div className="sb-value">{selected?.accountName || "-"}</div>
              </div>
            </div>
          </div>
          // )}
        )}

        {/* If none -> show add box */}

        {/* Sell Amount Section */}
        <div className="sell-section">
          <span className="sell-title">Sell amount</span>

          <div className="amount-box">
            <input
              type="number"
              min="0"
              className="amount-input"
              placeholder="Please enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="unit-box">
              <AppImage src={usdtLogo} alt="usdt" className="usdt-icon" />
              <span className="unit-text">USDT</span>
            </div>
          </div>

          <div className="amount-meta">
            <div className="left">
              <span className="blue">Available:</span>
              <span className="bolder">{availableBalance.toFixed(2)}</span>
              <AppImage src={usdtLogo} alt="usdt-small" className="usdt-small" />
            </div>

            <div className="rate">1 USDT = ₹{rate || 0}</div>
          </div>

          {limitBalance ? (
            <div className="" style={{ width: "100%", paddingTop: "5px" }}>
              <div className="left">
                <span className="blue">Limit:</span>
                <span className="bolder">{limitBalance}</span>
                <AppImage src={usdtLogo} alt="usdt-small" className="usdt-small" />
              </div>
            </div>
          ) : (
            ""
          )}

          {isActive && (
            <div className="receive-box">You will receive ₹{receiveInr}</div>
          )}
        </div>

        {/* Fee Table */}
        <div className="fee-card">
          <table className="fee-table">
            <tbody>
              {[
                { range: ">= $1000.01 and < $2000.01", fee: `₹${rate}+0.25` },
                { range: ">= $2000.01 and < $3000.01", fee: `₹${rate}+0.5` },
                { range: ">= $3000.01 and < $5000.01", fee: `₹${rate}+1` },
                { range: ">= $5000.01", fee: `₹${rate}+1.5` },
              ].map((t, i) => (
                <tr key={i}>
                  <td className="fee-left">{t.range}</td>
                  <td className="fee-right">{t.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirm Button */}
        <button
          className={`confirm-btn ${isActive ? "active" : ""}`}
          disabled={!isActive || creating}
          onClick={confirm}
        >
          Confirm
          {creating && <Loader show={true} />}
        </button>

        <p className="note">
          In order to get your funds back better, faster and more conveniently,
          your exchange order may be split into multiple parts.
        </p>
      </div>

      {/* Toast */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
