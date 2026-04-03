# 🔍 Audit Complet — Pulsa Creatives
> Date : 3 avril 2026 | Audité par : Djibril (Builder Agent)

---

## Phase 1 — Fondations Techniques

### 1.1 — Architecture & Structure — Score : 6/10

#### Problèmes critiques 🔴
- **[app/components/project-modal.tsx]** Fichier orphelin — 0 imports dans tout le projet → Supprimer
- **[app/components/smooth-scroll.tsx]** Fichier orphelin — importé nulle part, composant Lenis inutilisé → Supprimer
- **[package.json]** Double dépendance Lenis : `lenis` ET `@studio-freight/lenis` (ancienne version) → Supprimer `@studio-freight/lenis`

#### Problèmes importants 🟠
- **[app/portfolio/portfolio.css]** CSS mort — `.font-serif` et animations modal ne sont plus utilisés (tout est en font-sans + GSAP) → Supprimer le fichier
- **[public/]** 6 fichiers SVG orphelins du boilerplate Next.js : `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` + `bg-japan.jpg` inutilisé → Supprimer
- **[app/components/maintenance-gate.tsx:4]** Mot de passe en dur dans le code front (`pulsacreatives2026`) → Acceptable pour un gate temporaire, mais à remplacer par une env var pour la prod

#### Améliorations 🟡
- Pas de dossier `utils/` ou `hooks/` — tout est dans `components/` → OK pour la taille actuelle
- Pas de fichier `types.ts` global — les types sont dans `projects.ts` → OK mais anticiper un split

#### Points positifs ✅
- Structure Next.js App Router propre (app/, components/, lib/)
- Naming cohérent (kebab-case fichiers, PascalCase composants)
- Pas de `console.log` en production
- `.gitignore` correct

---

### 1.2 — Performance — Score : 5/10

#### Problèmes critiques 🔴
- **[public/projects/terra-sky.png]** 5.8MB — beaucoup trop lourd pour une image web → Convertir en WebP, target < 500KB
- **[public/projects/podium.png]** 4.5MB → Idem, convertir en WebP
- **[public/projects/success-talent.png]** 2.1MB → Convertir en WebP
- **[public/projects/sweety-delice.png]** 1.6MB → Convertir en WebP
- **[public/projects/city-smile.png]** 1.4MB → Convertir en WebP
- **[public/projects/8lab.png]** 1.3MB → Convertir en WebP
- **Total images projets : ~16.7MB** — devrait être < 3MB au total

#### Problèmes importants 🟠
- **[app/portfolio/page.tsx:393]** `unoptimized` sur les images du portfolio → Les images sont servies telles quelles (PNG 5MB). Retirer `unoptimized` et laisser Next.js optimiser en WebP, OU convertir manuellement en WebP et garder `unoptimized`
- **[app/portfolio/page.tsx]** 6 images fullscreen chargées : 3 en `eager`, 3 en `lazy` — les lazy se chargent pendant le scroll horizontal → OK mais le poids total est critique

#### Améliorations 🟡
- Pas de `next/font` display swap vérifié — actuellement `display: "swap"` ✅
- GSAP + Lenis + Liquid Glass = ~150KB de JS supplémentaire — acceptable
- Pas de `will-change` excessive

#### Points positifs ✅
- `sizes="100vw"` correct pour les images fullscreen
- Images de fond (sakura) optimisées (236KB) ✅
- Fonts Google avec `display: swap`
- Pas de render-blocking scripts

---

### 1.3 — SEO On-Page — Score : 3/10

#### Problèmes critiques 🔴
- **Pas de `sitemap.xml`** → Ajouter `app/sitemap.ts` (Next.js génère automatiquement)
- **Pas de `robots.txt`** → Ajouter `app/robots.ts`
- **Pas de balises Open Graph** sur aucune page → Ajouter `openGraph` dans les metadata de chaque page
- **Pas de Twitter Cards** → Ajouter `twitter` dans les metadata
- **Pas de schema markup (JSON-LD)** → Ajouter LocalBusiness / Organization sur la landing, Service sur les case studies
- **[app/page.tsx]** Le `<h1>` contient "Build with emotion." — en anglais sur un site FR, pas de keyword cible → Remplacer par un H1 FR avec keyword ("Agence Digitale Bruxelles" ou similaire)
- **[app/layout.tsx]** Pas de `canonical` configuré → Ajouter `metadataBase` dans layout

#### Problèmes importants 🟠
- **[app/page.tsx]** Pas de metadata propre — utilise uniquement le title global du layout → Ajouter metadata spécifique
- **[app/vision/page.tsx]** Pas de metadata (title/description) → Ajouter
- **[app/page.tsx:12]** `alt=""` sur l'image de fond — acceptable pour les images décoratives ✅
- **[app/portfolio/page.tsx]** Client component → pas de metadata export possible, mais `portfolio/layout.tsx` le gère ✅

#### Améliorations 🟡
- URLs propres ✅ (`/portfolio/city-smile`)
- Un seul H1 par page ✅
- Trailing slashes cohérents ✅

