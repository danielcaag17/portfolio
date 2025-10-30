"use client";

import type React from "react";

import { useState, useRef } from "react";
import { SiLinkedin } from "react-icons/si";
import { Send, Mail, MapPin, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useIsVisible } from "@/hooks/use-is-visible";
import { revealStyles } from "@/utils/revealStyles";
import { SectionTitle } from "@/components/section-title";

export function Contact() {
  // Estado que mantiene los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Estado para mantener el nombre del campo en el que se pone el foco
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Estado para saber si se ha copiado el email
  const [showMessage, setShowMessage] = useState(false);

  // Referencia al elemento <section> que representa el componente.
  // Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);

  // hook para saber cuando el componente esté visible en un 10%
  const isVisible = useIsVisible(sectionRef);

  // Controlar cuando se hace submit al formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
  };

  // Controlar a los cambios que hay en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Controlar cuando se copia el email
  const handleCopyClick = (email: string) => {
    // Asegurar que navigator.clipboard existe
    if (navigator.clipboard) {
      if (email) {
        navigator.clipboard
          .writeText(email)
          .then(() => {
            setShowMessage(true); // Mostrar el mensaje
            setTimeout(() => setShowMessage(false), 2000); // Ocultar después de 2 segundos
          })
          .catch((err) => {
            console.error("Hubo un error al copiar el correo: " + err);
          });
      }
    } else {
      // console.log("La función de copiar no está disponible en este navegador.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      {/* Bola desenfocada animada */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full 
          bg-primary/10 blur-2xl"
          style={{
            animation:
              "pulse-glow 4s ease-in-out infinite, morph 8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle
          h2Text={"<contact />"}
          h3Text={"Let's Work Together"}
          pText={
            "Have a project in mind or just want to chat? I'm always open to discussing new opportunities and collaborations."
          }
          isVisible={isVisible}
          revealDelays={{
            h2Delay: "0s",
            h3Delay: "0.2s",
            pDelay: "0.4s",
          }}
        />

        {/* Menú lateral con email, Phone y Location */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div
            className="space-y-6 lg:col-span-1"
            style={revealStyles(isVisible, "0.6s")}
          >
            {[
              {
                icon: Mail,
                title: "Email",
                content: "danielcanyizares@gmail.com",
                href: "mailto:danielcanyizares@gmail.com",
              },
              {
                icon: SiLinkedin,
                title: "LinkedIn",
                content: "in/daniel-canizares-aguilar",
                href: "https://www.linkedin.com/in/daniel-canizares-aguilar/",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "Barcelona,\nSpain",
                href: null,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="group border-border min-w-[260px] bg-card/50 p-6 transition-all duration-500 
                  ease-in-out hover:border-primary/50 hover:-translate-y-2"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px oklch(0.65 0.19 180 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 oklch(0.65 0.19 180 / 0)";
                  }}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center
                  rounded-lg bg-primary/10 text-primary transition-all duration-500 
                  group-hover:bg-primary group-hover:text-primary-foreground ${
                    index % 2 === 0
                      ? "group-hover:rotate-[-12deg]"
                      : "group-hover:rotate-12"
                  } 
                  group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 font-bold text-foreground">
                    {item.title}
                  </h4>
                  {item.href ? (
                    <div className="flex items-center space-x-2">
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.content}
                      </a>
                      {item.title === "Email" && (
                        <div className="relative">
                          <button
                            onClick={() => handleCopyClick(item.content)}
                            key={index}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                            h-7 w-7 transition-all duration-300"
                            aria-label="Copiar correo"
                          >
                            <Link className=" h-4 w-4 text-muted-foreground hover:text-primary" />
                          </button>

                          {/* Mensaje que aparece al copiar el correo */}
                          {showMessage && (
                            <span
                              className="absolute text-center whitespace-nowrap pointer-events-none 
                              bg-black text-xs rounded py-1 px-3 min-w-32 -right-16 bottom-10 opacity-90 
                              text-white"
                            >
                              Email copied!
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Formulario de contacto */}
          <Card
            className="ml-3 border-border bg-card/50 p-8 lg:col-span-2"
            style={revealStyles(isVisible, "0.8s")}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Daniel Canizares"
                      required
                      className="bg-background transition-all duration-300 mt-2.5"
                      style={{
                        boxShadow:
                          focusedField === "name"
                            ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                            : "none",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="daniel@example.com"
                    required
                    className="bg-background transition-all duration-300 mt-2.5"
                    style={{
                      boxShadow:
                        focusedField === "email"
                          ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                          : "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Project Inquiry"
                  required
                  className="bg-background transition-all duration-300 mt-2.5"
                  style={{
                    boxShadow:
                      focusedField === "subject"
                        ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                        : "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="resize-none bg-background transition-all duration-300 mt-2.5"
                  style={{
                    boxShadow:
                      focusedField === "message"
                        ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                        : "none",
                  }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="group relative w-full overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Send Message
                  <Send
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 
                  group-hover:-translate-y-1"
                  />
                </span>
                <span
                  className="absolute inset-0 opacity-0 transition-opacity 
                  group-hover:opacity-100 will-change-[opacity]"
                  style={{
                    background:
                      // Degradado en diagonal, se repite el primero al final para hacer un bucle suave
                      `linear-gradient(45deg, 
                    oklch(0.65 0.19 180), 
                    oklch(0.7 0.12 160), 
                    oklch(0.65 0.19 180))`,
                    backgroundSize: "200% 200%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              </Button>
            </form>
          </Card>
        </div>

        <footer className="mt-20 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Daniel Cañizares. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </section>
  );
}
