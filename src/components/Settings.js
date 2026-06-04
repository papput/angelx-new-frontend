// src/pages/Settings.jsx
import { useEffect, useState } from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import api from "../api/axios";
import Toast from "./Toast";
import "./Settings.css";
import LoaderSmall from "./LoaderSmall";

/* assets */
import customerIcon from "../assets/setting/customer.png";
import businessIcon from "../assets/setting/business.png";
import versionIcon from "../assets/setting/version.png";
import installIcon from "../assets/setting/install.png";
import lockIcon from "../assets/setting/trancastion_pwd.png";
import Header from "./Header";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Settings() {
  const router = useRouter();

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderPage, setLoaderPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsAppConfig, setWhatsAppConfig] = useState(null);

  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    phone = phone.replace(/^\+/, ""); // remove + if exists

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const loadWhatsAppConfig = async () => {
    try {
      setLoaderPage(true);

      const res = await api.get("/auth/get-whatsapp");
      if (res.data?.success) {
        setWhatsAppConfig(res.data.data);
      }
    } catch (err) {
      console.log("Failed to load WhatsApp config:", err.message);
    } finally {
      setLoaderPage(false); // ✅ ONLY here
    }
  };

  useEffect(() => {
    loadWhatsAppConfig();
  }, []);

  /* ---------------------------------------------------
      Toast Handler
  --------------------------------------------------- */
  const triggerToast = (msg) => {
    setToastVisible(false);
    setToastMsg(msg);
    setTimeout(() => setToastVisible(true), 30);
  };

  /* ---------------------------------------------------
      LOGOUT FUNCTION
  --------------------------------------------------- */
  // const logout = async () => {
  //   if (loading) return;
  //   setLoading(true);

  //   try {
  //     // Call backend logout API
  //     const res = await api.post("/logout");

  //     // Clear all saved data
  //     localStorage.clear();

  //     triggerToast(
  //       res.data?.success ? "Logged out successfully" : "Session ended"
  //     );

  //     // Redirect after slight delay
  //     setTimeout(() => {
  //       window.location.href = "/exchange";
  //     }, 1200);
  //   } catch (err) {
  //     console.error("Logout error:", err);

  //     localStorage.clear();
  //     triggerToast("logged out");

  //     setTimeout(() => {
  //       window.location.href = "/exchange";
  //     }, 1000);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const logout = async () => {
    // Open confirmation modal instead of directly logging out
    setIsModalOpen(true);
  };

  // When user confirms logout
  const handleConfirmLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post("/logout");
      localStorage.clear();

      triggerToast(
        res.data?.success ? "Logged out successfully" : "Session ended",
      );

      setTimeout(() => {
        window.location.href = "/exchange";
      }, 1200);
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.clear();
      // triggerToast("logged out");

      setTimeout(() => {
        window.location.href = "/exchange";
      }, 1000);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  /* ---------------------------------------------------
      SEND OTP (RESET TRANSACTION PASSWORD)
  --------------------------------------------------- */
  const sendOtp = async () => {
    try {
      const res = await api.post("/auth/send-tp-reset-otp");

      if (res.data.success) {
        triggerToast("OTP sent successfully");

        setTimeout(() => {
          router.push("/reset-transaction-password");
        }, 800);
      } else {
        triggerToast(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      triggerToast(
        err.response?.data?.message || "Server error while sending OTP",
      );
    }
  };

  const settings = [
    {
      icon: customerIcon,
      label: "Customer service",
      action: () => handleWhatsAppClick(),
    },
    {
      icon: businessIcon,
      label: "Business cooperation",
      action: () => handleWhatsAppClick(),
    },
    {
      icon: versionIcon,
      label: "Version",
      value: "v3.2.1",
    },
    {
      icon: installIcon,
      label: "Install the official version",
      action: () => triggerToast("Installing official version..."),
    },
    {
      icon: installIcon,
      label: "Install the official version",
      action: () => {
        window.location.href =
          "https://github.com/papput/angelsx_APK/releases/download/v1.0.0/angelx.apk";
        // "https://github.com/papput/angelx/releases/latest/download/angelx.apk";
      },
    },
  ];

  return loaderPage ? (
    <LoaderSmall show={true} />
  ) : (
    <>
      <Header title="Setting" showBack showBackLink="/profile" />
      <div className="settings-page">
        {/* List */}
        <div className="settings-list">
          {settings.map((item, i) => (
            <div key={i} className="settings-item" onClick={item.action}>
              <div className="settings-left">
                <AppImage
                  src={item.icon}
                  alt={item.label}
                  className="settings-icon"
                />
                <span className="settings-label">{item.label}</span>
              </div>

              {item.value ? (
                <span className="settings-value">{item.value}</span>
              ) : (
                <span className="settings-arrow">›</span>
              )}
            </div>
          ))}
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={logout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>

        <DeleteConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmLogout}
          message="Are you confirm sign out?"
          confirmText="Confirm"
          cancelText="Cancel"
        />

        {/* Toast Popup */}
        <Toast
          message={toastMsg}
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </div>
    </>
  );
}
