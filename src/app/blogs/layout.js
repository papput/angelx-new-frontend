"use client";

import Footer from "@/components/Footer";

/** Blog routes are public — no login required */
export default function BlogsLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
