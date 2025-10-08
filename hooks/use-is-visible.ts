"use client";

import { useEffect, useState, RefObject } from "react";

export function useIsVisible(ref: RefObject<HTMLElement>, threshold = 0.1) {
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
      { threshold }
    );

    // Si la referencia al <section> existe, se comienza a observarla
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}
