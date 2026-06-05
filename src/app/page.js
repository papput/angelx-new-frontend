import Home from "@/components/Home";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "AngelX Exchange – Sell USDT to INR Instantly | AngelX App",
  description:
    "AngelX Exchange is India's trusted USDT trading platform. Convert USDT to INR with live AngelX USDT prices, fast bank settlement, and the official AngelX App.",
  path: "/",
  keywords: [
    "AngelX",
    "AngelX Exchange",
    "sell USDT",
    "USDT to INR",
    "AngelX USDT price",
    "AngelX App",
    "USDT trading platform",
    "digital asset exchange",
  ],
});

export default function Page() {
  return <Home />;
}
