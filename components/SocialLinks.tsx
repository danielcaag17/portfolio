import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  delay?: number;
}

export function SocialLinks({ delay = 0.6 }: SocialLinksProps) {
  const links = [
    { icon: SiGithub, href: "https://github.com/danielcaag17" },
    {
      icon: SiLinkedin,
      href: "https://www.linkedin.com/in/daniel-canizares-aguilar/",
    },
    { icon: Mail, href: "mailto:danielcanyizares@gmail.com" },
    { icon: SiX, href: "https://x.com/Danielcaag" },
  ];

  return (
    <div
      className="relative z-10 flex justify-center gap-4"
      // animación definida en app/globals.css
      style={{ animation: `reveal 1s ease-out ${delay}s both` }}
    >
      {links.map(({ icon: Icon, href }, index) => (
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
  );
}
