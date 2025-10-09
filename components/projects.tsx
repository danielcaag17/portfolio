"use client";

import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects-data";
import { useIsVisible } from "@/hooks/use-is-visible";
import { SectionTitle } from "@/components/section-title";
import { MyBadge } from "@/components/my-badge";

export function Projects() {
  // Estado para rastrear qué project está siendo "hovered"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);
  // hook para saber cuando este componente esté visible en un 10%
  const isVisible = useIsVisible(sectionRef);
  // Detectar si es en un dispositivo móvil
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    // TODO: cambiar los hoveredIndex por group-hover (cuando sea necesario)
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      {/* Fondo decorativo con rejilla (grid) usando gradientes y opacidad */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            // Rejilla en fondo con color y transparencia
            // aplica dos degradados lineales superpuestos como fondo.
            // En conjunto, crean un patrón que simula una cuadrícula o rejilla
            // La idea es que de 0px a 1px se pinta con el color oklch, de 1px en adelante transparent
            // esto se repite gracias a la regla del backgroundSize
            backgroundImage: `linear-gradient(oklch(0.65 0.19 180 / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, oklch(0.65 0.19 180 / 0.1) 1px, transparent 1px)`,

            // Tamaño de celdas del grid, esto define el bloque (tile) en la que se dibuja una línea
            // horinzontal y una vertial
            backgroundSize: "50px 50px",
            animation: "reveal 1s ease-out",
          }}
        />
      </div>

      {/* Contenido principal centrado (mx-auto) */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle
          h2Text={"<projects />"}
          h3Text={"Featured Work"}
          pText={
            "A selection of projects that showcase my expertise in building modern web applications with focus on user experience and performance."
          }
          isVisible={isVisible}
          revealDelays={{
            h2Delay: "0s",
            h3Delay: "0.2s",
            pDelay: "0.4s",
          }}
        />

        {/* Tarjeta de cada proyecto */}
        {/* gap-8 --> gap de 2rem --> 32px
          cuando son pantallas medias / grandes se hace un grid de 2 columnas */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <CardWrapper
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden border-border bg-card transition-all duration-500 
              hover:border-primary/50 hover:translate-y-[-8px] hover:scale-[1.02]"
              style={{
                // Se prioriza el transform del hover antes que la animación de reveal con translateY
                animation: isVisible
                  ? `reveal-opacity 0.6s ease-out ${0.6 + index * 0.1}s both`
                  : "none",
                boxShadow:
                  hoveredIndex === index
                    ? "0 20px 40px oklch(0.65 0.19 180 / 0.2), 0 0 60px oklch(0.65 0.19 180 / 0.1)"
                    : "none",
              }}
            >
              {/* Imagen del proyecto */}
              {/* aspect-video --> Mantener una relación 16:9 */}
              {/* overflow-hidden --> impide que la imagen sobrepase los bordes al escalar */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  // object-cover --> la imagen se escala para cubrir todo el espacio sin deformarse
                  // (recorta si hace falta), es equivalente en css a object-fit: cover;
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110
                  brightness-[1] constrast-[1] group-hover:brightness-[1.1] group-hover:contrast-[1.1]"
                  style={{
                    transform:
                      hoveredIndex === index
                        ? `scale(1.1) rotate(${index % 2 === 0 ? -2 : 2}deg)`
                        : "scale(1) rotate(0deg)",
                  }}
                />

                {/* Overlay con degradado al hacer hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent 
                opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="p-6">
                <h4 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h4>
                {/* line-clamp-3 --> mostrar 3 líneas y dejar el resto con puntos suspensivos */}
                {/* line-clamp-none --> opción por defecto, no hay límite de líneas */}
                <p
                  id={`description-${project.title}`}
                  className={`mb-4 leading-relaxed text-muted-foreground text-pretty
                transition-all duration-300 md:line-clamp-none lg:line-clamp-3 lg:group-hover:line-clamp-none`}
                >
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    // Tecnologías usadas en el proyecto
                    <MyBadge
                      key={tech}
                      tech={tech}
                      techIndex={techIndex}
                      hoveredIndex={hoveredIndex}
                      index={index}
                    />
                  ))}
                </div>

                {/* Botones de Github y Demo */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    // group/btn --> nuevo "contexto de hover" específico para el botón
                    className="group/btn bg-transparent transition-all hover:bg-primary"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGithub className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                      Code
                    </a>
                  </Button>
                  {project.live ? (
                    <Button
                      size="sm"
                      className="group/btn relative overflow-hidden"
                      asChild
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink
                          className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 
                      group-hover/btn:-translate-y-1"
                        />
                        Live Demo
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
