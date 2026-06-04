"use client";

import React from "react";
import AppImage from "@/components/AppImage";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Footer.css";

import homeLight from "../assets/tabbar/tabbar_home_normal_plus.png";
import exchangeLight from "../assets/exchange.jpg";
import exchangeDark from "../assets/tabbar/tabbar_exchange_index_selected_plus.png";
import mineLight from "../assets/mine.jpg";
import mineDark from "../assets/tabbar/tabbar_mine_selected_plus.png";
import homeDark from "../assets/tabbar/tabbar_home_selected_plus.png";

function FooterLink({ href, exact, iconLight, iconDark, label }) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`footer-link ${isActive ? "active" : ""}`}
    >
      <AppImage
        src={isActive ? iconDark : iconLight}
        alt={label}
        className="footer-icon"
      />
      <span className="footer-text">{label}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <nav className="footer">
      <div className="footer-inner">
        <div className="footer-items">
          <FooterLink
            href="/"
            exact
            iconLight={homeLight}
            iconDark={homeDark}
            label="Home"
          />
          <FooterLink
            href="/exchange"
            iconLight={exchangeLight}
            iconDark={exchangeDark}
            label="Exchange"
          />
          <FooterLink
            href="/profile"
            iconLight={mineLight}
            iconDark={mineDark}
            label="Mine"
          />
        </div>
      </div>
    </nav>
  );
}
