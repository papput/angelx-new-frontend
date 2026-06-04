import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import AppShell from "@/app/AppShell";
import "@/index.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/800.css";

export const metadata = {
  title: "AngelX – Sell USDT to INR Instantly & Securely | Angelx App",
  description:
    "AngelX, the official USDT selling platform. Convert USDT to INR instantly with best price, fast payouts, and secure transactions.",
  metadataBase: new URL("https://angelx.exchange"),
  alternates: {
    canonical: "/",
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
