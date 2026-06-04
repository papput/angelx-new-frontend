import React, { useEffect, useState } from "react";
import { getImageSrc } from "@/utils/image";

import AppImage from "@/components/AppImage";

import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../api/axios";
import "./Profile.css";
import "./Global.css";
import Footer from "./Footer";
import LoaderSmall from "./LoaderSmall";

/* assets */
import setting from "../assets/mine/setting.png";
import help from "../assets/help.jpg";
import users from "../assets/users.jpg";
import payx from "../assets/mine/andt_icon.png";
import ques from "../assets/ques.jpg";
import bgimg1 from "../assets/bgimg1.jpg";
import people from "../assets/people.jpg";
import exch from "../assets/exch.jpg";
import statement from "../assets/statement.jpg";
import bankst from "../assets/bankst.jpg";
import invite from "../assets/invite.jpg";
import arrow from "../assets/mine/referrals_arrow.png";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whatsAppConfig, setWhatsAppConfig] = useState(null);

  const router = useRouter();

  /* =============== FIXED Helper Component =============== */
  function MenuItem({ icon, label, link }) {
    return (
      <div className="menu-item" onClick={() => link && router.push(link)}>
        <div className="menu-left">
          <AppImage src={icon} alt={label} className="menu-icon" />
          <span className="menu-text">{label}</span>
        </div>

        <AppImage className="menu-arrow" src={arrow} alt=">" />
      </div>
    );
  }

  /* WhatsApp Click */
  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    phone = phone.replace(/^\+/, "");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  /* Load WhatsApp Config */
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/auth/get-whatsapp");
        if (res.data?.success) setWhatsAppConfig(res.data.data);
      } catch (err) {
        console.log("Failed to load WhatsApp config:", err.message);
      }
    })();
  }, []);

  /* Load User Profile */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.data.user);
      setLoading(false);
    } catch (err) {
      console.error("Profile API Error:", err);
      setLoading(false);
    }
  };

  if (loading || !userData) {
    return <LoaderSmall show={true} />;
  }

  return (
    <div className="profile-page">
      {/* ================== HERO SECTION ================== */}
      <div className="profile-hero">
        {/* Top Icons */}
        <div className="profile-top-icons">
          <AppImage
            src={help}
            alt="Help"
            className="icon-help"
            onClick={handleWhatsAppClick}
          />

          <Link href="/setting">
            <AppImage className="icon-gear" src={setting} alt="Settings" />
          </Link>
        </div>

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <AppImage src={users} alt="User" className="profile-avatar" />
          <h2 className="profile-number">+91 {userData.maskedPhone}</h2>
        </div>

        {/* Balance Row */}
        <div className="profile-balance-section">
          <div className="balance-block">
            <span className="balance-label">Total amount ($)</span>
            <span className="balance-value">
              {userData.totalBalance?.toFixed(2)}
            </span>
          </div>

          <div className="divider-y"></div>

          <div className="balance-block">
            <span className="balance-label">Available ($)</span>
            <span className="balance-value">
              {userData.availableBalance?.toFixed(2)}
            </span>
          </div>

          <div className="divider-y"></div>

          <div className="balance-block">
            <span className="balance-label">Processing ($)</span>
            <span className="balance-value">
              {(userData.totalBalance - userData.availableBalance).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* ================== BODY CONTENT ================== */}
      <div className="profile-body">
        {/* PAYX Card */}
        <div
          className="payx-card"
          style={{ backgroundImage: `url(${getImageSrc(bgimg1)})` }}
        >
          <div className="payx-top">
            <div className="flex">
              <AppImage src={payx} alt="PAYX" className="payx-logo" />
              <div className="flex flex-col">
                <span className="payx-balance">0 PAYX</span>
                <span className="payx-rate">
                  1 PAYX = 0.010786 USDT
                  <AppImage src={ques} alt="" className="payx-ques" />
                </span>
              </div>
            </div>
            <button className="withdraw-btn">Withdraw</button>
          </div>

          <button className="to-pro-btn">To AngelX Pro</button>
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <div className="summary-flex">
            <div className="summary-block">
              <span className="summary-label">Exchange</span>
              <span className="summary-value">$0</span>
            </div>

            <div className="summary-block">
              <div className="summary-label reward-label">
                Reward <AppImage src={payx} alt="" className="summary-payx" />
              </div>
              <span className="summary-value">0</span>
            </div>

            <div className="divider-y dark"></div>

            <div className="summary-block">
              <span className="summary-chip">Details</span>
              <span className="summary-date">
                {new Date(userData.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="menu-list">
          <MenuItem icon={people} label="Referrals" link="/referrel" />
          <MenuItem
            icon={exch}
            label="Exchange history"
            link="/exchange/list"
          />
          <MenuItem icon={statement} label="Statement" link="/deposit/list" />
          <MenuItem icon={bankst} label="Bank account" link="/bank-card/list" />
          <MenuItem icon={invite} label="Invite friends" link="/invite" />
        </div>
      </div>

      {/* ✅ Footer is now correctly placed */}
      <Footer />
    </div>
  );
}
