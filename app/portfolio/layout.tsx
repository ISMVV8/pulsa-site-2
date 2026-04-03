import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations — Portfolio",
  description:
    "Découvrez nos projets : sites vitrines, e-commerces, plateformes et applications web. Chaque projet est une histoire de transformation digitale.",
  openGraph: {
    title: "Nos Réalisations — Pulsa Creatives",
    description:
      "Découvrez nos projets web premium : sites vitrines, e-commerces, plateformes SaaS. Résultats mesurables pour chaque client.",
    url: "https://pulsacreatives.com/portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Pulsa Creatives",
    description: "Découvrez nos projets web premium.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pulsacreatives.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
