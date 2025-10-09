import React from "react";
import { revealStyles } from "@/utils/revealStyles";

type SectionTitleProps = {
  h2Text: string;
  h3Text: string;
  pText?: string;
  isVisible: boolean;
  revealDelays: { h2Delay: string; h3Delay: string; pDelay?: string };
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  h2Text,
  h3Text,
  pText,
  isVisible,
  revealDelays,
}) => {
  return (
    // Opacidada 0 por defecto, se revela con la animación
    // El componente padre debe tener position: relative para que los hijos con position: absolute se posicionen respecto a él
    <section>
      <h2
        className="mb-4 text-sm font-mono text-primary opacity-0"
        style={revealStyles(isVisible, revealDelays.h2Delay)}
      >
        {h2Text}
      </h2>
      <h3
        className="mb-6 text-4xl font-bold tracking-tight md:text-5xl opacity-0"
        style={revealStyles(isVisible, revealDelays.h3Delay)}
      >
        {h3Text}
      </h3>
      {pText && (
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty opacity-0"
          style={revealStyles(isVisible, revealDelays.pDelay)}
        >
          {pText}
        </p>
      )}
    </section>
  );
};
