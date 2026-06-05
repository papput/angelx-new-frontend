"use client";

import Footer from "@/components/Footer";
import SeoFooterLinks from "@/components/seo/SeoFooterLinks";

/** Blog routes are public — no login required */
export default function BlogsLayout({ children }) {
  return (
    <>
      {children}
      <SeoFooterLinks />
      <Footer />
    </>
  );
}
