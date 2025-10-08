"use client";

import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects-data";

export function Projects() {
  // Estado para rastrear qué project está siendo "hovered"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);

  // Estado para saber si el componente es visible en el viewport (pantalla) del usuario
  const [isVisible, setIsVisible] = useState(false);

  // TODO: refactor de esto para añadirlo a utils, tambien se utiliza en experience y no
  // me extrañaria que en otros componentes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        {/* TODO: refactorizar si se quiere todos los h2 con <section_name /> */}
        <h2
          className="mb-4 text-sm font-mono text-primary"
          style={{
            animation: isVisible ? "reveal 0.6s ease-out" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {"<projects />"}
        </h2>

        {/* Título principal de la sección */}
        <h3
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Featured Work
        </h3>
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty"
          style={{
            animation: isVisible ? "reveal 1s ease-out 0.4s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          A selection of projects that showcase my expertise in building modern
          web applications with focus on user experience and performance.
        </p>

        {/* Tarjeta de cada proyecto */}
        {/* gap-8 --> gap de 2rem --> 32px
        cuando son pantallas medias / grandes se hace un grid de 2 columnas */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden border-border bg-card transition-all duration-500 
              hover:border-primary/50"
              style={{
                // Se prioriza el transform del hover antes que la animación de reveal con translateY
                animation: isVisible
                  ? `reveal-opacity 0.6s ease-out ${0.6 + index * 0.1}s both`
                  : "none",
                transform:
                  hoveredIndex === index
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0) scale(1)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 20px 40px oklch(0.65 0.19 180 / 0.2), 0 0 60px oklch(0.65 0.19 180 / 0.1)"
                    : "none",
              }}
            >
              {/* Empeoraba mucho la legibilidad y ha sido mejor eliminarlo en este caso */}
              {/* -inset-[1px] --> mover el div ligeramente más allá del borde de la tarjeta los 
              '[]' son para indicar la medida exacta */}
              {/* <div
                // will-change --> indicar al navegador que se va a animar esta propiedad (así se prepara
                // para optimizar)
                className="pointer-events-none absolute -inset-[1px] rounded-lg opacity-0 transition-opacity 
                duration-500 group-hover:opacity-100 will-change-auto"
                style={{
                  background:
                    // Degradado en diagonal, se repite el primero al final para hacer un bucle suave
                    `linear-gradient(45deg, 
                    oklch(0.65 0.19 180), 
                    oklch(0.7 0.12 160), 
                    oklch(0.65 0.19 180))`,
                  // Hacer que el fondo sea más grande es clave para que el degradado puede "entrar" y "salir" de
                  // los bordes visuales. Sino el degradado sería estático o cortado
                  backgroundSize: "200% 200%",
                  animation:
                    hoveredIndex === index
                      ? "shimmer 3s linear infinite"
                      : "none",
                  zIndex: -1,
                }}
              /> */}

              {/* Imagen del proyecto */}
              {/* aspect-video --> Mantener una relación 16:9 
              overflow-hidden --> impide que la imagen sobrepase los bordes al escalar */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  // object-cover --> la imagen se escala para cubrir todo el espacio sin deformarse (recorta
                  // si hace falta), es equivalente a object-fit: cover;
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter:
                      hoveredIndex === index
                        ? "brightness(1.1) contrast(1.1)"
                        : "brightness(1) contrast(1)",
                    transform:
                      hoveredIndex === index
                        ? `scale(1.1) rotate(${index % 2 === 0 ? -2 : 2}deg)`
                        : "scale(1) rotate(0deg)",
                  }}
                />
                {/* Overlay con degradado al hacer hover */}
                {/* bg-gradient-to-t --> "to top" va de bottom a top */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent 
                opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="p-6">
                <h4 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h4>
                <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {/* TODO: de nuevo se puede hacer un refactor con las Badge de experience */}
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary/50 text-xs transition-all hover:bg-primary/20 hover:text-primary cursor-pointer"
                      style={{
                        animation:
                          hoveredIndex === index
                            ? `float-up 0.3s ease-out ${techIndex * 0.05}s both`
                            : "none",
                      }}
                    >
                      {tech}
                    </Badge>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
