import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { GUIDE_SILOS } from "@/lib/seo/config";
import { getGuidesBySilo } from "@/lib/seo/guides";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import "./blog-guides.css";

export const metadata = buildPageMetadata({
  title: "USDT Guides & Resources – AngelX Exchange",
  description:
    "Expert guides on USDT, USDT to INR exchange, network selection, and using the AngelX Platform. Learn from AngelX Exchange — India's USDT trading platform.",
  path: "/blog",
  keywords: [
    "USDT guides",
    "USDT to INR guide",
    "AngelX guides",
    "USDT trading guide",
    "digital asset guides",
  ],
});

export default function GuidesIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/blog" },
  ];

  return (
    <div className="guides-index">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <header className="guides-index-header">
        <h1>AngelX USDT Guides &amp; Resources</h1>
        <p>
          In-depth guides on USDT, USDT to INR exchange, network selection, and
          the AngelX digital asset platform — organized by topic.
        </p>
      </header>
      {GUIDE_SILOS.map((silo) => {
        const guides = getGuidesBySilo(silo.id);
        return (
          <section key={silo.id} id={silo.id} className="guides-silo">
            <h2>{silo.title}</h2>
            <ul>
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/blog/${g.slug}`}>
                    {g.title.split("|")[0].trim()}
                  </Link>
                  <p>{g.description}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <nav className="guides-index-nav">
        <Link href="/">← Home</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/blogs">Blog</Link>
        <Link href="/exchange">Exchange</Link>
        <Link href="/about-us">About</Link>
      </nav>
    </div>
  );
}
