/** Preferred canonical host (always non-www) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://angelx.exchange"
)
  .replace(/\/$/, "")
  .replace(/^https?:\/\/www\./, "https://");

/** Build absolute canonical URL for any path */
export function getCanonicalUrl(path = "/") {
  if (!path) return `${SITE_URL}/`;
  if (path.startsWith("http")) {
    return path.replace(/\/$/, "").replace(/^https?:\/\/www\./, "https://");
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

export const SITE_NAME = "AngelX Exchange";
export const SITE_TAGLINE = "USDT to INR Digital Asset Exchange Platform";
export const SITE_LOCALE = "en-IN";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo512.png`;

export const ORGANIZATION = {
  name: "AngelX Exchange",
  legalName: "AngelX Exchange",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  email: "support@angelx.exchange",
  sameAs: [
    "https://angelx.exchange",
    "https://angelx-ssr.vercel.app",
  ],
  description:
    "AngelX is a trusted USDT exchange platform for converting USDT to INR with transparent rates, fast settlement, and secure digital asset transactions.",
};

export const PUBLIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/exchange", priority: 0.9, changefreq: "daily" },
  { path: "/about-us", priority: 0.8, changefreq: "monthly" },
  { path: "/contact-us", priority: 0.8, changefreq: "monthly" },
  { path: "/faq", priority: 0.9, changefreq: "weekly" },
  { path: "/blog", priority: 0.8, changefreq: "weekly" },
  { path: "/blogs", priority: 0.85, changefreq: "daily" },
  { path: "/privacy-policy", priority: 0.5, changefreq: "yearly" },
  { path: "/terms-conditions", priority: 0.5, changefreq: "yearly" },
  { path: "/disclaimer", priority: 0.5, changefreq: "yearly" },
  { path: "/refund-policy", priority: 0.5, changefreq: "yearly" },
];

export const GUIDE_SILOS = [
  {
    id: "usdt-guides",
    title: "USDT Guides",
    guides: [
      "what-is-usdt",
      "usdt-for-beginners",
      "how-usdt-works",
      "usdt-benefits",
    ],
  },
  {
    id: "trading-guides",
    title: "Trading Guides",
    guides: [
      "how-to-sell-usdt-in-india",
      "how-to-buy-usdt-in-india",
      "usdt-to-inr-guide",
      "best-time-to-sell-usdt",
    ],
  },
  {
    id: "network-guides",
    title: "Network Guides",
    guides: [
      "trc20-vs-erc20",
      "usdt-network-comparison",
      "how-to-choose-usdt-network",
    ],
  },
  {
    id: "platform-guides",
    title: "Platform Guides",
    guides: [
      "how-to-use-angelx",
      "angelx-platform-guide",
      "angelx-rate-system",
      "angelx-security-features",
    ],
  },
];

export const FOOTER_SEO_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About AngelX" },
  { href: "/exchange", label: "USDT Exchange" },
  { href: "/faq", label: "FAQ" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-conditions", label: "Terms" },
];
