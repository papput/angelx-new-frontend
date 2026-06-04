"use client";

import React from "react";
import AppImage from "@/components/AppImage";

import { useRouter } from "next/navigation";
import arrowBack from "../assets/base/arrow_back.png"; // ✅ your PNG

import "./BackHeader.css"; // optional styling

export default function BackHeader({ title }) {
  const router = useRouter();
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/"); // fallback home route
    }
  };

  return (
    <div className="bh-header">
      <AppImage
        src={arrowBack}
        alt="Back"
        className="bh-back-icon"
        onClick={() => goBack()}
      />
      <h2 className="bh-title">{title}</h2>
    </div>
  );
}
