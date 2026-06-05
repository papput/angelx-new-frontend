import { SITE_URL, PUBLIC_ROUTES } from "@/lib/seo/config";
import { getAllGuideSlugs } from "@/lib/seo/guides";
import { fetchPublishedBlogs } from "@/lib/blogs";

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  const guideEntries = getAllGuideSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideIndex = {
    url: `${SITE_URL}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  };

  let blogEntries = [];
  try {
    const blogs = await fetchPublishedBlogs();
    blogEntries = blogs.map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: b.updatedAt || b.publishedAt || now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, guideIndex, ...guideEntries, ...blogEntries];
}
