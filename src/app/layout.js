import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import AppShell from "@/app/AppShell";
import JsonLd from "@/components/seo/JsonLd";
import { globalSchemas } from "@/lib/seo/schemas";
import { SITE_LOCALE, SITE_URL, getCanonicalUrl } from "@/lib/seo/config";
import "@/index.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/800.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AngelX Exchange – USDT to INR Digital Asset Platform",
    template: "%s | AngelX Exchange",
  },
  description:
    "AngelX Exchange is India's trusted USDT trading platform. Convert USDT to INR with live AngelX USDT prices, fast settlement, and the AngelX App.",
  keywords: [
    "AngelX",
    "AngelX Exchange",
    "USDT to INR",
    "sell USDT",
    "AngelX App",
    "USDT trading platform",
    "digital asset exchange",
  ],
  robots: "index, follow, max-snippet:-1, max-image-preview:large",
  alternates: {
    canonical: getCanonicalUrl("/"),
    languages: { [SITE_LOCALE]: getCanonicalUrl("/") },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AngelX Exchange",
    url: getCanonicalUrl("/"),
    title: "AngelX Exchange – USDT to INR Digital Asset Platform",
    description:
      "India's trusted USDT trading platform. Live AngelX USDT prices, fast INR settlement, AngelX App.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AngelX Exchange – USDT to INR",
    description: "Sell USDT to INR on AngelX — India's USDT trading platform.",
  },
  icons: {
    icon: "/logo_plus.png",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={globalSchemas()} />
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ5VLMP84X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZ5VLMP84X');
          `}
        </Script>
      </body>
    </html>
  );
}
