import React from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import history from "../assets/recharge/history.png"; // ✅ your PNG
import arrowBack from "../assets/base/arrow_back.png"; // ✅ your PNG

import "./BackHeaderMain.css"; // optional styling

export default function BackHeaderMain({ title, lastLink }) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/"); // fallback home route
    }
  };

  return (
    <div className="withdraw-header">
      <div className="back-arrow" onClick={() => goBack()}>
        <AppImage
          src={arrowBack}
          alt="load"
          style={{ width: "24px", marginLeft: "10px" }}
        />
      </div>
      <h2 className="header-title">{title}</h2>
      <div
        className="header-icon"
        onClick={() => {
          router.push(`${lastLink}`);
        }}
      >
        <AppImage src={history} alt="load" />
      </div>
    </div>
  );
}
