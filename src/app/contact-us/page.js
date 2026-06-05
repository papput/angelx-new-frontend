import ContactUs from "@/components/ContactUs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Contact AngelX Exchange – USDT Support & Help",
  description:
    "Contact AngelX Exchange support for help with USDT deposits, USDT to INR exchange, bank settlement, and account queries on the AngelX Platform.",
  path: "/contact-us",
  keywords: [
    "contact AngelX",
    "AngelX support",
    "USDT help",
    "AngelX Exchange contact",
  ],
});

export default function Page() {
  return <ContactUs />;
}
