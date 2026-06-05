import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { getRelatedGuides } from "@/lib/seo/guides";
import "./GuideArticle.css";

function renderSection(section, i) {
  if (section.h2) {
    return (
      <section key={i} className="guide-section">
        <h2>{section.h2}</h2>
        {section.p && <p>{section.p}</p>}
        {section.ul && (
          <ul>
            {section.ul.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.ol && (
          <ol>
            {section.ol.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
        {section.table && (
          <table className="guide-table">
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    );
  }
  return null;
}

export default function GuideArticle({ guide }) {
  const related = getRelatedGuides(guide.slug);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/blog" },
    { name: guide.siloTitle, url: `/blog#${guide.silo}` },
    { name: guide.title.split("|")[0].trim(), url: `/blog/${guide.slug}` },
  ];

  return (
    <article className="guide-article">
      <JsonLd
        data={[
          articleSchema({
            title: guide.title,
            description: guide.description,
            slug: guide.slug,
            authorName: "AngelX Team",
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <header className="guide-header">
        <span className="guide-silo">{guide.siloTitle}</span>
        <h1>{guide.title.split("|")[0].trim()}</h1>
        <p className="guide-desc">{guide.description}</p>
      </header>
      <div className="guide-body">
        {guide.sections.map(renderSection)}
      </div>
      {related.length > 0 && (
        <aside className="guide-related">
          <h2>Related Guides</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`}>
                  {r.title.split("|")[0].trim()}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <nav className="guide-nav-links">
        <Link href="/">← AngelX Home</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/about-us">About AngelX</Link>
        <Link href="/contact-us">Contact</Link>
        <Link href="/exchange">USDT Exchange</Link>
        <Link href="/blogs">Blog</Link>
      </nav>
    </article>
  );
}
