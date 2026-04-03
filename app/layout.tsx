import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import MaintenanceGate from "./components/maintenance-gate";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://pulsacreatives.com"),
  title: {
    default: "Pulsa Creatives — Agence Digitale Premium à Bruxelles",
    template: "%s | Pulsa Creatives",
  },
  description:
    "Agence digitale premium à Bruxelles. Sites web, landing pages, e-commerce, SEO et publicité en ligne. Design Apple-inspired, résultats mesurables.",
  keywords: [
    "agence digitale",
    "agence web bruxelles",
    "création site web",
    "landing page",
    "e-commerce",
    "SEO",
    "design premium",
    "Pulsa Creatives",
  ],
  authors: [{ name: "Pulsa Creatives", url: "https://pulsacreatives.com" }],
  creator: "Pulsa Creatives",
  publisher: "Pulsa Creatives",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://pulsacreatives.com",
    siteName: "Pulsa Creatives",
    title: "Pulsa Creatives — Agence Digitale Premium à Bruxelles",
    description:
      "Agence digitale premium à Bruxelles. Sites web, landing pages, e-commerce, SEO et Ads. Design inspiré, résultats mesurables.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pulsa Creatives — Agence Digitale Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulsa Creatives — Agence Digitale Premium",
    description:
      "Agence digitale premium à Bruxelles. Sites web, landing pages, e-commerce, SEO.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pulsacreatives.com",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <MaintenanceGate>
          <div id="main-content">
            {children}
          </div>
        </MaintenanceGate>
        <Script
          src="https://taap.it/scripts/tracker.js"
          data-project="pk_2a09838aada7a56cb6b6d66e3e4f91a5"
          data-track-outbound="true"
          data-track-forms="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
