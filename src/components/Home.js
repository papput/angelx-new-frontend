"use client";

import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import { isLoggedIn } from "../utils/auth";
import { parseExchangeRateResponse } from "../utils/exchangeRate";

import banner from "../assets/banner.jpg";
import securityAlertBanner from "../assets/security-alert-banner.jpg";
import imagenew from "../assets/imagenew.jpg";
import feature1 from "../assets/feature1.jpg";
import feature2 from "../assets/feature2.jpg";
import feature3 from "../assets/feature3.jpg";

import matic from "../assets/matic.png";
import shib from "../assets/shib.png";
import fil from "../assets/fil.png";
import eos from "../assets/eos.png";
import dot from "../assets/dot.png";
import usdt from "../assets/usdt.png";
import doge from "../assets/doge.png";
import btc from "../assets/btc.png";
import sol from "../assets/sol.png";
import ton from "../assets/toncoin.png";

import loadingGif from "../assets/base/loading.gif";
import reloadIcon from "../assets/home/refresh.png";

import "./Home.css";
import "./PlatformPrice.css";
import Header from "./Header";
import Footer from "./Footer";
import ScamWarningMarquee from "./ScamWarningMarquee";
export default function Home() {
  const [seconds, setSeconds] = useState(60);
  const [isFetching, setIsFetching] = useState(false);
  const [basePrice, setBasePrice] = useState(null);
  const [userLevel, setUserLevel] = useState("Base");
  const [userPrice, setUserPrice] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [marketItems, setMarketItems] = useState([
    { img: matic, name: "MATIC", change: "—", changeClass: "green", vol: "—", price: "—" },
    { img: shib, name: "SHIB", change: "—", changeClass: "green", vol: "—", price: "—" },
    { img: fil, name: "FIL", change: "—", changeClass: "red", vol: "—", price: "—" },
    { img: eos, name: "EOS", change: "—", changeClass: "red", vol: "—", price: "—" },
    { img: dot, name: "DOT", change: "—", changeClass: "red", vol: "—", price: "—" },
    { img: usdt, name: "USDT", change: "—", changeClass: "green", vol: "—", price: "—" },
    { img: doge, name: "DOGE", change: "—", changeClass: "red", vol: "—", price: "—" },
    { img: btc, name: "BTC", change: "—", changeClass: "green", vol: "—", price: "—" },
    { img: sol, name: "SOL", change: "—", changeClass: "green", vol: "—", price: "—" },
    { img: ton, name: "TON", change: "—", changeClass: "red", vol: "—", price: "—" },
  ]);

  const REFRESH_SECS = 60;
  const COIN_IMAGES = {
    MATIC: matic,
    SHIB: shib,
    FIL: fil,
    EOS: eos,
    DOT: dot,
    USDT: usdt,
    DOGE: doge,
    BTC: btc,
    SOL: sol,
    TON: ton,
  };

  const fetchPlatformData = async () => {
    try {
      setIsFetching(true);
      const res = await api.get("/exchange/rate");
      const { rate } = parseExchangeRateResponse(res.data);
      if (rate != null) setBasePrice(rate);
    } catch (err) {
      console.error("Exchange rate error:", err);
    } finally {
      setIsFetching(false);
      setSeconds(REFRESH_SECS);
    }
  };

  const loadProfile = async () => {
    if (!isLoggedIn()) return;
    try {
      const res = await api.get("/user/profile");
      setUserLevel(res?.data?.data?.user?.level || "Base");
      setUserPrice(Number(res?.data?.data?.user?.priceRate) || 0);
    } catch (err) {
      console.error("Profile API Error:", err);
    }
  };

  const fetchMarketList = async () => {
    try {
      const res = await api.get("/exchange/market-list");
      const markets = res?.data?.data?.markets;
      if (!Array.isArray(markets) || markets.length === 0) return;

      setMarketItems(
        markets.map((coin) => ({
          img: COIN_IMAGES[coin.symbol] || btc,
          name: coin.symbol || coin.name,
          change: coin.change || "—",
          changeClass: coin.changeClass || "green",
          vol: coin.vol || "—",
          price: coin.price || "—",
        })),
      );
    } catch (err) {
      console.error("Market list error:", err);
    }
  };

  useEffect(() => {
    fetchPlatformData();
    loadProfile();
    fetchMarketList();
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          fetchPlatformData();
          fetchMarketList();
          return REFRESH_SECS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const displayRate = userPrice || basePrice;

  const faqs = [
    {
      q: "What is AngelX, how does the AngelX exchange operate?",
      a: "It is a exchange site that is intended to assist the users in changing USDT to INR. Users transfer USDT to blockchain networks that are accepted and can sell it on the exchange interface and get payments in INR in their respective bank accounts connected to this exchange.",
    },
    {
      q: "What is the way I can sell AngelX USDT in INR?",
      a: "Selling USDT Log into your account and put the USDT to your wallet, choose how much you wish to sell and make the exchange. After the transaction has been made, an amount of INR will be transferred to your bank account where you are registered.",
    },
    {
      q: "What is the actual current price of AngelX USDT?",
      a: "Angelx USDT price is also shown in real time on the platform. The exchange rates also fluctuate with the market conditions and the user will be able to view the actual conversion value prior to the confirmation of the transaction.",
    },
    {
      q: "Is it possible to use the AngelX application to control my exchange transactions?",
      a: "Yes. AngelX app enables its users to check their accounts, deposit USDT, view the balances, and transfer exchange transactions directly through the mobile devices.",
    },
    {
      q: "What is the time that it will take to change AngelX USDT to INR?",
      a: "The confirmation time taken by blockchain and the time of bank processing varies, yet most transactions would be processed soon after the deposit of the USDT is verified.",
    },
    {
      q: "Is AngelX exchangecurrency exchange safe?",
      a: "The app is verified using secure infrastructure and blockchain to provide safe exchange transactions, as well as trustworthy and reliable processing of deposits and exchanges.",
    },
    {
      q: "How can I contact AngelX support?",
      a: "The support team can be approached by the users via the available channels of communication on the platform in case they need any assistance with deposits, exchanges, or account-related questions.",
    },
    {
      q: "Can I deposit USDT from any exchange wallet to Angelx co?",
      a: "Yes. Users can transfer USDT from most major exchange wallets to Angelx co. The platform supports multiple networks such as TRC20, ERC20, and BEP20, making it easy to deposit funds from various exchanges or wallets.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="home-container">
        <Header title="AngelX" showLogo showHelp showApkDownload />

        <ScamWarningMarquee />

        <div className="security-alert-banner">
          <a
            href="https://www.angelx.biz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AngelX official website security alert"
          >
            <AppImage
              src={securityAlertBanner}
              alt="Security Alert From AngelX — Official website https://www.angelx.biz/. Never share login credentials. Any other link claiming AngelX is fake."
              className="security-alert-banner-img"
            />
          </a>
        </div>

        <section className="hero-upper" aria-label="AngelX Exchange">
          <h1>AngelX - Sell USDT to INR Instantly &amp; Securely</h1>
        </section>

        {/* Banner — disabled for now; re-enable when needed
        <div className="banner-container">
          <AppImage src={banner} alt="AngelX Banner" className="banner-img" />
        </div>
        */}

        {/* Features */}
        <div className="features">
          <div className="feature-card">
            <AppImage
              src={imagenew}
              alt="Get started in seconds"
              className="feature-img"
            />
            <div className="feature-content">
              <h3 className="feature-title">Get started in seconds</h3>
              <p className="feature-desc">
                Whether you are beginner or an expert, you can easily get
                started without any professional knowledge
              </p>
            </div>
          </div>

          <div className="feature-card">
            <AppImage
              src={feature1}
              alt="Boost your yields"
              className="feature-img"
            />
            <div className="feature-content">
              <h3 className="feature-title">Boost your yields</h3>
              <p className="feature-desc">
                Every transaction has potential for huge profits, allowing every
                user to thrive simultaneously with the platform
              </p>
            </div>
          </div>

          <div className="feature-card">
            <AppImage
              src={feature2}
              alt="Access expert knowledge"
              className="feature-img"
            />
            <div className="feature-content">
              <h3 className="feature-title">Access expert knowledge</h3>
              <p className="feature-desc">
                Ensure that every user can earn profits on the platform
                regardless of how much money they have
              </p>
            </div>
          </div>
        </div>

        {/* Screenshot Section */}
        <div className="screenshot-section">
          <div className="screenshot-wrapper">
            <AppImage
              src={feature3}
              alt="AngelX official screenshot"
              className="screenshot-img"
            />

            <div className="overlay-box">
              <div className="overlay-header">
                <h2>Platform price</h2>
              </div>

              <div className="platform-price-container">
                <div className="price-card">
                  <div className="refresh-section">
                    <p>
                      Automatic refresh after{" "}
                      <span className="refresh-timer">{seconds}s</span>
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
                    {isFetching && displayRate == null ? (
                      <AppImage
                        src={loadingGif}
                        alt="Loading..."
                        className="loading-gif"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      <>
                        <span className="price-value">{displayRate || "—"}</span>
                        <div
                          className={`base-badge ${userLevel === "Gold" ? "base-badge-gold" : "base-badge-normal"}`}
                        >
                          <span>{userLevel}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {displayRate != null && (
                    <p className="conversion-text">1USDT = ₹{displayRate}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="screenshot-text">Angelx Official Screenshot</h2>

        {/* Market List */}
         <div className="market-section">
          <h2 className="market-title">Market list</h2>

          <div className="market-box">
            <div className="market-header">
              <span>exchange coin</span>
              <span className="center">Volume(24h)</span>
              <span className="right">Price</span>
            </div>

            <div className="market-list">
              {marketItems.map((item, i) => (
                <div className="market-item" key={item.name || i}>
                  <div className="coin-info">
                    <AppImage src={item.img} alt={item.name} className="coin-img" />
                    <div>
                      <div className="coin-name">{item.name}</div>
                      <div className={`coin-change ${item.changeClass}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>

                  <div className="center bold">{item.vol}</div>
                  <div className="right bold">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

         <div className="angelx-wrapper">
          <h2 className="angelx-title">
            AngelX: A Trusted Platform for Simple, Fast, and Secure exchange
            Exchange
          </h2>

          <p className="angelx-text">
            Welcome to AngelX, If you want the Smartest Way to Change USDT into
            INR Instantly. AngelX will facilitate the conversion of USDT to INR
            making it easy, quick, and safe to the users of the
            exchangecurrency.
          </p>

          <p className="angelx-text">
            Most of the conventional transactions have complex interfaces, delay
            in processing reactiveness and numerous verification procedures that
            complicate the process of selling exchange.
          </p>

          <p className="angelx-text">
            AngelX exchange exchange eliminates these barriers and offers a
            convenient platform where a user can deposit USDT and get INR in a
            fast and transparent transaction.
          </p>

          <p className="angelx-text">
            Using this app, users and more advanced traders will be able to
            handle their exchange-operations without difficulties and convert
            the USDT into the INR without any doubts.
          </p>

          {expanded && (
            <div className="angelx-more">
              <h2 className="angelx-heading">
                Why AngelX Is Becoming the Preferred USDT-to-INR Exchange for
                exchange Users
              </h2>

              <p className="angelx-text">
                With the growth in the usage of exchangecurrencies, people are
                seeking a stable platform to trade in the USDT without any
                delays and complexities.
              </p>

              <p className="angelx-text">
                This application is aimed at offering an easy and effective
                process of changing USDT to INR, where the user can deposit USDT
                in their wallets and change the latter to INR almost instantly.
              </p>

              <p className="angelx-text">
                The site has a competitive price of the USDT and quick payout,
                which assists the users of the site to get their money without
                having to wait a long time.
              </p>

              <p className="angelx-text">
                Due to this convenient and transparent platform, AngelX exchange
                exchange is chosen by many exchange users when they need to sell
                the USDT in the most effective and fast way.
              </p>

              <h2 className="angelx-heading">
                Powerful Features That Make AngelX the Go-To exchange Exchange
                Platform
              </h2>

              <p className="angelx-text">
                This platform offers a combination of well-thought-out functions
                that make the whole process of the exchange easy, depositing the
                USDT to get the payment in INR.
              </p>

              <p className="angelx-text">
                Such features are used to make sure that users are able to
                transact business without any difficulties and still have full
                access to see their balances and exchange activity.
              </p>

              <table className="angelx-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Benefit</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Simple Mobile Login</td>
                    <td>
                      Users can quickly access their account through the AngelX
                      app
                    </td>
                  </tr>

                  <tr>
                    <td>Fast USDT Deposits</td>
                    <td>
                      Deposits are processed after quick blockchain
                      confirmations
                    </td>
                  </tr>

                  <tr>
                    <td>Transparent AngelX USDT Price</td>
                    <td>
                      Real-time pricing ensures users know the exchange value
                    </td>
                  </tr>

                  <tr>
                    <td>Multi-Network Support</td>
                    <td>Compatible with TRC20, ERC20, and BEP20 networks</td>
                  </tr>

                  <tr>
                    <td>Instant INR Payouts</td>
                    <td>
                      Funds are transferred directly to linked bank accounts
                    </td>
                  </tr>

                  <tr>
                    <td>24/7 Assistance</td>
                    <td>Support is available whenever users require help</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="angelx-heading">
                Built for Speed, Security, and Reliable exchange Transactions
              </h2>

              <p className="angelx-text">
                exchangecurrency transactions require speed and security, and
                this site is designed to provide either one.
              </p>

              <p className="angelx-text">
                All the USDT deposits are confirmed via blockchain and only
                after this, they are added to the account of the user, which is
                why the whole process is safe and correct.
              </p>

              <p className="angelx-text">
                After the deposit is made, users are able to quickly transact
                their AngelX USDT sell transaction and exchange their money to
                INR without incurring any complex trading procedures.
              </p>

              <p className="angelx-text">
                An itchy dashboard is also available where one can track
                balances and also monitor their transactions without
                complications.
              </p>

              <h2 className="angelx-heading">
                Supported USDT Networks for Fast Deposits on AngelX
              </h2>

              <table className="angelx-table">
                <thead>
                  <tr>
                    <th>Supported Network</th>
                    <th>Key Advantage</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>TRC20 (Tron Network)</td>
                    <td>Very fast transactions with low transfer fees</td>
                  </tr>

                  <tr>
                    <td>ERC20 (Ethereum Network)</td>
                    <td>Widely supported by many major exchange wallets</td>
                  </tr>

                  <tr>
                    <td>BEP20 (Binance Smart Chain)</td>
                    <td>Quick confirmations and efficient transfers</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="angelx-heading">
                Step-by-Step Guide: How to Sell AngelX USDT for INR in Minutes
              </h2>

              <ol className="angelx-steps">
                <li>Login to AngelX</li>
                <li>Complete Your Profile</li>
                <li>Add Your Bank Account</li>
                <li>Deposit USDT</li>
                <li>Confirm Your Balance</li>
                <li>Sell USDT</li>
                <li>Receive INR in Your Bank Account</li>
              </ol>

              <h2 className="angelx-heading">
                The reason Thousands of exchange Users Trust AngelX to transact
                USDT
              </h2>

              <ul className="angelx-list">
                <li>Transparent AngelX USDT Price</li>
                <li>Quick processing of USDT-to-INR</li>
                <li>Safe exchangegraphic infrastructure</li>
                <li>Easy exchange process</li>
                <li>Responsive support team</li>
              </ul>
            </div>
          )}

          <button
            className="angelx-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <span>Read Less &nbsp; →</span>
            ) : (
              <span>Read More &nbsp; →</span>
            )}
          </button>
        </div> 

        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <div className="faq-left">
                  <div className="faq-number-wrapper">
                    <div className="faq-number">
                      {String(index + 1).padStart(2, "0")}.
                    </div>
                  </div>

                  <h3 className="faq-qtext">{faq.q}</h3>
                </div>

                <div className="faq-icon">
                  {openIndex === index ? "×" : "+"}
                </div>
              </div>

              <div
                className={`faq-answer ${
                  openIndex === index ? "faq-open" : ""
                }`}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
