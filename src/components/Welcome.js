
import React from "react";
import AppImage from "@/components/AppImage";

import "./Welcome.css";

import mine3 from "../assets/mine3.jpg";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <AppImage src={mine3} alt="AngelX Logo" className="welcome-logo" />

        <h1 className="welcome-title">Welcome to AngelX</h1>

        <p className="welcome-subtext">
          AngelX is the most trustworthy exchange partner. The more you exchange,
          the more you earn.
        </p>
      </div>

      <div className="welcome-actions">
        <button className="welcome-btn">Login</button>

        <p className="welcome-note">
          First time login will register a new account for you
        </p>
      </div>
    </div>
  );
}
