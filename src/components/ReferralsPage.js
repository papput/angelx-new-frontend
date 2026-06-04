import "./ReferralsPage.css";
import { getImageSrc } from "@/utils/image";

import AppImage from "@/components/AppImage";


/* === IMPORT IMAGES === */
import backIcon from "../assets/mine/referrals_back.png";
import bannerBg from "../assets/mine/referrals_bg.png";
import emptyImg from "../assets/base/empty.png";
import { useRouter } from "next/navigation";

export default function ReferralsPage() {
    const router = useRouter();
  return (
    <div className="ref-container">
      {/* 🔙 BACK BUTTON */}
      <button className="ref-back-btn" onClick={() => router.push("/profile")}>
        <AppImage src={backIcon} alt="back" className="ref-back-icon" />
      </button>

      {/* 🔥 BANNER */}
      <div
        className="ref-banner"
        style={{ backgroundImage: `url(${getImageSrc(bannerBg)})` }}
      >
        {/* <div className="ref-banner-content">
          <div>
            <h1 className="ref-title">MY REFERRALS</h1>
            <p className="ref-subtitle">exchange more &nbsp; earn more</p>
          </div>

          <AppImage src={bannerBg} alt="illustration" className="ref-banner-img" />
        </div> */}
      </div>

      {/* 🟡 EMPTY BOX */}
      <div className="ref-empty-wrap">
        <AppImage src={emptyImg} alt="empty" className="ref-empty-img" />
        <p className="ref-empty-text">Empty</p>
      </div>
    </div>
  );
}
