import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Page Not Found – AngelX Exchange",
  description:
    "The page you are looking for does not exist. Return to AngelX Exchange — India's trusted USDT to INR digital asset platform.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div style={{ padding: "48px 24px", textAlign: "center", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 12 }}>Page Not Found</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        This page does not exist on AngelX Exchange.
      </p>
      <nav style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/exchange">Exchange</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/blogs">Blog</Link>
        <Link href="/contact-us">Contact</Link>
      </nav>
    </div>
  );
}
