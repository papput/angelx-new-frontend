import { useState } from "react";
import AppImage from "@/components/AppImage";

import "./ApkDownloadBox.css";

import logo from "../assets/logo.jpg";

export default function ApkDownloadBox() {
  const [show, setShow] = useState(true);

  const APK_URL =
    "https://github.com/papput/angelsx_APK/releases/download/v1.0.0/angelx.apk";

  if (!show) return null;

  return (
    <div className="apk-box-wrapper">
      <div className="apk-box">
        <button className="apk-close" onClick={() => setShow(false)}>
          ×
        </button>

        <div className="apk-left">
          <AppImage src={logo} alt="Logo" className="apk-logo" />

          <div className="apk-text-group">
            <span className="apk-title">AngelX App</span>
            <span className="apk-subtitle">
              The best exchange USDT platform
            </span>
          </div>
        </div>

        <a href={APK_URL} className="apk-download-btn">
          Download
        </a>
      </div>
    </div>
  );
}
