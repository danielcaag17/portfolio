"use client";

import { useState, useEffect } from "react";
// Font Awesome
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "hero", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

export function Navigation() {
  // Estado que almacena la sección actualmente visible en el viewport
  const [activeSection, setActiveSection] = useState("hero");

  // Estado que almacena la posición actual del mouse en pantalla (x, y)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /**
   * useEffect que utiliza IntersectionObserver para detectar
   * cuál sección del sitio está actualmente visible (al menos 50%).
   *
   * Cuando una sección entra en el viewport, se actualiza el estado `activeSection`,
   * lo cual se puede usar para resaltar dinámicamente la sección activa en la navegación.
   */
  useEffect(
    () => {
      // IntersectionObserver --> API nativa del navegador que permite saber cuándo un elemento entra o sale del viewport.
      // Más eficiente que escuchar eventos de scroll manualmente.
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Si el elemento está al menos 30% visible
            if (entry.isIntersecting) {
              // Actualiza la sección activa con el ID del elemento visible
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3 } // 30% del elemento debe estar visible para activar
      );

      // Observa cada sección definida en el arreglo `navItems`
      navItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      // Limpieza: desconecta el observer al desmontar el componente
      return () => observer.disconnect();
    },
    // El array vacio indica que el efecto se ejecuta solo una vez, tras montar
    // Si no estuviese, se ejecutaría en cada render
    []
  );

  /**
   * useEffect que escucha los movimientos del mouse en la ventana.
   *
   * Cada vez que el usuario mueve el mouse, actualiza el estado `mousePosition`
   * con las coordenadas actuales del cursor.
   *
   * Esto se puede usar para crear efectos visuales que sigan el movimiento del mouse,
   * como gradientes animados o parallax.
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Se puede hacer que el efecto sea solo locar como en hero.tsx
    window.addEventListener("mousemove", handleMouseMove);

    // Limpieza: elimina el listener cuando el componente se desmonta
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /**
   * scrollToSection: función que hace scroll suave hacia una sección específica.
   *
   * Recibe el ID de la sección como argumento y, si existe en el DOM,
   * hace scroll animado hasta ella.
   *
   * Esto permite navegación tipo SPA sin recargar la página.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });

    // En caso que me interese cambiar la URL sin recargar la página (window.location.hash = "#about" o <a href="#about">)
    // history.pushState(null, "", `#${id}`);
  };

  return (
    // w-80 --> 320rem
    // border-border --> Aplicar color al borde con un color personalizado en /app/globals --border: oklch(0.25 0.02 250);
    // p-12 --> 48rem
    <nav className="fixed left-0 top-0 z-50 hidden h-screen w-80 flex-col justify-between border-r border-border bg-sidebar p-12 lg:flex">
      {/* inset-0 --> indica la posición del elemento (top, right, down, left)
      opacity-30 --> marca una opacidad del 30%
      */}
      <div
        className="absolute inset-0 opacity-30"
        // Genera un fondo dinámico (radial) que sigue la posición del mouse,
        // añadiendo un efecto visual suave y atractivo detrás del contenido.
        // Utiliza el modelo de color oklch para colores precisos y accesibles.
        // En el color oklch, la parte /0.7 es el valor Alpha, la opacidad, transparencia
        // El color se hace transparente al llegar al 10% del radio
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.65 0.19 180 / 0.7), transparent 10%)`,
        }}
        // En pocas palabras: El gradiente empieza con un color semitransparente
        // (70% de opacidad) y se desvanece completamente (transparente al 100%) al llegar al 10% del radio.
      />

      <div className="relative z-10">
        <div className="mb-16" style={{ animation: "reveal 0.8s ease-out" }}>
          {/* Espaciado entre letras ajustado */}
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
            Daniel Cañizares Aguilar
          </h1>
          <p className="text-lg text-muted-foreground">Software Developer</p>
          {/* Si no se usara leading-relaxed, se aplicaría el line-height por
          defecto de text-sm (1.25rem). relaxed lo hace más espacioso. */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Software Engineering specialized in web development and APIs REST.
          </p>
        </div>

        {/* space-y-1 --> Aplica un margen vertical (margin-bottom) de 0.25rem (4px) entre cada botón. 
        Se aplica una animación de forma retardada a todo el bloque de botones
        both --> la animación sigue las reglas de forwards y backwards
        */}
        <div
          className="space-y-1"
          style={{ animation: "reveal 1s ease-out 0.2s both" }}
        >
          {navItems.map(({ id, label }, index) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              // w-full --> width: 100%
              // gap-3 --> 0.25rem * 3 = 0.75rerm = 12px
              // transition-colors --> hace que los cambios de color sean suaves y no bruscos
              className="relative flex w-9/12 items-center gap-3 py-3 text-left transition-colors"
              // Animación para que los botones aparezcan con una pequeña animación escalonada cuando se monta
              // el componente.
              style={{
                animation: `reveal 0.4s ease-out ${0.4 + index * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                if (activeSection !== id) {
                  const line = e.currentTarget.querySelector(".nav-line");
                  const text = e.currentTarget.querySelector(".nav-text");

                  if (line instanceof HTMLElement) {
                    line.style.width = "48px";
                    line.style.backgroundColor = "oklch(0.95 0.01 250)";
                  }

                  if (text instanceof HTMLElement) {
                    text.style.color = "oklch(0.95 0.01 250)";
                    text.style.transform = "translateX(4px)";
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== id) {
                  const line = e.currentTarget.querySelector(".nav-line");
                  const text = e.currentTarget.querySelector(".nav-text");

                  if (line instanceof HTMLElement) {
                    line.style.width = "32px";
                    line.style.backgroundColor = "oklch(0.65 0.01 250)";
                  }

                  if (text instanceof HTMLElement) {
                    text.style.color = "oklch(0.65 0.01 250)";
                    text.style.transform = "translateX(0)";
                  }
                }
              }}
            >
              {/* activeSection --> estado de React */}
              <div
                // h-px --> 1 pixel de altura
                // nav-line --> selector con clase
                className="nav-line h-px transition-all duration-500"
                style={{
                  width: activeSection === id ? "64px" : "32px",
                  backgroundColor:
                    activeSection === id
                      ? "oklch(0.95 0.01 250)"
                      : "oklch(0.65 0.01 250)",
                  boxShadow:
                    activeSection === id
                      ? "0 0 10px oklch(0.65 0.19 180 / 0.5)"
                      : "none",
                }}
              />
              <span
                // tracking-wider --> Espaciado de letras más amplio
                // nav-text --> selector con clases
                className="nav-text text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  color:
                    activeSection === id
                      ? "oklch(0.95 0.01 250)"
                      : "oklch(0.65 0.01 250)",
                  transform:
                    activeSection === id ? "translateX(4px)" : "translateX(0)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 
        Renderiza una fila de botones con iconos sociales.
        Cada botón usa un enlace externo o mailto, y se anima con escala y color al hacer hover.

        - `variant="ghost"`: botón sin fondo, solo icono visible.
        - `asChild`: el botón envuelve directamente el <a>, manteniendo semántica.
        - `hover:scale-110`: anima suavemente el botón al pasar el ratón.
        - Los enlaces externos abren en nueva pestaña con seguridad aplicada ("_blank").
      */}
      <div
        className="relative z-10 flex justify-center gap-4"
        // animación definida en app/globals.css
        style={{ animation: "reveal 1s ease-out 0.6s both" }}
      >
        {[
          { icon: SiGithub, href: "https://github.com/danielcaag17" },
          {
            icon: SiLinkedin,
            href: "https://www.linkedin.com/in/daniel-canizares-aguilar/",
          },
          { icon: Mail, href: "mailto:danielcanyizares@gmail.com" },
        ].map(({ icon: Icon, href }, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="h-7 w-14 transition-all duration-300 hover:scale-110 hover:text-primary"
            asChild
          >
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {/* No se puede aplicar un hover: al Icon pues Tailwind espera que ese 
              SVG detecte su propio estado :hover, 
              pero un SVG no tiene ese comportamiento por sí solo. Así que no cambia nada. */}
              <Icon className="h-5 w-5 text-white" />
            </a>
          </Button>
        ))}
      </div>
    </nav>
  );
}
