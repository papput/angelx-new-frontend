import { notFound } from "next/navigation";
import GuideArticle from "@/components/seo/GuideArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getGuide, getAllGuideSlugs } from "@/lib/seo/guides";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide Not Found" };

  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/blog/${slug}`,
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
