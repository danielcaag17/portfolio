"use client";

import { useState, useRef } from "react";
import { useIsVisible } from "@/hooks/use-is-visible";
import { SectionTitle } from "@/components/section-title";
import { CardWrapper } from "@/components/card-wrapper";
import { ArrowRight } from "lucide-react";
import { certifications } from "@/data/certifications-data";

export function Certifications() {
  // Estado para rastrear qué certificación está siendo "hovered"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);
  // hook para saber cuando este componente esté visible en un 10%
  const isVisible = useIsVisible(sectionRef);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Sección del título de la sección certerience */}
        <SectionTitle
          h2Text={"<certifications />"}
          h3Text={"Validated Skills"}
          isVisible={isVisible}
          revealDelays={{
            h2Delay: "0s",
            h3Delay: "0.2s",
          }}
        />

        {/* CARDs de las certificaciones */}
        <div className="space-y-12">
          {certifications.map((cert, index) => (
            <CardWrapper
              key={index}
              // Funciones para cambiar el estado
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden border-border bg-card p-8 transition-all 
              duration-500 hover:border-primary/50"
              style={{
                animation: isVisible
                  ? `reveal 0.6s ease-out ${0.6 + index * 0.2}s both`
                  : "none",
                boxShadow:
                  hoveredIndex === index
                    ? "0 10px 40px oklch(0.65 0.19 180 / 0.15)"
                    : "none",
              }}
            >
              {/* Línea vertical de color animada dentro de la Card*/}
              <div
                className="absolute left-0 top-0 w-1 bg-primary transition-all 
              duration-500 h-0 group-hover:h-full opacity-100"
              />

              {/* Efecto de iluminación top-left al hacer hover */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 
                rounded-full bg-primary/20 blur-3xl transition-opacity duration-500
                opacity-0 group-hover:opacity-100"
              />

              <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  {/* div necesario para dividir los dos bloques de texto */}
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
                      {cert.date}
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {cert.title}
                    </h4>
                    <div className="text-primary">
                      <a
                        href={cert.companyURL}
                        target={
                          cert.companyURL.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          cert.companyURL.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-block text-primary hover:underline"
                      >
                        {cert.company}
                      </a>
                    </div>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
                  {cert.description}
                </p>
                {cert.companyURL && (
                  <a
                    href={cert.certificationURL}
                    target={
                      cert.certificationURL.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      cert.certificationURL.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-block text-primary  group/parent hover:underline"
                  >
                    View certificate
                    <ArrowRight className="inline ml-0.5 z-20 h-4 w-4 transition-transform group-hover/parent:translate-x-1" />
                  </a>
                )}
              </div>
            </CardWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
