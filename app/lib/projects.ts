export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  type: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  tags: string[];
  services: string[];
  secteur: string;
  duree: string;
  brief: string;
  defi: string;
  approche: { title: string; description: string }[];
  resultats: ProjectStat[];
  nextSlug: string;
}

export const projects: Project[] = [
  {
    slug: "sweety-delice",
    name: "Sweety Délice",
    type: "E-commerce",
    year: "2024",
    description: "Des tiramisus qui se vendent tout seuls",
    longDescription:
      "Sweety Délice, c'est du tiramisu artisanal dans des emballages à tomber. On leur a créé une boutique en ligne où chaque produit donne envie de commander sur-le-champ.",
    image: "/projects/sweety-delice.webp",
    color: "#E17055",
    tags: ["Shopify", "E-commerce", "Branding", "Design"],
    services: ["E-commerce", "Branding", "Design"],
    secteur: "Food & Pâtisserie",
    duree: "4 semaines",
    brief:
      "Sweety Délice cartonnait déjà en local avec ses tiramisus artisanaux. Le produit était là, le packaging aussi — mais pas de boutique en ligne. Leur clientèle grandissait, les demandes de livraison se multipliaient, et tout se faisait encore par message. Il fallait structurer tout ça avec une vraie présence e-commerce, à la hauteur de leurs produits.",
    defi:
      "Le tiramisu, ça ne se vend pas comme un t-shirt. Il fallait retranscrire le côté artisanal et gourmand dans une expérience digitale. Donner envie rien qu'en scrollant. Et derrière, mettre en place un système de commande simple et efficace — click & collect, livraison, créneaux — sans que ça devienne une usine à gaz pour l'équipe.",
    approche: [
      {
        title: "L'univers visuel",
        description:
          "On a construit une identité e-commerce qui respire la gourmandise. Chaque photo, chaque couleur, chaque détail du site est pensé pour déclencher l'envie. Le packaging Sweety Délice est tellement beau qu'on l'a mis au centre de tout.",
      },
      {
        title: "La boutique",
        description:
          "Mise en place Shopify avec un parcours d'achat ultra-fluide. Choix des parfums, personnalisation, click & collect avec créneaux horaires, livraison, paiement sécurisé. Simple pour le client, simple pour l'équipe.",
      },
      {
        title: "Le lancement",
        description:
          "Stratégie de lancement sur les réseaux sociaux en parallèle de la mise en ligne. Les premiers jours, les commandes ont afflué. Le bouche-à-oreille a fait le reste.",
      },
    ],
    resultats: [
      { value: "+300%", label: "Ventes en ligne" },
      { value: "40%", label: "Click & collect" },
      { value: "+25%", label: "Panier moyen" },
      { value: "4.8/5", label: "Avis clients" },
    ],
    nextSlug: "terra-sky",
  },
  {
    slug: "terra-sky",
    name: "Terra Sky",
    type: "Site premium",
    year: "2024",
    description: "L'immobilier de luxe à Dubai",
    longDescription:
      "Terra Sky, c'est l'immobilier haut de gamme à Dubai. On leur a refait un site à la hauteur de leurs biens — élégant, rapide, et qui inspire confiance dès la première seconde.",
    image: "/projects/terra-sky.webp",
    color: "#2D3436",
    tags: ["Next.js", "Design premium", "SEO", "Performance"],
    services: ["Refonte site web", "Design", "SEO"],
    secteur: "Immobilier de luxe",
    duree: "4 semaines",
    brief:
      "Terra Sky opère sur le marché immobilier premium de Dubai. Des biens d'exception, une clientèle exigeante — mais un site qui ne suivait plus. L'image en ligne ne reflétait pas la qualité de leur service. Il fallait une refonte complète : un site aussi premium que les propriétés qu'ils vendent.",
    defi:
      "Dans l'immobilier de luxe à Dubai, la concurrence en ligne est féroce. Un site moyen, c'est un client perdu. Il fallait créer une expérience qui transpire le haut de gamme dès le premier scroll — tout en restant rapide, fluide, et irréprochable sur mobile. Pas de compromis.",
    approche: [
      {
        title: "Le design",
        description:
          "On a repensé chaque page avec une direction artistique premium. Grandes images, espaces généreux, typographie soignée. Le site devait donner la même sensation qu'une visite dans l'un de leurs biens : du standing, de l'espace, du calme.",
      },
      {
        title: "Le développement",
        description:
          "Développement Next.js pour des performances optimales. Chaque page charge en moins de 2 secondes. Navigation fluide, responsive impeccable, et une structure pensée pour évoluer avec leur catalogue.",
      },
      {
        title: "La visibilité",
        description:
          "Optimisation SEO complète pour positionner Terra Sky sur les requêtes immobilières clés à Dubai. Structure technique propre, contenu optimisé, et des fondations solides pour leur acquisition future.",
      },
    ],
    resultats: [
      { value: "+120%", label: "Leads qualifiés" },
      { value: "x3", label: "Temps sur le site" },
      { value: "<2s", label: "Temps de chargement" },
      { value: "Top 3", label: "SEO local" },
    ],
    nextSlug: "podium",
  },
  {
    slug: "podium",
    name: "Podium",
    type: "E-commerce",
    year: "2025",
    description: "Le magasin iconique passe au digital",
    longDescription:
      "Podium, c'est une institution sur la Chaussée de Gand. On les accompagne dans leur passage au e-commerce — pour que leur énergie en boutique se retrouve aussi en ligne.",
    image: "/projects/podium.webp",
    color: "#636E72",
    tags: ["Shopify", "E-commerce", "Transition digitale", "Design"],
    services: ["E-commerce", "Shopify", "Transition digitale"],
    secteur: "Retail / Mode",
    duree: "5 semaines",
    brief:
      "Podium, tout le monde connaît. C'est le magasin de référence sur la Chaussée de Gand — des sneakers, du style, une vraie communauté. Mais tout se passait en boutique. Pas de site, pas de vente en ligne. Avec la demande qui explose, il était temps de lancer le e-commerce sans perdre l'ADN de la marque.",
    defi:
      "Podium a une identité forte en physique. Le défi, c'était de traduire cette énergie de boutique dans un site e-commerce. Garder l'âme du magasin, le côté authentique, tout en construisant une machine de vente en ligne performante. Et surtout : que l'équipe puisse gérer ça facilement au quotidien.",
    approche: [
      {
        title: "L'identité digitale",
        description:
          "On a capturé l'énergie de Podium — leur univers, leur clientèle, leur vibe — et on l'a traduit dans un design e-commerce qui leur ressemble. Pas un thème générique, mais quelque chose de taillé pour eux.",
      },
      {
        title: "La boutique Shopify",
        description:
          "Développement d'une boutique Shopify sur-mesure. Catalogue structuré, fiches produits pensées pour la conversion, paiement fluide, gestion des stocks connectée à la boutique physique.",
      },
      {
        title: "L'accompagnement",
        description:
          "On ne livre pas juste un site et on disparaît. Formation de l'équipe, documentation claire, et un suivi pour s'assurer que la transition se passe en douceur. Podium est autonome sur son e-commerce.",
      },
    ],
    resultats: [
      { value: "+200%", label: "Taux de conversion" },
      { value: "<1.8s", label: "Temps de chargement" },
      { value: "98/100", label: "PageSpeed Score" },
      { value: "100%", label: "Équipe formée" },
    ],
    nextSlug: "success-talent",
  },
  {
    slug: "success-talent",
    name: "Success Talent",
    type: "Site vitrine",
    year: "2025",
    description: "Recruter les bons profils, plus vite",
    longDescription:
      "Success Talent avait besoin d'attirer les meilleurs candidats. On leur a construit un site qui donne envie de postuler — clair, pro, et qui reflète la culture de leur entreprise.",
    image: "/projects/success-talent.webp",
    color: "#6C5CE7",
    tags: ["Next.js", "Design", "Recrutement", "SEO"],
    services: ["Site vitrine", "Design", "SEO"],
    secteur: "Recrutement",
    duree: "3 semaines",
    brief:
      "Success Talent cherchait à étoffer son équipe. Le problème : pas de présence en ligne digne de ce nom. Les candidats n'avaient nulle part où découvrir l'entreprise, sa culture, ses valeurs. Résultat : des candidatures qui n'arrivaient pas, ou pas les bonnes. Il fallait un site qui donne envie aux bons profils de postuler.",
    defi:
      "Recruter en 2025, ça passe d'abord par le digital. Un candidat qui ne trouve rien en ligne, c'est un candidat qui passe son chemin. Il fallait créer une vitrine qui raconte qui est Success Talent, ce qu'ils proposent, et pourquoi c'est l'endroit où tu veux bosser. Le tout en un temps record.",
    approche: [
      {
        title: "Le positionnement",
        description:
          "On a travaillé avec Success Talent pour définir leur message clé. Qu'est-ce qui les rend uniques ? Pourquoi rejoindre leur équipe ? On a traduit ça en un storytelling clair et authentique sur chaque page du site.",
      },
      {
        title: "Le site",
        description:
          "Développement Next.js avec un design moderne et professionnel. Pages métiers, présentation de l'équipe, culture d'entreprise, formulaire de candidature simplifié. Chaque élément pousse à l'action.",
      },
      {
        title: "Le référencement",
        description:
          "SEO optimisé sur les requêtes de recrutement ciblées. Quand quelqu'un cherche à rejoindre une boîte dans leur secteur, Success Talent apparaît. C'est aussi simple que ça.",
      },
    ],
    resultats: [
      { value: "x4", label: "Candidatures reçues" },
      { value: "85%", label: "Profils qualifiés" },
      { value: "3 sem", label: "Livraison" },
      { value: "+60%", label: "Trafic organique" },
    ],
    nextSlug: "sweety-delice",
  },
];
