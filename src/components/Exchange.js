"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import { isLoggedIn } from "../utils/auth";
import {
  parseExchangeRateResponse,
  formatTiersForDisplay,
} from "../utils/exchangeRate";
import { getDisplayRate } from "../utils/formatRate";
import "./Exchange.css";
import "./Global.css";
import "./PlatformPrice.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useMounted from "@/hooks/useMounted";

/* Image imports */
import mno from "../assets/mno.jpeg";
import mno2 from "../assets/mno2.jpeg";
import exdp from "../assets/exdp.jpg";
import wth from "../assets/wth.jpg";
import inv from "../assets/inv.jpg";
import wazirxLogo from "../assets/home/wazirx.png";
import binanceLogo from "../assets/home/binance.png";
import customer_plus from "../assets/home/customer_plus.png";
import transaction_rate_plus from "../assets/home/transaction_rate_plus.png";
import best_plus from "../assets/home/best_plus.png";
import safe_plus from "../assets/home/safe_plus.png";

import gogreen from "../assets/gogreen.jpg";

import loadingGif from "../assets/base/loading.gif"; // ✅ add your loading.gif
import reloadIcon from "../assets/home/refresh.png";
import noticeIcon from "../assets/home/notice.png";
import Header from "./Header";
import Footer from "./Footer";
import ProfileHeader from "./ProfileHeader";
import ApkDownloadBox from "./ApkDownloadBox";
import PageMeta from "./PageMeta";

