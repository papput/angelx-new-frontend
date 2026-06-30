"use client";

import "./Blogs.css";
import {
  isExternalHref,
  linkRelForHref,
  linkTargetForHref,
  parseInlineLinks,
} from "@/lib/blogText";
import Link from "next/link";

function InlineText({ text }) {
  const segments = parseInlineLinks(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "link") {
          const href = segment.href;
          const className = "blog-inline-link";

          if (href.startsWith("#")) {
            return (
              <a key={`${index}-${href}`} href={href} className={className}>
                {segment.text}
              </a>
            );
          }

          if (isExternalHref(href)) {
            return (
              <a
                key={`${index}-${href}`}
                href={href}
                className="blog-inline-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {segment.text}
              </a>
            );
          }

          return (
            <Link key={`${index}-${href}`} href={href} className="blog-inline-link">
              {segment.text}
            </Link>
          );
        }
        return <span key={index}>{segment.value}</span>;
      })}
    </>
  );
}

function BlogLinkBlock({ block }) {
  if (!block.text?.trim() || !block.href?.trim()) return null;

  const href = block.href.trim();
  const isAnchor = href.startsWith("#");
  const external = !isAnchor && (block.linkKind === "external" || isExternalHref(href));
  const target = linkTargetForHref(href, block.target);
  const rel = linkRelForHref(href, target);
  const className = `blog-block-link blog-block-link--${external ? "external" : "internal"}`;

  if (external) {
    return (
      <p className="blog-link-wrap">
        <a href={href} className={className} target={target} rel={rel}>
          {block.text}
          <span className="blog-block-link-icon" aria-hidden="true">
            ↗
          </span>
        </a>
      </p>
    );
  }

  return (
    <p className="blog-link-wrap">
      {isAnchor ? (
        <a href={href} className={className}>
          {block.text}
        </a>
      ) : (
        <Link href={href} className={className} target={target} rel={rel}>
          {block.text}
        </Link>
      )}
    </p>
  );
}

function BlogTocBlock({ block, sections = [] }) {
  const items = sections
    .filter((s) => s.title?.trim())
    .map((s) => ({ label: s.title.trim(), href: `#${s.id}` }));

  if (!items.length) return null;

  return (
    <nav className="blog-toc" aria-label={block.text || "Table of contents"}>
      <h3 className="blog-toc-title">{block.text || "Table of Contents"}</h3>
      <ol className="blog-toc-list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TableBlock({ block }) {
  const table = block.table || {};
  const columns = table.columns || [];
  const rows = table.rows || [];

  return (
    <div className="blog-table-wrap">
      <table
        className={`blog-table ${table.stripe ? "striped" : ""}`}
      >
        {table.header && columns.length > 0 && (
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block, sections }) {
  if (block.type === "heading") {
    if (block.level === "h3") {
      return (
        <h3 className="blog-block-heading blog-block-heading--h3">
          <InlineText text={block.text} />
        </h3>
      );
    }
    return (
      <h2 className="blog-block-heading">
        <InlineText text={block.text} />
      </h2>
    );
  }
  if (block.type === "table") {
    return <TableBlock block={block} />;
  }
  if (block.type === "link") {
    return <BlogLinkBlock block={block} />;
  }
  if (block.type === "toc") {
    return <BlogTocBlock block={block} sections={sections} />;
  }
  if (block.type === "list") {
    const items = (block.items || []).filter(Boolean);
    if (!items.length) return null;
    const ListTag = block.style === "ordered" ? "ol" : "ul";
    return (
      <ListTag
        className={`blog-block-list blog-block-list--${block.style === "ordered" ? "ordered" : "bullet"}`}
      >
        {items.map((item, i) => (
          <li key={i}>
            <InlineText text={item} />
          </li>
        ))}
      </ListTag>
    );
  }
  return (
    <p className="blog-block-paragraph">
      {block.text?.split("\n").map((line, i, arr) => (
        <span key={i}>
          <InlineText text={line} />
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export default function BlogContent({ sections = [] }) {
  return (
    <article className="blog-article-body">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="blog-section">
          {section.title && (
            <div className="blog-section-label">
              <span className="blog-section-label-line" aria-hidden />
              <h2 className="blog-section-title">{section.title}</h2>
            </div>
          )}
          {(section.blocks || []).map((block) => (
            <Block key={block.id} block={block} sections={sections} />
          ))}
        </section>
      ))}
    </article>
  );
}
