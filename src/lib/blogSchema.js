export function buildDefaultArticleSchema(blog, { brandName = "AngelX", siteUrl, path }) {
  const pagePath = path || `/blogs/${blog.slug}`;
  const url = `${siteUrl.replace(/\/$/, "")}${pagePath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    author: {
      "@type": "Organization",
      name: blog.authorName || brandName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog.canonicalUrl || url,
    },
    url: blog.canonicalUrl || url,
  };

  if (blog.featuredImage) schema.image = blog.featuredImage;
  if (blog.publishedAt) schema.datePublished = blog.publishedAt;

  return schema;
}

export function resolveBlogJsonLd(blog, fallback) {
  const raw = blog.structuredData?.trim();
  if (!raw) return fallback();

  try {
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object") return fallback();

    if (!Array.isArray(parsed) && !parsed["@context"] && !parsed["@graph"]) {
      return { "@context": "https://schema.org", ...parsed };
    }

    return parsed;
  } catch {
    return fallback();
  }
}
