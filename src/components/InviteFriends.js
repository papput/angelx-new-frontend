import React, { useState, useEffect } from "react";
import { getImageSrc } from "@/utils/image";

import { QRCodeCanvas } from "qrcode.react";
import Toast from "./Toast"; // ✅ Import your Toast component
import "./InviteFriends.css";
import "./Global.css";

/* assets */
import bgimage from "../assets/bgimage.jpg";

export default function InviteFriends() {
  const [showModal, setShowModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.REACT_APP_BASE_URL ||
    "https://angelx.exchange/";

  const rules = [
    { level: "1 Level", rate: "0.1%" },
    { level: "2 Level", rate: "0.03%" },
    { level: "3 Level", rate: "0.02%" },
    { level: "4 Level", rate: "0.01%" },
    { level: "5 Level", rate: "0.01%" },
  ];

  useEffect(() => {
    // Generate random invite code
    const code =
      Math.random().toString(36).substring(2, 8) +
      "x" +
      Math.random().toString(36).substring(2, 6).toUpperCase();
    setInviteCode(code);
  }, []);

  const inviteLink = `${baseUrl}?ref=${inviteCode}`;

  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      triggerToast("Copied successfully!");
    } catch {
      triggerToast("Failed to copy");
    }
  };

  return (
    <div
      className="invite-page"
      style={{
        backgroundImage: `url(${getImageSrc(bgimage)})`,
      }}
    >
      {/* Back button */}
      <div className="invite-back">
        <button className="invite-back-btn" onClick={() => window.history.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="invite-back-icon"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
      </div>

      {/* Heading */}
      <div className="invite-header">
        <h2 className="invite-title">Invite friends and make money together</h2>
        <p className="invite-subtitle">
          Each accepted order of your subordinates will get you corresponding
          rewards
        </p>
      </div>

      {/* Rules card */}
      <div className="invite-rules-card">
        <div className="invite-rules-title-wrap">
          <span className="invite-rules-title">⚡ Rules ⚡</span>
        </div>

        <div className="invite-table-wrap">
          <div className="invite-table-head">
            <div className="invite-th">Subordinate</div>
            <div className="invite-th">Commission rate</div>
          </div>

          <div className="invite-table-body">
            {rules.map((item, index) => (
              <div className="invite-row" key={index}>
                <div className="invite-td">{item.level}</div>
                <div className="invite-td rate">{item.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite button */}
      <button className="invite-btn" onClick={() => setShowModal(true)}>
        Invite friends
      </button>

      {/* Modal */}
      {showModal && (
        <div className="invite-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="invite-modal"
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
          >
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <h2 className="modal-title">
              Invite friends and make money together
            </h2>
            <p className="modal-subtitle">
              Each accepted order of your subordinates will get you corresponding rewards
            </p>

            <div className="qr-wrap">
              <QRCodeCanvas value={inviteLink} size={160} includeMargin={true} />
            </div>

            <p className="qr-note">
              Please use mobile browser to scan QR code to register
            </p>

            <div className="invite-field">
              <label>Invite code</label>
              <div className="field-box">
                <input type="text" value={inviteCode} readOnly />
                <button onClick={() => copyToClipboard(inviteCode)}>📋</button>
              </div>
            </div>

            <div className="invite-field">
              <label>Invite link</label>
              <div className="field-box">
                <input type="text" value={inviteLink} readOnly />
                <button onClick={() => copyToClipboard(inviteLink)}>📋</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast Popup */}
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
