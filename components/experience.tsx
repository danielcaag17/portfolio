"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/data/experiences-data";

export function Experience() {
  // Estado para rastrear qué tarjeta (u otro elemento) está siendo "hovered" (pasado el cursor por encima)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla.
  const sectionRef = useRef<HTMLElement>(null);

  // Estado para saber si el componente es visible en el viewport (pantalla) del usuario
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // new IntersectionObserver que detecta si el componente está entrando en la vista del usuario
    const observer = new IntersectionObserver(
      // Arrow function con destructuración de arrays en sus parámetros
      ([entry]) => {
        // Si el componente entra en la vista, actualizamos el estado a visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      // Umbral de visibilidad: 10% del componente debe estar visible para activar el evento
      { threshold: 0.1 }
    );

    // Si la referencia al <section> existe, se comienza a observarla
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      // Se pasa la referencia al DOM para que el IntersectionObserver pueda observar cuándo este
      // bloque entra en pantalla.
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      {/* Línea decorativa vertical con gradient */}
      {/* hidden por defecto, pero en pantallas grandes display block (se hace visible) 
      bg-gradiente-to-b --> gradiente de colores de top a bottom */}
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b 
      from-transparent via-primary/30 to-transparent lg:left-80 lg:block"
      />

      {/* mx-auto --> centrar el div horizontalmente */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <h2
          className="mb-4 text-sm font-mono text-primary"
          style={{
            animation: isVisible ? "reveal 0.6s ease-out" : "none",
          }}
        >
          {"<experience />"}
        </h2>
        <h3
          className="mb-16 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
          }}
        >
          Professional Journey
        </h3>

        {/* CARDs de las experiencias */}
        {/* space-y-12 --> añadir margen bottom de 3rem (48px) entre cada Card */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            // TODO: cambiar los hoveredIndex por group-hover (cuando sea necesario)
            <Card
              key={index}
              // Funciones para cambiar el estado
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // border-border --> Aplica color personalizado al borde
              // bg-card --> Aplica color personalizado al background
              // El overflow-hidden solo funcionará cuando tenga un alto y ancho limitado
              // Ahora mismo tiene el mismo efecto que overflow-visible
              className="group relative overflow-hidden border-border bg-card p-8 transition-all 
              duration-500 hover:border-primary/50"
              style={{
                // El transform no funciona
                animation: isVisible
                  ? `reveal 0.6s ease-out ${0.6 + index * 0.2}s both`
                  : "none",
                // No funciona el transform pues se sobreescribe por la animación reveal
                transform:
                  hoveredIndex === index ? "translateX(12px)" : "translateX(0)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 10px 40px oklch(0.65 0.19 180 / 0.15)"
                    : "none",
              }}
            >
              {/* Botón para abrir el sitio web */}
              {exp.companyURL && (
                <Button
                  // Poner la key de nuevo es redundante (y potencialmente problemático)
                  // El Button ya está dentro de un padre con la key={index}
                  // key={index}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-20 p-1 h-7 w-14 transition-all 
                  duration-300 hover:scale-110 hover:text-primary"
                  asChild
                >
                  <a
                    href={exp.companyURL}
                    target={
                      exp.companyURL.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      exp.companyURL.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={`Open ${exp.company} in a new tab`}
                  >
                    <ExternalLink className="h-5 w-5 text-white" />
                  </a>
                </Button>
              )}

              {/* Línea vertical de color animada */}
              <div
                // w-1 --> 1 * var(--spacing) = 0.25rem = 4px
                className="absolute left-0 top-0 w-1 bg-primary transition-all duration-500"
                style={{
                  height: hoveredIndex === index ? "100%" : "0%",
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              {/* Efecto de iluminación top-left al hacer hover */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 
                rounded-full bg-primary/20 blur-3xl transition-opacity duration-500"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  {/* div necesario para dividir los bloques de texto */}
                  <div>
                    <div
                      className="mb-2 text-xs font-mono text-muted-foreground transition-colors"
                      style={{
                        color:
                          hoveredIndex === index
                            ? "oklch(0.65 0.19 180)"
                            : undefined,
                      }}
                    >
                      {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {exp.title}
                    </h4>
                    <div className="text-primary">{exp.company}</div>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      // Cada Badge tiene su propio hover --> TODO: jugar con eso y crear un botón?
                      className="bg-secondary/50 text-xs transition-all hover:bg-primary/20 hover:text-primary cursor-pointer"
                      style={{
                        animation:
                          // Animación que eleva ligeremente a todos los Badge (insignias)
                          hoveredIndex === index
                            ? `float-up 0.3s ease-out ${techIndex * 0.05}s both`
                            : "none",
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
