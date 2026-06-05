import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import api from "../api/axios";
import { isLoggedIn } from "../utils/auth";
import whatsapp from "../assets/whatsappLogo.png";
import defaultAvatar from "../assets/users.jpg";
import "./ProfileHeader.css";

export default function ProfileHeader() {
  const [userData, setUserData] = useState(null);
  const [whatsAppConfig, setWhatsAppConfig] = useState(null);
  const [whatsAppLoading, setWhatsAppLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) return;

    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUserData(res.data.data.user);
      } catch (err) {
        console.error("Profile API Error:", err);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadWhatsAppConfig = async () => {
      setWhatsAppLoading(true);
      try {
        const res = await api.get("/auth/get-whatsapp");
        if (res.data?.success) {
          setWhatsAppConfig(res.data.data);
        }
      } catch (err) {
        console.log("Failed to load WhatsApp config:", err.message);
      } finally {
        setWhatsAppLoading(false);
      }
    };

    loadWhatsAppConfig();
  }, []);

  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    phone = phone.replace(/^\+/, "");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <header className="profile-header">
      <div className="profile-left">
        <AppImage src={defaultAvatar} alt="User" className="profile-pic" />
        <div className="profile-details">
          <span className="phone">+91 {userData?.maskedPhone || "—"}</span>
          <span className="balance">${userData?.availableBalance ?? 0}</span>
        </div>
      </div>

      <button
        type="button"
        className={`profile-right profile-help-btn ${
          whatsAppLoading ? "is-loading" : ""
        }`}
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp help"
        aria-busy={whatsAppLoading}
      >
        <AppImage src={whatsapp} alt="WhatsApp" className="profile-whatsapp-icon" />
      </button>
    </header>
  );
}