#### Points positifs ✅
- Case studies ont des metadata dynamiques (title + description par projet) ✅
- Portfolio layout a son propre metadata ✅
- Slugs SEO-friendly ✅

---

### 1.4 — Accessibilité — Score : 4/10

#### Problèmes critiques 🔴
- **Seulement 1 focus state** dans tout le codebase → Ajouter `focus-visible:ring-2` sur tous les éléments interactifs
- **[app/components/maintenance-gate.tsx]** Le champ password a un focus CSS mais pas de label visible → Ajouter un `<label>` ou `aria-label`
- **Contrastes insuffisants** : `text-white/50`, `text-white/30`, `text-black/25` sur fond clair/foncé → Vérifier WCAG AA (ratio 4.5:1 minimum)

#### Problèmes importants 🟠
- **Pas de skip-to-content link** → Ajouter un lien "Aller au contenu" en haut du layout
- **Custom cursor** masque le curseur natif sur desktop → Les utilisateurs de technologie d'assistance ne peuvent pas voir le curseur → Ajouter `prefers-reduced-motion` media query
- **0 tabindex** configuré → La navigation clavier sur le scroll horizontal est probablement cassée

#### Améliorations 🟡
- `aria-label` présent sur les liens sociaux ✅
- Images décoratives avec `alt=""` ✅
- Semantic HTML (`header`, `section`, `footer`, `nav`) partiellement utilisé

#### Points positifs ✅
- Rôles ARIA sur les liens sociaux (Instagram, TikTok) ✅
- 10 aria-labels dans le codebase

---

## Phase 2 — Design & UX

### 2.1 — Design System & Cohérence — Score : 6/10

#### Problèmes importants 🟠
- **26 tailles de police différentes** (de `text-[9px]` à `text-[100px]`) → Trop fragmenté. Définir une échelle typographique de 8-10 tailles max dans les CSS custom properties
- **Pas de design tokens** — couleurs, espacements, tailles en dur partout → Centraliser dans `globals.css` via des CSS variables
- **Incohérence glass opacity** : `bg-white/8`, `bg-white/10`, `bg-white/12`, `bg-white/15`, `bg-white/20`, `bg-white/25` → Standardiser à 3 niveaux (light/medium/strong)

#### Améliorations 🟡
- Palette couleurs réduite (noir, blanc, transparences) ✅ — cohérent
- Seule couleur custom : `bg-[#0a0a0a]` sur la maintenance page → OK
- Police unique (Inter) partout ✅
- Playfair importé mais plus utilisé → Supprimer de `layout.tsx` pour économiser du poids

#### Points positifs ✅
- Direction artistique cohérente : glass + dark + sakura
- Spacing visuellement consistant
- Border radius cohérent (rounded-full pour pills, rounded-2xl pour cards)

---

### 2.2 — Responsive & Mobile — Score : 7/10

#### Problèmes importants 🟠
- **Scroll horizontal sur mobile** — le GSAP horizontal scroll ne fonctionne probablement pas bien sur mobile tactile (pas de support swipe natif) → Tester et ajouter un fallback vertical sur mobile
- **Custom cursor** affiché sur mobile → Déjà `hidden md:flex` ✅
- **Glass overlay mobile** — `max-w-[85%]` sur mobile peut être trop large sur petit écran → Tester 375px

#### Améliorations 🟡
- Viewport meta correct ✅
- Breakpoints sm/md/lg utilisés ✅
- Tailles de texte responsives avec `clamp()` ✅

#### Points positifs ✅
- Touch targets (boutons 44px+) ✅
- Layout adaptatif sur les case studies ✅
- Images `sizes="100vw"` correct pour responsive

---

### 2.3 — UX & Parcours Utilisateur — Score : 7/10

#### Problèmes importants 🟠
- **Pas de formulaire de contact** — uniquement WhatsApp et email → Ajouter un formulaire simple (nom, email, message)
- **Navigation limitée** — pas de menu/nav sur la landing page, juste des boutons en footer → OK pour le style minimaliste mais le portfolio/case study n'a pas de nav vers les services

#### Améliorations 🟡
- CTA "Démarrer un projet" bien placé et visible ✅
- WhatsApp accessible en bas à droite sur toutes les pages ✅
- Parcours : Landing → Portfolio → Case Study → CTA → WhatsApp = 3 clics max ✅
- Animations fluides, pas bloquantes ✅

#### Points positifs ✅
- Flow intuitif
- CTA visible sur chaque page
- Bouton WhatsApp fixe
- "Projet suivant" dans les case studies pour garder le visiteur

---

## Phase 3 — Contenu & Copywriting

### 3.1 — Qualité du Contenu — Score : 5/10

#### Problèmes critiques 🔴
- **[app/page.tsx]** Hero : "Build with emotion." + "Apple-inspired design patterns" → En anglais, pas de proposition de valeur claire pour un prospect FR. Remplacer par un message FR orienté bénéfice client
- **[app/page.tsx]** Aucun texte descriptif sur la landing — juste un titre + sous-titre → Ajouter au minimum une section services/bénéfices

