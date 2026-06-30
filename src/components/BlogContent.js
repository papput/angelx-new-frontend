"use client";

import "./Blogs.css";
import BlogHtml from "@/components/BlogHtml";
import BlogToc from "@/components/BlogToc";
import {
  isExternalHref,
  linkRelForHref,
  linkTargetForHref,
  parseInlineLinks,
} from "@/lib/blogText";
import { stripHtml } from "@/lib/tocUtils";
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
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {segment.text}
              </a>
            );
          }

          return (
            <Link key={`${index}-${href}`} href={href} className={className}>
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
        <a href={href} className={className} target={target} rel={rel} title={block.linkTitle}>
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
        <a href={href} className={className} title={block.linkTitle}>
          {block.text}
        </a>
      ) : (
        <Link href={href} className={className} target={target} rel={rel} title={block.linkTitle}>
          {block.text}
        </Link>
      )}
    </p>
  );
}

function TableBlock({ block }) {
  const table = block.table || {};
  const columns = table.columns || [];
  const rows = table.rows || [];

  return (
    <div className="blog-table-wrap">
      <table className={`blog-table ${table.stripe ? "striped" : ""}`}>
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

function ImageBlock({ block }) {
  if (!block.src) return null;
  const align = block.align || "center";
  return (
    <figure className={`blog-figure blog-figure--${align}`}>
      <img
        src={block.src}
        alt={block.alt || ""}
        title={block.title || undefined}
        loading="lazy"
        style={block.width ? { width: `${block.width}%`, maxWidth: "100%" } : undefined}
        className="blog-body-image"
      />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}

function HeadingBlock({ block }) {
  const level = parseInt(String(block.level || "h2").replace(/^h/i, ""), 10) || 2;
  const clamped = Math.min(6, Math.max(2, level));
  const anchorId = block.anchorId || undefined;
  const label = stripHtml(block.html) || block.text;

  if (block.html?.match(new RegExp(`^<h${clamped}[\\s>]`, "i"))) {
    const withId = block.html.replace(
      new RegExp(`^<h${clamped}`, "i"),
      `<h${clamped} id="${anchorId || ""}"`,
    );
    return (
      <BlogHtml
        html={withId}
        className={`blog-block-heading blog-block-heading--h${clamped}`}
      />
    );
  }

  if (block.html) {
    const Tag = `h${clamped}`;
    return (
      <Tag
        id={anchorId}
        className={`blog-block-heading blog-block-heading--h${clamped}`}
      >
        <BlogHtml html={block.html} />
      </Tag>
    );
  }

  const Tag = `h${clamped}`;
  return (
    <Tag
      id={anchorId}
      className={`blog-block-heading blog-block-heading--h${clamped}`}
    >
      <InlineText text={label} />
    </Tag>
  );
}

function Block({ block, sections }) {
  if (block.type === "heading") {
    return <HeadingBlock block={block} />;
  }
  if (block.type === "table") {
    return <TableBlock block={block} />;
  }
  if (block.type === "link") {
    return <BlogLinkBlock block={block} />;
  }
  if (block.type === "toc") {
    return <BlogToc block={block} sections={sections} />;
  }
  if (block.type === "image") {
    return <ImageBlock block={block} />;
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
  if (block.html) {
    return <BlogHtml html={block.html} className="blog-block-paragraph" />;
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
        <section key={section.id} className="blog-section">
          {(section.blocks || []).map((block) => (
            <Block key={block.id} block={block} sections={sections} />
          ))}
        </section>
      ))}
    </article>
  );
}
