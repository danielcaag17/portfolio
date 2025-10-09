import React from "react";
import { Card } from "@/components/ui/card";

// Componente añadido para dar semántica a las cards, envolviéndolas en un <article>
interface CardWrapperProps {
  as?: keyof JSX.IntrinsicElements; // Controla el tipo de elemento (por ejemplo, "article", "div")
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties; // Para estilos adicionales como la animación
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  key?: React.Key; // Si usas key en el componente
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  as: Component = "article", // Default es "article"
  className,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  key,
}) => {
  return (
    <Component>
      <Card
        key={key}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Card>
    </Component>
  );
};