#### Problèmes importants 🟠
- **Landing page trop minimaliste** — un visiteur ne comprend pas ce que fait Pulsa Creatives sans cliquer ailleurs → Ajouter du contenu au-dessus du fold ou juste en dessous
- **Les longDescriptions des projets** sont génériques — pas de données chiffrées dans le texte (seulement dans les stats) → Enrichir

#### Points positifs ✅
- Case studies bien structurées (Brief → Défi → Approche → Résultats) ✅
- Ton vouvoiement cohérent ✅
- Pas de fautes d'orthographe détectées ✅

---

### 3.2 — Preuves Sociales & Trust — Score : 4/10

#### Problèmes critiques 🔴
- **Pas de témoignages clients** → Ajouter des quotes de clients satisfaits
- **Pas de logos clients** → Ajouter une bande de logos "Ils nous font confiance"

#### Problèmes importants 🟠
- **Pas de page mentions légales** — lien `/legal` dans le footer mais page non vérifiée → Vérifier que la page existe et est complète
- **Pas de CGV / Politique de confidentialité** → Obligatoire en Belgique (RGPD)

#### Points positifs ✅
- 6 études de cas avec résultats chiffrés ✅
- Liens réseaux sociaux fonctionnels (Instagram, TikTok) ✅

---

## Phase 4 — Sécurité & Bonnes Pratiques

### 4.1 — Sécurité — Score : 6/10

#### Problèmes importants 🟠
- **Headers de sécurité manquants** : seul `Strict-Transport-Security` est présent. Manquent :
  - `Content-Security-Policy`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  → Ajouter dans `next.config.ts` via `headers()`
- **[app/components/maintenance-gate.tsx:4]** Mot de passe en clair dans le code front → Acceptable temporairement, mais n'importe qui peut le lire dans le JS bundle

#### Points positifs ✅
- HTTPS actif ✅
- HSTS configuré (63072000s) ✅
- Pas de secrets/API keys exposés ✅
- Pas de `console.log` en production ✅

---

### 4.2 — Bonnes Pratiques — Score : 6/10

#### Problèmes importants 🟠
- **[package.json]** Dépendance `@studio-freight/lenis` obsolète et dupliquée → Supprimer
- **[app/layout.tsx]** Playfair_Display importé mais plus utilisé nulle part → Supprimer (économie ~40KB)
- **[public/]** Fichiers boilerplate Next.js non nettoyés → Supprimer

#### Points positifs ✅
- TypeScript strict ✅
- ESLint configuré ✅
- Vercel deployment ✅
- Git propre ✅

---

## 📊 Tableau Récapitulatif

| Couche | Score /10 | Critiques 🔴 | Importants 🟠 | Améliorations 🟡 |
|---|---|---|---|---|
| 1.1 Architecture | 6 | 3 | 3 | 2 |
| 1.2 Performance | 5 | 6 | 2 | 1 |
| 1.3 SEO | 3 | 7 | 2 | 0 |
| 1.4 Accessibilité | 4 | 3 | 3 | 1 |
| 2.1 Design System | 6 | 0 | 3 | 2 |
| 2.2 Responsive | 7 | 0 | 3 | 1 |
| 2.3 UX | 7 | 0 | 2 | 1 |
| 3.1 Contenu | 5 | 2 | 2 | 0 |
| 3.2 Trust | 4 | 2 | 2 | 0 |
| 4.1 Sécurité | 6 | 0 | 2 | 0 |
| 4.2 Bonnes Pratiques | 6 | 0 | 3 | 0 |
| **TOTAL** | **59/110** | **23** | **27** | **8** |

**Score global : 54%** — Fonctionnel mais beaucoup d'optimisations critiques à faire.

---

## 🚀 Top 10 Quick Wins (par impact)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Convertir toutes les images en WebP** (16.7MB → ~2MB) | 🔴 Performance | 10 min |
| 2 | **Ajouter sitemap.xml + robots.txt** | 🔴 SEO | 5 min |
| 3 | **Ajouter Open Graph + Twitter Cards** | 🔴 SEO | 10 min |
| 4 | **Supprimer fichiers morts** (project-modal, smooth-scroll, SVGs, bg-japan, portfolio.css) | 🟠 Architecture | 5 min |
| 5 | **Supprimer Playfair font + @studio-freight/lenis** | 🟠 Performance | 5 min |
| 6 | **Ajouter metadataBase + canonical** dans layout.tsx | 🔴 SEO | 3 min |
| 7 | **Ajouter security headers** dans next.config.ts | 🟠 Sécurité | 10 min |
| 8 | **Changer le H1 landing page** en français avec keyword | 🔴 SEO/Contenu | 5 min |
| 9 | **Ajouter JSON-LD schema** (LocalBusiness) | 🔴 SEO | 15 min |
| 10 | **Améliorer contrastes** des textes low-opacity | 🟠 A11y | 15 min |

**Temps estimé pour les 10 quick wins : ~80 minutes**
