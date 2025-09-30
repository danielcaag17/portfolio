// clsx(): Combina clases condicionalmente.
// clsx("btn", isActive && "btn-active") // => "btn btn-active" si isActive = true
import { clsx, type ClassValue } from "clsx";

// tailwind-merge (twMerge): Elimina clases redundantes o conflictivas de Tailwind.
// twMerge("p-2 p-4") // => "p-4" (porque p-4 sobreescribe p-2)
import { twMerge } from "tailwind-merge";

// cn() Une clases condicionales y Elimina conflictos entre clases de Tailwind.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
  Ejemplo de uso:
    <div className={cn("p-2", isLarge && "p-6", "bg-white")}>

  Si isLarge es true, entonces el resultado será: 
    class="p-6 bg-white"
*/
