"use client";

import { sanitizeBlogHtml } from "@/lib/blogHtml";

export default function BlogHtml({ html, className = "" }) {
  if (!html?.trim()) return null;
  const safe = sanitizeBlogHtml(html);
  return (
    <div
      className={`blog-html ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
