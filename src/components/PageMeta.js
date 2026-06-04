"use client";

import { useEffect } from "react";

/**
 * Client-side SEO meta tags (replaces react-helmet for App Router pages).
 */
export default function PageMeta({
  title,
  description,
  keywords,
  robots,
  canonical,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", robots);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, keywords, robots, canonical]);

  return null;
}
