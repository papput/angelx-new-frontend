import { notFound } from "next/navigation";
import BlogDetailView from "@/components/BlogDetailView";
import { fetchBlogBySlug } from "@/lib/blogs";
import { buildDefaultArticleSchema, resolveBlogJsonLd } from "@/lib/blogSchema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCanonicalUrl, SITE_URL } from "@/lib/seo/config";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };

  const canonical = blog.canonicalUrl
    ? getCanonicalUrl(blog.canonicalUrl)
    : getCanonicalUrl(`/blogs/${blog.slug}`);

  return {
    ...buildPageMetadata({
      title: blog.metaTitle || blog.ogTitle || `${blog.title} – AngelX Blog`,
      description: blog.metaDescription || blog.excerpt || blog.subtitle,
      path: `/blogs/${blog.slug}`,
      keywords: blog.seoKeywords?.length ? blog.seoKeywords : blog.tags,
      type: "article",
      robots: blog.robotsMeta || "index, follow",
    }),
    alternates: { canonical },
    openGraph: {
      title: blog.ogTitle || blog.metaTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt,
      images:
        blog.ogImage || blog.featuredImage
          ? [blog.ogImage || blog.featuredImage]
          : [],
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.twitterTitle || blog.ogTitle || blog.metaTitle || blog.title,
      description:
        blog.twitterDescription ||
        blog.ogDescription ||
        blog.metaDescription ||
        blog.excerpt ||
        "",
      images: blog.twitterImage || blog.ogImage || blog.featuredImage
        ? [blog.twitterImage || blog.ogImage || blog.featuredImage]
        : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) notFound();

  const jsonLd = resolveBlogJsonLd(blog, () =>
    buildDefaultArticleSchema(blog, {
      brandName: blog.authorName || "AngelX",
      siteUrl: SITE_URL,
      path: `/blogs/${blog.slug}`,
    }),
  );

  return <BlogDetailView blog={blog} jsonLd={jsonLd} />;
}
