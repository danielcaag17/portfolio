"use client";

import { Card } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";
import { useRef, useState } from "react";
import { useIsVisible } from "@/hooks/use-is-visible";
import { revealStyles } from "@/utils/revealStyles";

export function Skills() {
  // Estado para rastrear qué skill está siendo "hovered"
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);
  // hook para saber cuando este componente esté visible en un 10%
  const isVisible = useIsVisible(sectionRef);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      {/* Bola desenfocada animada */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-2/3 top-1/8 h-32 w-64 rounded-full bg-primary/25 blur-3xl"
          style={{
            animation:
              "float 2s ease-in-out infinite, morph 5s ease-in-out infinite",
          }}
        />
      </div>

      {/* TODO: si no estaba puesto, los <skills> o <projects> que tanto aprecen --> componente nuevo */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          className="mb-4 text-sm font-mono text-primary"
          style={revealStyles(isVisible, "0s")}
        >
          {"<skills />"}
        </h2>
        <h3
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          style={revealStyles(isVisible, "0.2s")}
        >
          Technical Expertise
        </h3>
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty"
          style={revealStyles(isVisible, "0.4s")}
        >
          A comprehensive toolkit built through years of hands-on experience and
          continuous learning in modern web development.
        </p>

        {/* Grid de las skills, en pantallas grandes 3 columnas, en medianas 2, en pequeñas 1 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            // Calculo del delay por cada Card
            const delay = `0.6s + ${index * 0.1}s`;
            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative border-border bg-card p-6 transition-all duration-500 hover:border-primary/50"
                style={{
                  // Se prioriza animación con solo opacidad frente al transform que solapaba
                  animation: isVisible
                    ? `reveal-opacity 0.6s ease-out ${0.6 + index * 0.1}s both`
                    : "none",
                  transform:
                    hoveredCard === index
                      ? `translateY(-8px) rotateX(${
                          index % 2 === 0 ? -20 : 20
                        }deg) rotateY(-5deg)`
                      : "translateY(0) rotateX(0) rotateY(0)",
                  // Propiedad que dice al navegador que preserve el contexto 3D para los hijos que tengan transformaciones
                  // 3D aplicadas, sino las transformaciones pueden no aplicarse como se espera
                  transformStyle: "preserve-3d",
                  // Define la distancia entre el observador (cámara) y el objeto
                  perspective: "1000px",
                }}
              >
                {/* Halo de luz en la parte superior de la Card */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, oklch(0.65 0.19 180 / 0.1), transparent 70%)",
                    opacity: hoveredCard === index ? 1 : 0,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    {/* Icono al lado del título */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all 
                      duration-500 group-hover:bg-primary group-hover:text-primary-foreground"
                      style={{
                        transform:
                          hoveredCard === index
                            ? "rotate(360deg) scale(1.1)"
                            : "rotate(0deg) scale(1)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-foreground transition-colors group-hover:text-primary">
                      {category.title}
                    </h4>
                  </div>

                  {/* Listas de skills */}
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => {
                      // Calculo del delay por cada Skill
                      const delay = `${skillIndex * 0.05}s`;

                      return (
                        <li
                          key={skill}
                          className="flex items-center text-sm text-muted-foreground transition-all"
                          style={revealStyles(hoveredCard === index, delay)}
                        >
                          <div
                            className="mr-2 h-1.5 w-1.5 rounded-full bg-primary transition-all"
                            style={{
                              transform:
                                hoveredCard === index
                                  ? "scale(1.5)"
                                  : "scale(1)",
                            }}
                          />
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
