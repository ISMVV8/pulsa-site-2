import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import MaintenanceGate from "./components/maintenance-gate";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulsa Creatives — Agence Digitale",
  description:
    "Agence digitale premium. Sites web, landing pages, e-commerce, SEO et Ads.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <MaintenanceGate>
          {children}
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
