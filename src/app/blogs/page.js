import BlogsList from "@/components/BlogsList";
import { fetchPublishedBlogs } from "@/lib/blogs";

export const metadata = {
  title: "Blogs – AngelX | Crypto & USDT Insights",
  description:
    "Read the latest articles, guides, and updates from AngelX on USDT, crypto trading, and secure INR payouts.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await fetchPublishedBlogs();
  } catch {
    blogs = [];
  }

  return <BlogsList blogs={blogs} />;
}
