import BlogsList from "@/components/BlogsList";
import { fetchPublishedBlogs } from "@/lib/blogs";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Blog – AngelX Exchange | USDT & Digital Asset Insights",
  description:
    "Read the latest articles, guides, and updates from AngelX Exchange on USDT, USDT to INR exchange, and secure INR settlement on the AngelX Platform.",
  path: "/blogs",
  keywords: [
    "AngelX blog",
    "USDT insights",
    "USDT to INR",
    "digital asset articles",
    "AngelX Exchange blog",
  ],
});

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await fetchPublishedBlogs();
  } catch {
    blogs = [];
  }

  return <BlogsList blogs={blogs} />;
}
