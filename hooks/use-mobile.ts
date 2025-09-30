// Importa React para usar useState y useEffect
import * as React from "react";

// Define el ancho máximo que se considera "móvil" (en píxeles)
const MOBILE_BREAKPOINT = 768;

/**
 * Hook personalizado que devuelve true si el dispositivo actual es móvil
 * (según el ancho de pantalla). Usa el ancho del viewport del navegador.
 */
export function useIsMobile() {
  // Estado local para saber si es móvil o no
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    // Media Query List: representa una regla CSS @media evaluada por JS
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Función que actualiza el estado según el tamaño actual del viewport
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Se agrega un listener para detectar cambios de tamaño
    mql.addEventListener("change", onChange);

    // Se establece el estado inicial al montar el componente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Limpieza del listener al desmontar el componente
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Devolvemos siempre un booleano (false por defecto si isMobile es undefined)
  return !!isMobile;
}
