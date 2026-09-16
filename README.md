# OVERSKILLED

OVERSKILLED is een interactieve landingspagina voor een abonnementsdienst voor senior software-engineers en technische delivery. De pagina positioneert on-demand engineering als alternatief voor een traditioneel developmentteam.

## Functionaliteiten

- Hero-sectie met geanimeerde merkbadge, introductie en call-to-action.
- Navigatie met smooth scrolling en een responsive mobiel menu.
- Geanimeerde capability-marquee met technologieën zoals React, Node.js, Python en AWS.
- Prijsoverzicht met Starter-, Professional- en Enterprise-abonnementen.
- Social-proof-sectie met geanimeerde statistieken en testimonial.
- Afsluitende CTA die naar het prijsoverzicht scrollt.
- Smooth scrolling en scroll-gebaseerde animaties met Lenis, GSAP en ScrollTrigger.
- Responsive dark interface met Tailwind CSS en Geist Mono-font.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP en ScrollTrigger
- Lenis
- Lucide React
- Radix UI-componenten
- ESLint

## Lokaal starten

Vereisten:

- Node.js 20 of nieuwer
- npm

Installeer de dependencies en start de ontwikkelserver:

```bash
npm install
npm run dev
```

Open daarna de URL die Vite in de terminal toont.

## Scripts

| Script | Doel |
| --- | --- |
| `npm run dev` | Start de Vite-ontwikkelserver met HMR |
| `npm run build` | Voert TypeScript-controle uit en maakt een productie-build |
| `npm run lint` | Controleert de code met ESLint |
| `npm run preview` | Serveert de productie-build lokaal |

## Projectstructuur

```text
.
├── public/fonts/       # Lokale Geist Mono-font
├── src/components/ui/  # Herbruikbare Radix/shadcn UI-componenten
├── src/hooks/          # Custom React hooks
├── src/lib/            # Gedeelde utilities
├── src/pages/          # Pagina-entrypoints
├── src/sections/       # Secties van de landingspagina
├── src/App.tsx         # Rootcomponent en sectievolgorde
├── src/App.css         # Component-specifieke stijlen
├── src/index.css       # Globale stijlen en Tailwind-lagen
├── index.html          # HTML-entrypoint
├── tailwind.config.js  # Tailwind-configuratie
├── vite.config.ts      # Vite-configuratie
└── package.json        # Dependencies en scripts
```
