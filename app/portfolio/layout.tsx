import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations — Pulsa Creatives",
  description:
    "Découvrez nos projets : sites vitrines, e-commerces, plateformes et applications web. Chaque projet est une histoire de transformation digitale.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
