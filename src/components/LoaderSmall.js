import React, { useEffect } from "react";
import AppImage from "@/components/AppImage";

import "./LoaderSmall.css";
import loadingGif from "../assets/base/loading.gif";

export default function LoaderSmall({ show }) {
  useEffect(() => {
    if (show) {
      const blockBack = () =>
        window.history.pushState(null, "", window.location.href);

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", blockBack);

      return () => window.removeEventListener("popstate", blockBack);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="page-loader-overlay_small">
      <div className="loader-box_small">
        <div className="loader_small">
          <AppImage src={loadingGif} alt="loading" />
        </div>
      </div>
    </div>
  );
}