export default function Exchange() {
  const router = useRouter();
  const { loggedIn } = useAuth();
  const mounted = useMounted();
  const showLoggedIn = mounted && loggedIn;

  const handlePrimaryCta = () => {
    if (!showLoggedIn) {
      // redirect to login page
      router.push("/profile");
      return;
    }

    // go to sell page
    router.push("/sell-usdt");
  };

  /* ------------------------------
      BACKEND REAL RATE + REFRESH
  ------------------------------ */

  const REFRESH_SECS = 30;
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECS);
  const [isFetching, setIsFetching] = useState(false);
  const tickRef = useRef(null);

  const [basePrice, setBasePrice] = useState(null);
  const [usdtInr, setUsdtInr] = useState(null);
  const [error, setError] = useState("");

  const [tiers, setTiers] = useState([
    { label: ">=1000.01 and <2000.01", adj: "+0.25" },
    { label: ">=2000.01 and <3000.01", adj: "+0.5" },
    { label: ">=3000.01 and <5000.01", adj: "+1" },
    { label: ">=5000.01", adj: "+1.5" },
  ]);
  const [apiTiers, setApiTiers] = useState(null);

  const [exchanges, setExchanges] = useState([
    {
      key: "wazirx",
      name: "wazirx",
      logo: wazirxLogo,
      avg: 100.37,
      unit: "RS",
      rateStr: "1USDT = ₹100.37",
      min: 100.24,
      max: 100.44,
    },
    {
      key: "binance",
      name: "BINANCE",
      logo: binanceLogo,
      avg: 103.77,
      unit: "RS",
      rateStr: "1USDT = ₹103.77",
      min: 103,
      max: 103.98,
    },
  ]);

  /* ------------------------------
      FETCH RATE FROM BACKEND
      GET /api/v1/exchange/rate
  ------------------------------ */
  const fetchPlatformData = async () => {
    try {
      setIsFetching(true);
      setError("");

      const res = await api.get("/exchange/rate");
      const { rate, tiers: backendTiers } = parseExchangeRateResponse(res.data);

      if (rate != null) {
        setBasePrice(rate);
        setUsdtInr(rate);
        const formatted = formatTiersForDisplay(backendTiers);
        if (formatted) {
          setApiTiers(formatted);
        }
      } else {
        setError("Failed to load rate");
      }
    } catch (err) {
      console.error("Exchange rate error:", err);
      setError("Unable to fetch exchange rate");
    } finally {
      setIsFetching(false);
      setSecondsLeft(REFRESH_SECS);
    }
  };

  const [userLevel, setUserLevel] = useState("Base");
  const [userPrice, setUserPrice] = useState(null);

  const displayRate = getDisplayRate(userPrice, basePrice, isFetching);
  const loadProfile = async () => {
    if (!isLoggedIn()) return;
    try {
      const res = await api.get("/user/profile");
      setUserLevel(res?.data?.data?.user?.level);
      const customRate = Number(res?.data?.data?.user?.priceRate);
      if (!Number.isNaN(customRate) && customRate > 0) {
        setUserPrice(customRate);
      }
    } catch (err) {
      console.error("Profile API Error:", err);
    }
  };

  /* ------------------------------
      AUTO REFRESH EVERY 30 SECONDS
  ------------------------------ */
  useEffect(() => {
    // Immediately fetch on load

    fetchPlatformData();
    loadProfile();

    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tickRef.current);
          fetchPlatformData().then(() => {
            tickRef.current = setInterval(() => {
              setSecondsLeft((x) => (x <= 1 ? REFRESH_SECS : x - 1));
            }, 1000);
          });
          return REFRESH_SECS;
        }
        return s - 1;
      });
    }, 1000);
 
    return () => clearInterval(tickRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------
      MARQUEE / TICKER MESSAGE
  ------------------------------ */
  const ticker = useMemo(() => {
    const mask = (num) =>
      `${String(num).slice(0, 2)}****${String(num).slice(-4)}`;
    const phone = 8800000000 + Math.floor(Math.random() * 9999);
    const amount = 200 + Math.floor(Math.random() * 3000);
    const time = new Date().toTimeString().slice(0, 5);
    return `${time} ${mask(phone)} sold for $${amount}`;
  }, [basePrice]);

  /* ------------------------------
      RENDER
  ------------------------------ */
  return (
    <div className="ex-page">
      <h1 className="seo-page-h1">USDT Exchange – Live AngelX USDT Price</h1>
      <PageMeta
        title="Exchange USDT to INR – Real-Time Rates | AngelX"
        description="View live USDT to INR exchange rates on AngelX. Sell USDT instantly at the best platform price with tiered pricing, fast INR payouts, and 24/7 support."
        keywords="USDT to INR, exchange USDT, AngelX exchange, sell USDT rate, USDT INR price"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/exchange"
      />

      {/* <ApkDownloadBox /> */}
      {!showLoggedIn ? (
        <Header title="AngelX Wallet" showLogo showHelp />
      ) : (
        <ProfileHeader />
      )}

      <div className="p-2">
        <div className="space-y-4 p-2">
          {/* SLIDER */}
          <div className="ex-slider-container">
            <div className="ex-slider">
              <div className="ex-slide">
                <AppImage src={mno} alt="Slide 1" className="ex-slide-img" />
              </div>
              <div className="ex-slide">
                <AppImage src={mno2} alt="Slide 2" className="ex-slide-img" />
              </div>
            </div>
          </div>

          <div className="ex-platform-price-section">
            <div className="overlay-header overlay-header_exchange">
              <h2>Platform price</h2>
            </div>

            <div className="platform-price-container">
              <div className="price-card ex-exchange-price-card">
                <div className="refresh-section">
                  <p>
                    Automatic refresh after{" "}
                    <span className="refresh-timer">{secondsLeft}s</span>
                  </p>
                  <AppImage
                    src={reloadIcon}
                    alt="refresh"
                    className={`refresh-icon ${isFetching ? "spinning" : ""}`}
                    onClick={fetchPlatformData}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="price-display">
                  {displayRate === null ? (
                    <AppImage
                      src={loadingGif}
                      alt="Loading..."
                      className="loading-gif"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <>
                      <span className="price-value">{displayRate}</span>
                      <div
                        className={`base-badge ${userLevel === "Gold" ? "base-badge-gold" : "base-badge-normal"}`}
                      >
                        <span>{userLevel}</span>
                      </div>
                    </>
                  )}
                </div>

                {displayRate !== null && (
                  <p className="conversion-text">1USDT=₹{displayRate}</p>
                )}

                <div className="ex-tier-box ex-tier-box--nested">
                  <div className="grid grid-cols-2 ex-tier-header">
                    <div className="text-center">
                      <span className="ex-tier-title">Exchange($)</span>
                    </div>
                    <div className="text-center">
                      <span className="ex-tier-title">Price(₹)</span>
                    </div>
                  </div>

                  <div className="ex-tier-body">
                    {(apiTiers || tiers).map((t, idx) => (
                      <div
                        key={t.label || idx}
                        className="grid grid-cols-2 items-center font_12_exch ex-tier-row"
                      >
                        <div className="text-center text-gray-700">
                          {t.label}
                        </div>
                        <div className="text-center font-semibold text-gray-800">
                          {t.priceINR != null
                            ? t.priceINR
                            : getDisplayRate(userPrice, usdtInr, false)}
                          {t.adj ? (
                            <span style={{ color: "#ef4444", marginLeft: 2 }}>
                              {t.adj}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="ex-tier-link">
                    What is tiered price policy?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ex-platform-box">
            <div className="px-4">
              {showLoggedIn ? (
                <button className="ex-login-btn" onClick={handlePrimaryCta}>
                  Sell USDT
                </button>
              ) : (
                <>
                  <button className="ex-login-btn" onClick={handlePrimaryCta}>
                    Login for sell USDT
                  </button>
                  <p className="ex-login-note">
                    First time login will register new account for you
                  </p>
                </>
              )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="ex-actions">
              <div
                className="ex-action-item"
                onClick={() => (window.location.href = "/deposit-usdt")}
              >
                <AppImage src={exdp} alt="Deposit" className="ex-action-img" />
                <span className="ex-action-label">Deposit</span>
              </div>

              <div
                className="ex-action-item"
                onClick={() => (window.location.href = "/withdraw-usdt")}
              >
                <AppImage src={wth} alt="Withdraw" className="ex-action-img" />
                <span className="ex-action-label">Withdraw</span>
              </div>

              <div
                className="ex-action-item"
                onClick={() => (window.location.href = "/invite")}
              >
                <AppImage src={inv} alt="Invite" className="ex-action-img" />
                <span className="ex-action-label">Invite</span>
              </div>
            </div>

            {/* TICKER */}
            <div className="ex-ticker-wrap">
              <div className="ex-ticker">
                <div className="ex-ticker-left">
                  <AppImage src={noticeIcon} alt="Notice" className="ex-vol-icon" />

                  <span className="ex-ticker-text">{ticker}</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ex-chv-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER EXCHANGES CARDS */}
      <div className="ex-exchanges-section">
        <h2 className="ex-ex-title">Exchanges price</h2>

        <div className="ex-ex-grid">
          {exchanges.map((ex) => (
            <div className="ex-ex-card" key={ex.key}>
              <div className="ex-ex-top">
                <AppImage src={ex.logo} alt={ex.name} className="ex-ex-logo" />
                <div className="ex-green-dot">
                  <AppImage
                    src={gogreen}
                    alt="Reliable security"
                    className="ex-adv-icon"
                    style={{ width: "45px" }}
                  />
                </div>
              </div>

              <div className="ex-ex-avg-row">
                <span className="ex-ex-avg">Avg</span>
                <span className="ex-ex-value">{ex.avg.toFixed(2)}</span>
                <span className="ex-ex-unit">{ex.unit}</span>
              </div>

              <div className="ex-ex-rate">{ex.rateStr}</div>

              <div className="ex-ex-minmax">
                <div>Min {ex.min}RS</div>
                <div style={{ float: "left" }}>Max {ex.max}RS</div>
              </div>
            </div>
          ))}
        </div>

        <p className="ex-ex-note">
          Statistics based on the latest 10 pieces of data
        </p>
      </div>

      {/* PLATFORM ADVANTAGE */}
      <div className="ex-adv-section">
        <h2 className="ex-adv-title">Platform advantage</h2>

        <div className="ex-adv-list">
          <div className="ex-adv-card ex-hover">
            <div className="ex-adv-head">
              <AppImage
                src={customer_plus}
                alt="24/7 Support"
                className="ex-adv-icon"
              />
              <h3 className="ex-adv-head-title">24 / 7 Support</h3>
            </div>
            <p className="ex-adv-text">
              Got a problem? Just get in touch. Our customer service support
              team is available 24/7.
            </p>
          </div>

          <div className="ex-adv-card">
            <div className="ex-adv-head">
              <AppImage
                src={transaction_rate_plus}
                alt="Transaction free"
                className="ex-adv-icon"
              />
              <h3 className="ex-adv-head-title">Transaction free</h3>
            </div>
            <p className="ex-adv-text">
              Use a variety of payment methods to trade exchange, free,
              safe and fast.
            </p>
          </div>

          <div className="ex-adv-card">
            <div className="ex-adv-head">
              <AppImage
                src={best_plus}
                alt="Rich information"
                className="ex-adv-icon"
              />
              <h3 className="ex-adv-head-title">Rich information</h3>
            </div>
            <p className="ex-adv-text">
              Gather a wealth of information, let you know the industry dynamics
              in first time.
            </p>
          </div>

          <div className="ex-adv-card">
            <div className="ex-adv-head">
              <AppImage
                src={safe_plus}
                alt="Reliable security"
                className="ex-adv-icon"
              />
              <h3 className="ex-adv-head-title">Reliable security</h3>
            </div>
            <p className="ex-adv-text">
              Our sophisticated security measures protect your exchange
              from all risks.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
