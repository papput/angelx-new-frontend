"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BlogContent from "@/components/BlogContent";
import "./Blogs.css";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function authorInitials(name) {
  if (!name) return "AX";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function estimateReadMinutes(sections = []) {
  const text = sections
    .flatMap((s) => s.blocks || [])
    .map((b) => b.text || "")
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogDetailView({ blog, jsonLd }) {
  const router = useRouter();
  const readMins = estimateReadMinutes(blog.sections);
  const typeLabel =
    blog.contentType === "current_affairs" ? "Current Affairs" : "Blog";

  return (
    <div className="blog-detail-page">
      <header className="blog-detail-toolbar">
        <button
          type="button"
          className="blog-detail-back-btn"
          onClick={() => router.push("/blogs")}
          aria-label="Back to all blogs"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="blog-detail-toolbar-title">AngelX Blog</span>
        <Link href="/blogs" className="blog-detail-toolbar-link">
          All posts
        </Link>
      </header>

      <div
        className={`blog-detail-cover ${blog.featuredImage ? "blog-detail-cover--image" : "blog-detail-cover--gradient"}`}
      >
        {blog.featuredImage ? (
          <img src={blog.featuredImage} alt="" className="blog-detail-cover-img" />
        ) : (
          <div className="blog-detail-cover-pattern" aria-hidden>
            <span className="blog-detail-cover-mark">✦</span>
          </div>
        )}
        <div className="blog-detail-cover-fade" aria-hidden />
      </div>

      <div className="blog-detail-wrap">
        <article className="blog-detail-card">
          <div className="blog-detail-card-accent" aria-hidden />

          <div className="blog-detail-top-meta">
            <span
              className={`blog-detail-type blog-detail-type--${blog.contentType || "blog_post"}`}
            >
              {typeLabel}
            </span>
            <span className="blog-detail-read-time">{readMins} min read</span>
          </div>

          <h1 className="blog-detail-title">{blog.title}</h1>

          {blog.subtitle && (
            <p className="blog-detail-subtitle">{blog.subtitle}</p>
          )}

          <div className="blog-detail-author-row">
            <div className="blog-detail-avatar" aria-hidden>
              {authorInitials(blog.authorName)}
            </div>
            <div className="blog-detail-author-info">
              <span className="blog-detail-author-name">
                {blog.authorName || "AngelX Team"}
              </span>
              <time className="blog-detail-date">
                {formatDate(blog.publishedAt || blog.createdAt)}
              </time>
            </div>
          </div>

          {blog.tags?.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="blog-detail-divider" />

          <BlogContent sections={blog.sections} />
        </article>

        <div className="blog-detail-footer-cta">
          <p>Explore more guides and updates</p>
          <Link href="/blogs" className="blog-detail-cta-btn">
            ← Back to all blogs
          </Link>
        </div>
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}
