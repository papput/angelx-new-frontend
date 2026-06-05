import PrivacyPolicy from "@/components/PrivacyPolicy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy – AngelX Exchange",
  description:
    "Read the AngelX Exchange privacy policy covering data collection, usage, and protection for users of the AngelX USDT Platform and AngelX App.",
  path: "/privacy-policy",
  keywords: ["AngelX privacy policy", "AngelX data protection"],
});

export default function Page() {
  return <PrivacyPolicy />;
}
