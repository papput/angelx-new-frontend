import RefundPolicy from "@/components/RefundPolicy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Refund Policy – AngelX Exchange",
  description:
    "Review the refund policy for AngelX Exchange outlining how refunds are handled for USDT exchange transactions and services on the AngelX Platform.",
  path: "/refund-policy",
  keywords: ["AngelX refund policy", "USDT refund", "AngelX Exchange refund"],
});

export default function Page() {
  return <RefundPolicy />;
}
