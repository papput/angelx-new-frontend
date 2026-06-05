import AboutUs from "@/components/AboutUs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About AngelX Exchange – USDT to INR Digital Asset Platform",
  description:
    "Learn about AngelX Exchange — our mission, vision, and commitment to providing India's most trusted USDT trading platform with transparent USDT to INR conversion.",
  path: "/about-us",
  keywords: [
    "about AngelX",
    "AngelX Exchange",
    "AngelX mission",
    "USDT platform India",
    "digital asset exchange",
  ],
});

export default function Page() {
  return <AboutUs />;
}
