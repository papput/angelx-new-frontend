import TermsConditions from "@/components/TermsConditions";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms & Conditions – AngelX Exchange",
  description:
    "Review the terms and conditions for using AngelX Exchange, the AngelX App, and the AngelX USDT trading platform.",
  path: "/terms-conditions",
  keywords: ["AngelX terms", "AngelX conditions", "USDT exchange terms"],
});

export default function Page() {
  return <TermsConditions />;
}
