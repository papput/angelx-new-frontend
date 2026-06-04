import React, { useEffect } from "react";
import "./Loader.css";

export default function Loader({ show }) {

  useEffect(() => {
    if (show) {
      const blockBack = () => window.history.pushState(null, "", window.location.href);
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", blockBack);

      return () => window.removeEventListener("popstate", blockBack);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="page-loader-overlay">
      <div className="loader-box">
        <div className="loader"></div>
      </div>
    </div>
  );
}
