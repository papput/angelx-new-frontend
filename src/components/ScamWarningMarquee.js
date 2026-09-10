"use client";

import "./ScamWarningMarquee.css";

const SCAM_SITES = [
  { domain: "angelx.in", suffix: " is a scam website" },
  { domain: "angelx.ind.in", suffix: " is a scam website" },
];

function SirenVideo({ className = "" }) {
  return (
    <span className={`scam-siren ${className}`} aria-hidden="true">
      <video
        className="scam-siren-video"
        src="/siren-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </span>
  );
}

function MarqueeItems() {
  return SCAM_SITES.map(({ domain, suffix }) => (
    <span key={domain} className="scam-chip">
      <span className="scam-domain">{domain}</span>
      <span className="scam-suffix">{suffix}</span>
      <span className="scam-sep" aria-hidden="true">
        •
      </span>
    </span>
  ));
}

export default function ScamWarningMarquee() {
  return (
    <div className="scam-marquee" role="status" aria-live="polite">
      <SirenVideo className="scam-siren--left" />

      <div className="scam-marquee-viewport">
        <div className="scam-marquee-track">
          <div className="scam-marquee-group">
            <MarqueeItems />
            <MarqueeItems />
          </div>
          <div className="scam-marquee-group" aria-hidden="true">
            <MarqueeItems />
            <MarqueeItems />
          </div>
        </div>
      </div>

      <SirenVideo className="scam-siren--right" />
    </div>
  );
}
