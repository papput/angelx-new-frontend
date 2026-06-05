import Disclaimer from "@/components/Disclaimer";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Disclaimer – AngelX Exchange",
  description:
    "Important disclaimer for users of AngelX Exchange and the AngelX USDT Platform regarding digital asset trading risks and platform usage.",
  path: "/disclaimer",
  keywords: ["AngelX disclaimer", "USDT exchange disclaimer"],
});

export default function Page() {
  return <Disclaimer />;
}
