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
    slug: "city-smile",
    name: "City Smile",
    type: "Site vitrine",
    year: "2025",
    description: "Cabinet dentaire haut de gamme",
    longDescription:
      "Refonte complète du site vitrine pour un cabinet dentaire premium à Bruxelles. Design épuré, prise de rendez-vous en ligne, et optimisation SEO locale pour maximiser la visibilité.",
    image: "/projects/city-smile.webp",
    color: "#4A90D9",
    tags: ["Next.js", "SEO", "Design UI/UX", "Responsive"],
    services: ["Site vitrine", "SEO", "Design UI/UX"],
    secteur: "Dentaire",
    duree: "3 semaines",
    brief:
      "City Smile souhaitait moderniser sa présence en ligne avec un site reflétant le standing de leur cabinet. L'objectif principal : faciliter la prise de rendez-vous et apparaître en première page Google sur les requêtes locales.",
    defi:
      "Le cabinet faisait face à une visibilité quasi nulle sur les moteurs de recherche et un site vieillissant qui ne convertissait pas les visiteurs en patients. Il fallait concevoir une expérience digitale à la hauteur de leur expertise médicale.",
    approche: [
      {
        title: "Audit & Stratégie SEO",
        description:
          "Analyse complète du positionnement existant, étude des mots-clés locaux et définition d'une stratégie de contenu optimisée pour le référencement dentaire à Bruxelles.",
      },
      {
        title: "Design & Développement",
        description:
          "Création d'un design épuré et professionnel avec un système de prise de rendez-vous intégré. Développement en Next.js pour des performances optimales.",
      },
      {
        title: "Optimisation & Lancement",
        description:
          "Optimisation technique (Core Web Vitals, structured data, sitemap), configuration Google Business Profile et mise en ligne progressive.",
      },
    ],
    resultats: [
      { value: "+180%", label: "Trafic organique" },
      { value: "3x", label: "Rendez-vous en ligne" },
      { value: "<1.5s", label: "Temps de chargement" },
      { value: "Page 1", label: "Google local" },
    ],
    nextSlug: "success-talent",
  },
  {
    slug: "success-talent",
    name: "Success Talent",
    type: "Plateforme RH",
    year: "2025",
    description: "Mise en relation talents & entreprises",
    longDescription:
      "Plateforme de recrutement connectant les meilleurs talents aux entreprises. Dashboard candidat, système de matching intelligent, et interface administration complète.",
    image: "/projects/success-talent.webp",
    color: "#6C5CE7",
    tags: ["React", "Node.js", "Base de données", "Dashboard"],
    services: ["Plateforme web", "Dashboard", "Base de données"],
    secteur: "Ressources Humaines",
    duree: "6 semaines",
    brief:
      "Success Talent avait besoin d'une plateforme digitale pour connecter efficacement les talents aux entreprises. L'objectif : automatiser le processus de matching et offrir un dashboard intuitif aux recruteurs comme aux candidats.",
    defi:
      "Le matching manuel entre candidats et offres prenait un temps considérable et manquait de précision. Il fallait créer un algorithme intelligent tout en gardant une interface simple et agréable pour tous les utilisateurs.",
    approche: [
      {
        title: "Architecture & Base de données",
        description:
          "Conception d'une architecture scalable avec une base de données relationnelle optimisée pour les requêtes de matching multi-critères.",
      },
      {
        title: "Algorithme de matching",
        description:
          "Développement d'un système de scoring intelligent croisant compétences, expérience, localisation et préférences pour proposer les meilleurs profils.",
      },
      {
        title: "Dashboards & Interface",
        description:
          "Création de tableaux de bord distincts pour candidats, recruteurs et administrateurs avec des métriques clés et des actions rapides.",
      },
    ],
    resultats: [
      { value: "+2000", label: "Inscrits actifs" },
      { value: "85%", label: "Satisfaction utilisateurs" },
      { value: "45%", label: "Taux de matching" },
      { value: "Dashboard", label: "Temps réel" },
    ],
    nextSlug: "terra-sky",
  },
  {
    slug: "terra-sky",
    name: "Terra Sky",
    type: "Immobilier",
    year: "2024",
    description: "Agence immobilière premium",
    longDescription:
      "Site immobilier haut de gamme avec recherche avancée de biens, visites virtuelles 360°, estimation en ligne et espace propriétaire dédié.",
    image: "/projects/terra-sky.webp",
    color: "#2D3436",
    tags: ["Next.js", "API Maps", "Filtres avancés", "CMS"],
    services: ["Site vitrine", "SEO", "Immobilier"],
    secteur: "Immobilier",
    duree: "4 semaines",
    brief:
      "Terra Sky cherchait à se différencier sur un marché immobilier saturé grâce à une présence digitale premium. L'objectif : générer des leads qualifiés et proposer des visites virtuelles pour réduire les déplacements inutiles.",
    defi:
      "Le marché immobilier en ligne est ultra-compétitif. Il fallait créer une expérience utilisateur qui se démarque tout en intégrant des fonctionnalités avancées de recherche et de visite virtuelle sans compromettre les performances.",
    approche: [
      {
        title: "UX Research & Design",
        description:
          "Étude des parcours utilisateurs dans l'immobilier, conception d'un système de filtres intuitif et intégration de visites virtuelles 360° immersives.",
      },
      {
        title: "Développement & Intégrations",
        description:
          "Développement Next.js avec intégration API Google Maps, système de favoris, alertes email personnalisées et espace propriétaire sécurisé.",
      },
      {
        title: "SEO & Acquisition",
        description:
          "Stratégie SEO locale ciblant les requêtes immobilières par quartier, optimisation des fiches Google Business et mise en place de landing pages ciblées.",
      },
    ],
    resultats: [
      { value: "+120%", label: "Leads qualifiés" },
      { value: "60%", label: "Visites en ligne" },
      { value: "<2s", label: "Temps de chargement" },
      { value: "Top 3", label: "SEO local" },
    ],
    nextSlug: "sweety-delice",
  },
  {
    slug: "sweety-delice",
    name: "Sweety Délice",
    type: "E-commerce",
    year: "2024",
    description: "Pâtisserie artisanale en ligne",
    longDescription:
      "Boutique en ligne pour une pâtisserie artisanale. Catalogue produits avec photos HD, commandes personnalisées, click & collect et livraison à domicile.",
    image: "/projects/sweety-delice.webp",
    color: "#E17055",
    tags: ["Shopify", "E-commerce", "Paiement", "Design"],
    services: ["E-commerce", "Paiement en ligne", "Design"],
    secteur: "Pâtisserie",
    duree: "4 semaines",
    brief:
      "Sweety Délice souhaitait digitaliser ses ventes avec une boutique en ligne reflétant l'élégance de ses créations artisanales. L'objectif : proposer la commande en ligne avec click & collect et livraison à domicile.",
    defi:
      "Vendre de la pâtisserie en ligne pose des défis uniques : gestion des créneaux de retrait, personnalisation des commandes, et surtout rendre justice visuellement à des produits artisanaux haut de gamme.",
    approche: [
      {
        title: "Direction artistique",
        description:
          "Shooting photo professionnel, création d'une identité visuelle gourmande et élégante, et conception d'un parcours d'achat fluide centré sur le visuel.",
      },
      {
        title: "E-commerce & Paiement",
        description:
          "Mise en place de la boutique avec gestion des stocks, options de personnalisation, système click & collect avec créneaux horaires et paiement sécurisé.",
      },
      {
        title: "Lancement & Marketing",
        description:
          "Stratégie de lancement avec campagne sur les réseaux sociaux, programme de fidélité et intégration d'avis clients pour booster la confiance.",
      },
    ],
    resultats: [
      { value: "+300%", label: "Ventes en ligne" },
      { value: "40%", label: "Click & collect" },
      { value: "+25%", label: "Panier moyen" },
      { value: "4.8/5", label: "Avis clients" },
    ],
    nextSlug: "8lab-ecosystem",
  },
  {
    slug: "8lab-ecosystem",
    name: "8lab Ecosystem",
    type: "Plateforme",
    year: "2025",
    description: "Écosystème e-commerce & formation",
    longDescription:
      "Écosystème complet pour entrepreneurs e-commerce : formation, coaching, networking, sourcing et outils. +2 400 membres actifs sur la plateforme.",
    image: "/projects/8lab.webp",
    color: "#0A0A0A",
    tags: ["Next.js", "Supabase", "Stripe", "Dashboard"],
    services: ["Plateforme SaaS", "Stripe", "Dashboard"],
    secteur: "E-commerce / Formation",
    duree: "8 semaines",
    brief:
      "8lab avait la vision d'un écosystème complet pour entrepreneurs e-commerce : formations, coaching, networking et outils. L'objectif : centraliser toute la valeur sur une seule plateforme scalable.",
    defi:
      "Construire une plateforme regroupant formation vidéo, coaching en direct, forum communautaire, marketplace de services et outils de sourcing — tout en assurant une expérience fluide et une infrastructure capable de scaler.",
    approche: [
      {
        title: "Architecture scalable",
        description:
          "Conception d'une architecture micro-services avec Supabase, système d'authentification robuste et infrastructure CDN pour le streaming vidéo.",
      },
      {
        title: "Monétisation & Stripe",
        description:
          "Intégration Stripe avec abonnements récurrents, périodes d'essai, upsells automatiques et tableau de bord financier en temps réel.",
      },
      {
        title: "Communauté & Rétention",
        description:
          "Développement du forum communautaire, système de gamification, notifications intelligentes et programme d'ambassadeurs pour maximiser la rétention.",
      },
    ],
    resultats: [
      { value: "+2400", label: "Membres actifs" },
      { value: "95%", label: "Taux de rétention" },
      { value: "500K€+", label: "Revenus générés" },
      { value: "Scalable", label: "Infrastructure" },
    ],
    nextSlug: "podium",
  },
  {
    slug: "podium",
    name: "Podium",
    type: "E-commerce",
    year: "2025",
    description: "Thème Shopify sur-mesure",
    longDescription:
      "Thème Shopify premium entièrement custom avec des performances optimisées, animations fluides, et un design conversion-oriented pour maximiser les ventes.",
    image: "/projects/podium.webp",
    color: "#636E72",
    tags: ["Shopify", "Liquid", "Performance", "Conversion"],
    services: ["E-commerce", "Shopify", "Performance"],
    secteur: "Shopify / E-commerce",
    duree: "5 semaines",
    brief:
      "Podium avait besoin d'un thème Shopify entièrement sur-mesure, conçu pour la conversion. L'objectif : dépasser les limites des thèmes standards avec des performances de pointe et un design premium.",
    defi:
      "Les thèmes Shopify standards limitent les possibilités de personnalisation et de performance. Il fallait développer un thème from scratch en Liquid qui soit rapide, accessible, et optimisé pour la conversion sur tous les navigateurs.",
    approche: [
      {
        title: "Audit & Benchmark",
        description:
          "Analyse des thèmes concurrents, benchmark des performances et définition d'objectifs PageSpeed stricts. Étude des parcours de conversion e-commerce les plus performants.",
      },
      {
        title: "Développement Liquid",
        description:
          "Développement du thème en Liquid pur avec lazy loading natif, CSS critique inline, JavaScript minimal et sections dynamiques Shopify 2.0.",
      },
      {
        title: "Tests & Optimisation",
        description:
          "Tests cross-browser exhaustifs, optimisation des Core Web Vitals, A/B testing des pages produits et documentation complète pour le client.",
      },
    ],
    resultats: [
      { value: "+200%", label: "Taux de conversion" },
      { value: "<1.8s", label: "Temps de chargement" },
      { value: "98/100", label: "PageSpeed Score" },
      { value: "Cross", label: "Browser compatible" },
    ],
    nextSlug: "city-smile",
  },
];
