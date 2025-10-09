import { Badge } from "@/components/ui/badge";
import React from "react";

type MyBadgeProps = {
  tech: string; // Texto de la tecnología
  techIndex: number; // Índice de la tecnología para la animación
  hoveredIndex: number | null; // El índice que se pasa cuando hay hover
  index: number; // Índice actual del proyecto
};

export const MyBadge: React.FC<MyBadgeProps> = ({
  tech,
  techIndex,
  hoveredIndex,
  index,
}) => {
  return (
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
  );
};

