import Exchange from "@/components/Exchange";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "USDT Exchange – Live AngelX USDT Price | AngelX Exchange",
  description:
    "Check the live AngelX USDT price and exchange USDT to INR on AngelX Exchange. India's dedicated USDT trading platform with transparent rates and fast settlement.",
  path: "/exchange",
  keywords: [
    "USDT exchange",
    "AngelX USDT price",
    "USDT to INR",
    "AngelX Exchange rate",
    "USDT trading platform",
  ],
});

export default function Page() {
  return <Exchange />;
}
