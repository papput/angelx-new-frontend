import React, { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";

import logo from "../assets/logo.jpg";
import help from "../assets/help.jpg";
import whatsapp from "../assets/whatsappLogo.png";
import arrowBack from "../assets/base/arrow_back.png";
import history from "../assets/recharge/history.png";

import api from "../api/axios";
import "./Header.css";

export default function Header({
  title,
  showLogo = false,
  showBack = false,
  showHelp = false,
  showHistory = false,
  historyLink = "/",
  showBackLink = "/",
}) {
  const router = useRouter();

  const [whatsAppConfig, setWhatsAppConfig] = useState(null);
  const [whatsAppLoading, setWhatsAppLoading] = useState(false);

  const needsWhatsApp = showHelp && !showBack;

  useEffect(() => {
    if (!needsWhatsApp) return;

    const loadWhatsApp = async () => {
      setWhatsAppLoading(true);
      try {
        const res = await api.get("/auth/get-whatsapp");
        if (res.data?.success) {
          setWhatsAppConfig(res.data.data);
        }
      } catch (err) {
        console.log(
          "Failed to load WhatsApp config:",
          err?.response?.data || err.message
        );
      } finally {
        setWhatsAppLoading(false);
      }
    };

    loadWhatsApp();
  }, [needsWhatsApp]);

  const goBack = () => {
    router.push(showBackLink);
  };

  // 🔥 Same Logic as React-Native version
  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    // remove + if present
    phone = phone.replace(/^\+/, "");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <header className="header_angelX">
      {/* LEFT SIDE */}
      <div className="header-left">
        {showBack ? (
          <AppImage
            src={arrowBack}
            alt="Back"
            className="icon-btn"
            onClick={goBack}
          />
        ) : showLogo ? (
          <>
            <AppImage src={logo} alt="Logo" className="logo" />
            {title === "AngelX" || title === "AngelX Wallet" ? (
              <h1 className="title-left">{title}</h1>
            ) : (
              <h1 className="title-left">{title}</h1>
            )}
          </>
        ) : null}
      </div>

      {/* CENTER TITLE */}
      {showBack && <h1 className="title-center">{title}</h1>}

      {/* RIGHT SIDE */}
      <div className="header-right">
        {/* HELP BUTTON */}
        {needsWhatsApp && (
          <button
            type="button"
            className={`header-help-btn ${whatsAppLoading ? "is-loading" : ""}`}
            onClick={handleWhatsAppClick}
            aria-label="WhatsApp help"
            aria-busy={whatsAppLoading}
          >
            <AppImage
              src={whatsapp}
              alt="WhatsApp"
              className="header-whatsapp-icon"
            />
          </button>
        )}

        {/* HISTORY */}
        {showHistory && (
          <AppImage
            src={history}
            alt="History"
            className="icon-btn"
            onClick={() => router.push(historyLink)}
          />
        )}
      </div>
    </header>
  );
}
