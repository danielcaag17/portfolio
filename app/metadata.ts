// Importa el tipo `Metadata`, que sirve para definir metadatos HTML como el `<title>`, `<meta name="description">`, etc.
// Esto es parte del sistema de SEO y head tags del App Router.
import type { Metadata } from "next";

// Next.js automáticamente inyecta este `metadata` en el `<head>` del HTML al hacer SSR o SSG.
export const metadata: Metadata = {
  title: {
    default: "Portafolio de Daniel Cañizares Aguilar — Desarrollador Fullstack",
    template: "%s | Portafolio de Daniel",
  },
  description:
    "Portafolio profesional de Daniel Cañizares Aguilar, ingeniero de software especializado en React, APIs REST y backend con Python/Django. Proyectos destacados, experiencia y contacto.",
  keywords: [
    "next.js",
    "tailwind",
    "vercel",
    "portafolio",
    "desarrollador web",
    "react",
    "django",
    "typescript",
    "proyectos",
    "frontend",
    "backend",
    "fullstack",
    "fastapi",
  ],
  authors: [{ name: "Daniel Cañizares Aguilar" }],
  openGraph: {
    title: "Portafolio de Daniel Cañizares Aguilar — Desarrollador Fullstack",
    description:
      "Conoce los proyectos de Daniel Cañizares Aguilar, desarrollador Fullstack.",
    url: "https://portfolio-daniel-canizares.vercep.app",
    siteName: "Portfolio de Daniel Cañizares Aguilar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Imagen para redes",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio de Daniel Cañizares Aguilar",
    description:
      "Descubre los proyectos y habilidades de Daniel Cañizares Aguilar, desarrollador fullstack.",
    creator: "@danielcaag17",
    images: ["/og-image.jpg"],
  },
};
