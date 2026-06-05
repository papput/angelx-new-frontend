import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { FAQ_ITEMS } from "@/lib/seo/faqs";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import "./faq.css";

export const metadata = buildPageMetadata({
  title: "FAQ – AngelX Exchange | USDT to INR Questions Answered",
  description:
    "Find answers to 30+ frequently asked questions about AngelX Exchange, USDT to INR conversion, AngelX USDT prices, supported networks, settlement times, and platform security.",
  path: "/faq",
  keywords: [
    "AngelX FAQ",
    "USDT to INR FAQ",
    "AngelX help",
    "AngelX USDT price",
    "AngelX Exchange questions",
  ],
});

export default function FaqPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ];

  return (
    <div className="faq-page">
      <JsonLd
        data={[faqPageSchema(FAQ_ITEMS), breadcrumbSchema(breadcrumbs)]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <header className="faq-page-header">
        <h1>AngelX Exchange — Frequently Asked Questions</h1>
        <p>
          Everything you need to know about the AngelX USDT Platform, USDT to
          INR exchange, AngelX App, settlement, rates, and security.
        </p>
      </header>
      <div className="faq-page-list">
        {FAQ_ITEMS.map((faq, i) => (
          <details key={faq.q} className="faq-page-item" open={i < 3}>
            <summary>
              <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
              {faq.q}
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
      <nav className="faq-page-nav">
        <Link href="/">← Home</Link>
        <Link href="/about-us">About AngelX</Link>
        <Link href="/exchange">USDT Exchange</Link>
        <Link href="/blog">Guides</Link>
        <Link href="/contact-us">Contact Support</Link>
      </nav>
    </div>
  );
}
