import Link from "next/link";
import { FOOTER_SEO_LINKS } from "@/lib/seo/config";
import "./SeoFooterLinks.css";

export default function SeoFooterLinks() {
  return (
    <nav className="seo-footer-links" aria-label="Site pages">
      <div className="seo-footer-links-inner">
        {FOOTER_SEO_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
