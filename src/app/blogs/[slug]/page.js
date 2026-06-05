import { notFound } from "next/navigation";
import BlogDetailView from "@/components/BlogDetailView";
import { fetchBlogBySlug } from "@/lib/blogs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCanonicalUrl } from "@/lib/seo/config";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };

  const canonical = blog.canonicalUrl
    ? getCanonicalUrl(blog.canonicalUrl)
    : getCanonicalUrl(`/blogs/${blog.slug}`);

  return {
    ...buildPageMetadata({
      title: blog.ogTitle || `${blog.title} – AngelX Blog`,
      description: blog.metaDescription || blog.excerpt || blog.subtitle,
      path: `/blogs/${blog.slug}`,
      type: "article",
      robots: blog.robotsMeta || "index, follow",
    }),
    alternates: { canonical },
    openGraph: {
      title: blog.ogTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt,
      images:
        blog.ogImage || blog.featuredImage
          ? [blog.ogImage || blog.featuredImage]
          : [],
      type: "article",
      url: canonical,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) notFound();

  const jsonLd = blog.structuredData?.trim()
    ? (() => {
        try {
          return JSON.parse(blog.structuredData);
        } catch {
          return null;
        }
      })()
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: blog.metaDescription || blog.excerpt,
        image: blog.featuredImage,
        datePublished: blog.publishedAt,
        author: {
          "@type": "Organization",
          name: blog.authorName || "AngelX",
        },
      };

  return <BlogDetailView blog={blog} jsonLd={jsonLd} />;
}
