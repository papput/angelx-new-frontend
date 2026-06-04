"use client";

import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/context/AuthContext";
import "@/App.css";

export default function AppShell({ children }) {
  const { refreshAuth } = useAuth();

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="main_app">
      <ScrollToTop />
      {children}
    </div>
  );
}
