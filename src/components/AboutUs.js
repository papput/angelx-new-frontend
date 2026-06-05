"use client";

import React from "react";
import "./AboutUs.css";
import BackHeader from "./BackHeader";
import Link from "next/link";
import PageMeta from "./PageMeta";

const AboutUs = () => {
  return (
    <>
      <PageMeta
        title="About Us – AngelX Official Exchange"
        description="Learn about AngelX Exchange, our mission to provide a fast, secure, and reliable USDT to INR trading experience, and how we empower users to trade confidently."
        keywords="about AngelX, AngelX exchange mission, AngelX team, USDT INR platform"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/about-us"
      />
      <div className="about-container">
        <BackHeader title="About Us" link="/exchange" />

        {/* Hero Section */}
        <section className="about-hero">
          <h1>
            Welcome to <span>AngelsX</span>
          </h1>
          <p>
            At AngelsX, we believe everyone deserves a
            <b>
              {" "}
              simple, secure, and rewarding way to experience the world of
              digital assets{" "}
            </b>
            . We created AngelsX to make USDT trading and exchange effortless
            for everyone — from first-time investors to seasoned experts.
          </p>
        </section>

        {/* Mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To empower users with fast, transparent, and secure access to exchange
            markets while delivering the best INR-to-USDT rates. Our goal is to
            help every trader <b>exchange more, earn more, and grow more</b>{" "}
            with confidence.
          </p>
        </section>

        {/* What We Do */}
        <section className="about-section">
          <h2>What We Do</h2>
          <ul>
            <li>Buy & Sell USDT instantly</li>
            <li>Top-tier multi-layer security</li>
            <li>Real-time pricing</li>
            <li>Smooth, mobile-friendly trading experience</li>
          </ul>
        </section>

        {/* Vision */}
        <section className="about-section">
          <h2>Our Vision is very broad</h2>
          <p>
            To become India’s most trusted and user-centric exchange exchange
            platform, connecting people with opportunity through innovation,
            education, and transparency.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="about-section">
          <h2>Why Traders Choose AngelsX</h2>
          <div className="about-grid">
            <div>✔ Instant registration & KYC</div>
            <div>✔ Real-time price tracking</div>
            <div>✔ Binance liquidity integration</div>
            <div>✔ Fast INR deposit & withdrawal</div>
            <div>✔ 24×7 customer support</div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Start Your Trading Journey</h2>
          <p>
            At AngelsX, we’re not just another exchange —{" "}
            <b>we’re your partner in financial growth.</b>
          </p>
          <Link href={"/exchange"}>
            <button className="cta-btn">Start Trading Now</button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
