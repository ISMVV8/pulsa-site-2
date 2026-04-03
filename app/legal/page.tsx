import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales & Politique de Confidentialité",
  description:
    "Mentions légales, conditions générales et politique de confidentialité de Pulsa Creatives — Agence digitale à Bruxelles.",
  alternates: {
    canonical: "https://pulsacreatives.com/legal",
  },
};

export default function LegalPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-12 py-5">
        <Link href="/" className="text-[13px] font-medium hover:opacity-60 transition-opacity">
          ← Retour
        </Link>
      </header>

      <main className="px-6 sm:px-12 lg:px-20 py-12 max-w-[800px] mx-auto">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-12">
          Mentions légales<span className="text-black/15">.</span>
        </h1>

        {/* ═══ ÉDITEUR ═══ */}
        <Section title="1. Éditeur du site">
          <p>
            <strong>Pulsa Creatives</strong>
            <br />
            Forme juridique : Entreprise individuelle
            <br />
            Siège social : Bruxelles, Belgique
            <br />
            Email :{" "}
            <a href="mailto:contact@pulsacreatives.com" className="underline hover:text-black/60">
              contact@pulsacreatives.com
            </a>
            <br />
            WhatsApp :{" "}
            <a href="https://wa.me/32473236759" className="underline hover:text-black/60">
              +32 473 23 67 59
            </a>
          </p>
        </Section>

        {/* ═══ HÉBERGEMENT ═══ */}
        <Section title="2. Hébergement">
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            <br />
            Site :{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/60">
              vercel.com
            </a>
          </p>
        </Section>

        {/* ═══ PROPRIÉTÉ INTELLECTUELLE ═══ */}
        <Section title="3. Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, code source) est la propriété exclusive de Pulsa Creatives, sauf mention contraire.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de Pulsa Creatives.
          </p>
        </Section>

        {/* ═══ DONNÉES PERSONNELLES ═══ */}
        <Section title="4. Politique de confidentialité & RGPD">
          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.1 — Responsable du traitement</h3>
          <p>
            Pulsa Creatives est responsable du traitement des données personnelles collectées sur ce site, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).
          </p>

          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.2 — Données collectées</h3>
          <p>Nous pouvons collecter les données suivantes :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Données de navigation anonymes (via Taap.it) : pages visitées, durée, appareil, provenance</li>
            <li>Données transmises volontairement : nom, email, message (via formulaire de contact ou WhatsApp)</li>
          </ul>

          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.3 — Finalités du traitement</h3>
          <p>Les données sont collectées pour :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Améliorer l&apos;expérience utilisateur et les performances du site</li>
            <li>Répondre aux demandes de contact</li>
            <li>Établir des devis et propositions commerciales</li>
          </ul>

          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.4 — Base légale</h3>
          <p>
            Le traitement est fondé sur votre consentement (article 6.1.a du RGPD) et/ou l&apos;exécution de mesures précontractuelles (article 6.1.b).
          </p>

          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.5 — Durée de conservation</h3>
          <p>
            Les données de navigation sont conservées pendant 26 mois maximum. Les données de contact sont conservées pendant 3 ans après le dernier échange.
          </p>

          <h3 className="text-[16px] font-semibold mt-6 mb-2">4.6 — Vos droits</h3>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Droit d&apos;accès</strong> — obtenir la confirmation que vos données sont traitées</li>
            <li><strong>Droit de rectification</strong> — corriger vos données inexactes</li>
            <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
            <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation</strong> — limiter le traitement de vos données</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:contact@pulsacreatives.com" className="underline hover:text-black/60">
              contact@pulsacreatives.com
            </a>.
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de l&apos;
            <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/60">
              Autorité de protection des données (APD)
            </a>{" "}
            belge.
          </p>
        </Section>

        {/* ═══ COOKIES ═══ */}
        <Section title="5. Cookies & Analytics">
          <p>
            Ce site utilise <strong>Taap.it</strong> comme outil d&apos;analyse, qui collecte des données de navigation anonymes pour améliorer le site. Taap.it est un outil respectueux de la vie privée qui ne nécessite pas de bandeau cookie conformément aux recommandations de la CNIL et de l&apos;APD belge.
          </p>
          <p>
            Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé sur ce site.
          </p>
        </Section>

        {/* ═══ LIENS EXTERNES ═══ */}
        <Section title="6. Liens externes">
          <p>
            Ce site peut contenir des liens vers des sites tiers (WhatsApp, Instagram, TikTok, Google Calendar). Pulsa Creatives ne peut être tenu responsable du contenu de ces sites externes ni de leurs pratiques en matière de protection des données.
          </p>
        </Section>

        {/* ═══ LIMITATION DE RESPONSABILITÉ ═══ */}
        <Section title="7. Limitation de responsabilité">
          <p>
            Pulsa Creatives s&apos;efforce de fournir des informations exactes et à jour. Toutefois, nous ne pouvons garantir l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées sur ce site.
          </p>
          <p>
            Les études de cas et résultats présentés dans le portfolio reflètent des projets réels mais les performances peuvent varier selon les circonstances de chaque projet.
          </p>
        </Section>

        {/* ═══ LOI APPLICABLE ═══ */}
        <Section title="8. Droit applicable">
          <p>
            Les présentes mentions légales sont régies par le droit belge. En cas de litige, les tribunaux de l&apos;arrondissement judiciaire de Bruxelles seront seuls compétents.
          </p>
        </Section>

        {/* ═══ MISE À JOUR ═══ */}
        <Section title="9. Mise à jour">
          <p>
            Les présentes mentions légales peuvent être modifiées à tout moment. La date de dernière mise à jour est indiquée ci-dessous.
          </p>
          <p className="mt-4 text-black/60 text-[13px]">
            Dernière mise à jour : 3 avril 2026
          </p>
        </Section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-2 py-8 px-5 border-t border-black/5">
        <p className="text-[11px] text-black/60 tracking-wide text-center">
          © Pulsa Creatives · Bruxelles, Belgique
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[20px] font-semibold tracking-[-0.01em] mb-4">
        {title}
      </h2>
      <div className="text-[14px] text-black/55 leading-[1.8] space-y-3">
        {children}
      </div>
    </section>
  );
}
