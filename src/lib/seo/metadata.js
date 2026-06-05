import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  getCanonicalUrl,
} from "./config";

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  robots = "index, follow",
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}) {
  const canonical = getCanonicalUrl(path);
  const url = canonical;

  const keywordStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  return {
    title,
    description,
    keywords: keywordStr || undefined,
    robots: noIndex ? "noindex, nofollow" : robots,
    alternates: {
      canonical,
      languages: {
        [SITE_LOCALE]: canonical,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE.replace("-", "_"),
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
