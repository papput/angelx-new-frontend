"use client";

import Link from "next/link";
import BackHeader from "@/components/BackHeader";
import "./Blogs.css";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogCard({ blog, featured = false }) {
  const typeLabel =
    blog.contentType === "current_affairs" ? "Current Affairs" : "Blog";

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`blog-card ${featured ? "blog-card--featured" : ""}`}
    >
      <div className="blog-card-media">
        {blog.featuredImage ? (
          <img src={blog.featuredImage} alt="" className="blog-card-image" />
        ) : (
          <div className="blog-card-placeholder" aria-hidden>
            <span className="blog-card-placeholder-icon">✦</span>
          </div>
        )}
        <span className={`blog-card-badge blog-card-badge--${blog.contentType || "blog_post"}`}>
          {typeLabel}
        </span>
        {blog.isFeatured && <span className="blog-card-pin">Featured</span>}
      </div>
      <div className="blog-card-body">
        <h2 className="blog-card-title">{blog.title}</h2>
        {blog.excerpt && (
          <p className="blog-card-excerpt">{blog.excerpt}</p>
        )}
        <div className="blog-card-footer">
          <div className="blog-card-meta">
            {blog.authorName && (
              <span className="blog-card-author">{blog.authorName}</span>
            )}
            <span className="blog-card-date">
              {formatDate(blog.publishedAt || blog.createdAt)}
            </span>
          </div>
          <span className="blog-card-cta">
            Read
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsList({ blogs = [] }) {
  const featured = blogs.filter((b) => b.isFeatured);
  const regular = blogs.filter((b) => !b.isFeatured);

  return (
    <div className="blogs-page blogs-page--public">
      <BackHeader title="Blogs" />
      <p className="blogs-public-note">Free to read — no account required</p>

      <section className="blogs-hero">
        <div className="blogs-hero-glow" aria-hidden />
        <p className="blogs-hero-eyebrow">AngelX Insights</p>
        <h1 className="blogs-hero-title">
          Learn, trade &amp; grow with <span>AngelX</span>
        </h1>
        <p className="blogs-hero-desc">
          Expert guides on USDT, secure INR payouts, and everything you need to
          trade confidently on India&apos;s trusted exchange.
        </p>
        {blogs.length > 0 && (
          <div className="blogs-hero-stats">
            <span>
              <strong>{blogs.length}</strong> articles
            </span>
            {featured.length > 0 && (
              <span>
                <strong>{featured.length}</strong> featured
              </span>
            )}
          </div>
        )}
      </section>

      <div className="blogs-content">
        {blogs.length === 0 ? (
          <div className="blogs-empty">
            <div className="blogs-empty-icon">📚</div>
            <h2>Coming soon</h2>
            <p>
              We&apos;re preparing helpful articles for you. Check back shortly
              for updates on crypto and USDT trading.
            </p>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <section className="blogs-section">
                <h2 className="blogs-section-title">Featured</h2>
                <div className="blogs-grid blogs-grid--featured">
                  {featured.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} featured />
                  ))}
                </div>
              </section>
            )}

            {regular.length > 0 && (
              <section className="blogs-section">
                {featured.length > 0 && (
                  <h2 className="blogs-section-title">Latest articles</h2>
                )}
                <div className="blogs-grid">
                  {regular.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
