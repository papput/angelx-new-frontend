"use client";

import React from "react";
import AppImage from "@/components/AppImage";
import { useRouter } from "next/navigation";

import "./LoginUi.css";
import Footer from "./Footer";
import logo from "../assets/mine3.jpg";

export default function LoginUI() {
  const router = useRouter();

  const goToMobileLogin = () => {
    router.push("/login");
  };

  return (
    <div className="outer">


      {/* Scrollable Area */}
      <div className="scrollArea">
        <div className="topWrapper">
          <AppImage src={logo} alt="logo" className="logo_login" />

          <h1 className="heading">Welcome to AngelX</h1>

          <p className="subtext">
            AngelX is the most trustworthy exchange partner. The more you
            exchange, the more you earn.
          </p>
        </div>

        {/* Login Button */}
        <div className="bottomWrapper">
          <button className="loginButton" onClick={goToMobileLogin}>
            Login
          </button>

          <p className="note">
            First time login will register a new account for you
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
