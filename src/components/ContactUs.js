"use client";

import React, { useEffect, useState } from "react";
import "./ContactUs.css";
import BackHeader from "./BackHeader";
import api from "../api/axios";
import PageMeta from "./PageMeta";

const ContactUs = () => {
  const [whatsAppConfig, setWhatsAppConfig] = useState(null);

  // 🔥 Load WhatsApp config from backend API
  useEffect(() => {
    const loadWhatsApp = async () => {
      try {
        const res = await api.get("/auth/get-whatsapp");
        if (res.data?.success) {
          setWhatsAppConfig(res.data.data);
        }
      } catch (err) {
        console.log(
          "Failed to load WhatsApp config:",
          err?.response?.data || err.message
        );
      }
    };

    loadWhatsApp();
  }, []);

  // 🔥 Open WhatsApp chat with backend-defined message
  const handleWhatsAppClick = () => {
    let phone = whatsAppConfig?.phoneNumber || "447366320709";
    let message =
      whatsAppConfig?.defaultMessage ||
      "Hello, I need help with AngelX platform.";

    phone = phone.replace(/^\+/, ""); // remove +

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <PageMeta
        title="Contact Us | AngelX Exchange – 24/7 Support"
        description="Contact AngelX Exchange for 24/7 customer support. Get help with USDT trading, account issues, and platform assistance via live chat, email, or WhatsApp."
        keywords="AngelX contact, AngelX support, AngelX exchange help, USDT support, exchange contact"
        robots="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        canonical="https://angelx.exchange/contact-us"
      />
      <div className="contact-container">
        <BackHeader title="Contact Us" link="/exchange" />

        {/* Hero Section */}
        <section className="contact-hero">
          <h1>
            Contact <span>AngelsX</span>
          </h1>
          <p>
            We’re here to help you every step of the way. Whether you have a
            question about AngelsX USDT Sell, need assistance with your account,
            or want to learn more about our platform — our support team is ready
            24/7.
          </p>
        </section>

        {/* Contact Details */}
        <section className="contact-section">
          <h2>📬 Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>📧 Customer Support Email</h3>
              <p>angelxexchangeofficial@gmail.com</p>
            </div>

            {/* WhatsApp Live Chat */}
            <div className="contact-card" onClick={handleWhatsAppClick}>
              <h3>💬 Live Chat Support</h3>
              <p>Available 24/7 inside the AngelsX app and website.</p>
            </div>

            <div className="contact-card">
              <h3>🌐 Official Website</h3>
              <a
                href="https://angelx.exchange/"
                target="_blank"
                rel="noreferrer"
              >
                https://angelx.exchange/
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta">
          <h2>Need Quick Help?</h2>
          <p>
            Start a live chat now and get instant assistance from our expert
            team.
          </p>
          <button onClick={handleWhatsAppClick} className="contact-btn">
            Chat Now
          </button>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
