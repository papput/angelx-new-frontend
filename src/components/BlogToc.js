"use client";

import { useEffect, useState } from "react";
import { extractTocItems } from "@/lib/tocUtils";

export default function BlogToc({ block, sections = [] }) {
  const items = extractTocItems(sections);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const item of items) {
      const el = document.getElementById(item.anchorId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  function handleClick(e, href) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.history.replaceState(null, "", href);
    }
  }

  return (
    <nav className="blog-toc" aria-label={block.text || "Table of contents"}>
      <h3 className="blog-toc-title">{block.text || "Table of Contents"}</h3>
      <ol className="blog-toc-list">
        {items.map((item) => (
          <li
            key={item.href}
            className={`blog-toc-item blog-toc-item--h${item.level}${
              activeId === item.anchorId ? " is-active" : ""
            }`}
          >
            <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
