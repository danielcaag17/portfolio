// Son fuentes tipográficas (sans-serif y monoespaciada) optimizadas por Vercel.
// Internamente usan @next/font para hacer optimización automática de las fuentes (autohospedadas, precargadas, sin FOUT, etc.).
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { metadata } from "./metadata";
import "./globals.css";

export { metadata };

// En Next.js con App Router, cada archivo layout.tsx envuelve los page.tsx que están en su misma ruta o en subrutas.
// Cuando Next.js procesa una ruta (/, /dashboard, etc.), encuentra su page.tsx y lo inyecta dentro del layout más cercano usando la prop children.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
