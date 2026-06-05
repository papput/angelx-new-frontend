import { SITE_URL } from "@/lib/seo/config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/sell-usdt",
          "/deposit-usdt",
          "/withdraw-usdt",
          "/withdraw-history",
          "/deposit/list",
          "/exchange/list",
          "/transaction-details",
          "/add-bank-account",
          "/bank-card/list",
          "/withdraw/",
          "/recharge/",
          "/setting",
          "/invite",
          "/referrel",
          "/reset-transaction-password",
          "/login",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
