"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { SocialLinks } from "@/components/SocialLinks";

export function Hero() {
  // Apunta al contenedor principal
  const heroRef = useRef<HTMLDivElement>(null);

  // Apunta al elemento que actúa como el cursor personalizado
  const cursorRef = useRef<HTMLDivElement>(null);

  // Referencia al resume
  const href = "/resume.pdf";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && heroRef.current) {
        // Retorna un objeto con información sobre el tamaño y la posición del elemento en la pantalla
        const rect = heroRef.current.getBoundingClientRect();

        // Calcular posición relativa dentro del contenedor
        // Restar la posición del contenedor a las coordenadas globales del ratón
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // style.left y style.top son eficientes para animaciones simples
        // En caso de querer suavizar el movimiento, se pueden usar trancisiones CSS o requestAnimationFrame
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    };

    // Devuelve el elemento con la referencia una vez React lo ha renderizado
    // Si aún no se ha renderizado devolverá null
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);

      // Cleanup function, se ejecuta cuando React desmonta el componente
      // Se desmonta cuando el componente deja de mostrarse en pantalla (por ejemplo,
      // al navegar a otra página, o al eliminarlo del árbol de React)
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // overflow-hidden --> ocultar cualquier parte del contenido que sobresalga (para los efectos visuales)
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 lg:px-20"
    >
      {/* Forzar el overflow-hidden dentro del div */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* FONDO ANIMADO 1 */}
        <div
          // blur-3xl --> desenfoque fuerte (más disfuso que un blur-md)
          className="absolute -right-24 -top-40 h-96 w-96 rounded-full bg-primary/40 blur-2xl"
          style={{
            animation:
              "float 6s ease-in-out infinite, morph 8s ease-in-out infinite",
          }}
        />
        {/* FONDO ANIMADO 2 */}
        <div
          className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-lg"
          style={{
            animation:
              "float 10s ease-in-out infinite reverse, morph 12s ease-in-out infinite",
          }}
        />
        {/* FONDO ANIMADO CURSOR */}
        <div
          ref={cursorRef}
          // -translate-x-1/2 y - translate-y-1/2 se aplican después de posicionar
          // el elemento absolutamente, con un top y left. Lo que se consigue es que
          // el div (el círculo en este caso) aparezca centrado sobre el puntero del mouse,
          // no desplazado hacia una esquina.
          className="absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl pointer-events-none"
        />
      </div>

      {/* redes sociales solo en pantallas < lg */}
      <div className="absolute top-4 right-4 flex lg:hidden">
        <SocialLinks delay={0} />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* inline-block junto con overflow-hidden crean un contenedor recortado
        perfecto para la animacón de reveal (slide-in) */}
        <div className="mb-6 inline-block overflow-hidden">
          <span
            // font-mono --> Fuente monoespaciada, para el código
            className="inline-block text-sm font-mono text-primary"
            style={{ animation: "reveal 0.6s ease-out" }}
          >
            {"<hello world />"}
          </span>
        </div>

        <h1
          // text-balance --> text-wrap: balance --> distribuye palabras equilibradamente entre líneas
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl"
          style={{ animation: "reveal 0.8s ease-out 0.2s both" }}
        >
          {/* El {" "} es un espacio en blanco explícito que usa React porque JSX a veces
          ignora espacios entre elementos o texto si están mal colocados */}
          I'm a Fullstack Developer{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">
              focused on learning
            </span>
            <span
              // Efecto resplandor
              className="absolute inset-0 -z-10 bg-primary/20 blur-xl"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            />
          </span>
          and building real-world web apps.
        </h1>

        <p
          // text-muted-foreground --> color del texto
          className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
          style={{ animation: "reveal 1s ease-out 0.4s both" }}
        >
          I combine a strong foundation in fullstack development with a growing
          passion for building accessible, performant web apps. I'm currently
          focused on learning modern web technologies, design systems, and
          crafting real-world digital experiences.
        </p>

        <div
          className="flex flex-wrap gap-4"
          style={{ animation: "reveal 1.2s ease-out 0.6s both" }}
        >
          {/* Por defecto bg-background --> el color --primary */}
          <Button
            size="lg"
            className="group relative overflow-hidden cursor-pointer"
            onClick={() => scrollToSection("projects")}
          >
            <span className="relative z-20 flex items-center">
              View My Work
              <ArrowRight className="z-20 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* 
            absolute + inset --> ocupar todo el botón
            bg-gradient-to-r --> Fondo degradado horizontal de left a right 
            from-chart-2 --> color inicial del gradiente
            via-primary/80 --> color intermedio con 80% de opacidad
            to-primary --> color final del gradiente
            */}
            <span
              className="absolute inset-0 z-10 bg-gradient-to-r from-chart-2 via-primary/80 to-primary
            opacity-0 transition-opacity group-hover:opacity-50"
            />
          </Button>
          <Button
            size="lg"
            // estilo con borde
            variant="outline"
            // transition-colors --> Le dice al navegador: cuando cambie el color (de lo que sea),
            // anímalo suavemente
            className="relative overflow-hidden border-primary/30 hover:border-primary bg-transparent 
            hover:bg-primary/20 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
            asChild
          >
            {/* Añadir download en caso de que quiera forzar la descarga */}
            <a
              href={href}
              // download
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="relative z-10">Download Resume</span>
            </a>
          </Button>
        </div>

        {/* No por ahora */}
        {/* <div
          className="mt-16 flex flex-wrap gap-8 text-sm"
          style={{ animation: "reveal 1.4s ease-out 0.8s both" }}
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "20+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group cursor-default transition-transform hover:scale-110"
            >
              <div className="text-3xl font-bold text-primary transition-all group-hover:text-4xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
