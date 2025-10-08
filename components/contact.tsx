"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useIsVisible } from "@/hooks/use-is-visible";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Referencia al elemento <section> que representa el componente. Se usa para observar su visibilidad en pantalla
  const sectionRef = useRef<HTMLElement>(null);
  // hook para saber cuando este componente esté visible en un 10%
  const isVisible = useIsVisible(sectionRef);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-20 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          style={{
            animation:
              "pulse-glow 4s ease-in-out infinite, morph 8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          className="mb-4 text-sm font-mono text-primary"
          style={{
            animation: isVisible ? "reveal 0.6s ease-out" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {"<contact />"}
        </h2>
        <h3
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Let's Work Together
        </h3>
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty"
          style={{
            animation: isVisible ? "reveal 1s ease-out 0.4s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Have a project in mind or just want to chat? I'm always open to
          discussing new opportunities and collaborations.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div
            className="space-y-6 lg:col-span-1"
            style={{
              animation: isVisible ? "reveal 1.2s ease-out 0.6s both" : "none",
              opacity: isVisible ? 1 : 0,
            }}
          >
            {[
              {
                icon: Mail,
                title: "Email",
                content: "hello@example.com",
                href: "mailto:hello@example.com",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (234) 567-890",
                href: "tel:+1234567890",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "San Francisco, CA\nUnited States",
                href: null,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="group border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:-translate-y-2"
                  style={{
                    boxShadow: "0 0 0 oklch(0.65 0.19 180 / 0)",
                    transition: "all 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px oklch(0.65 0.19 180 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 oklch(0.65 0.19 180 / 0)";
                  }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 font-bold text-foreground">
                    {item.title}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          <Card
            className="border-border bg-card p-8 lg:col-span-2"
            style={{
              animation: isVisible ? "reveal 1.2s ease-out 0.8s both" : "none",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
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
                      placeholder="John Doe"
                      required
                      className="bg-background transition-all duration-300"
                      style={{
                        boxShadow:
                          focusedField === "name"
                            ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                            : "none",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
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
                    placeholder="john@example.com"
                    required
                    className="bg-background transition-all duration-300"
                    style={{
                      boxShadow:
                        focusedField === "email"
                          ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                          : "none",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
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
                  className="bg-background transition-all duration-300"
                  style={{
                    boxShadow:
                      focusedField === "subject"
                        ? "0 0 0 2px oklch(0.65 0.19 180 / 0.3)"
                        : "none",
                  }}
                />
              </div>

              <div className="space-y-2">
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
                  className="resize-none bg-background transition-all duration-300"
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
                className="group relative w-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Send Message
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <span
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ animation: "shimmer 2s linear infinite" }}
                />
              </Button>
            </form>
          </Card>
        </div>

        <footer className="mt-20 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Your Name. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </section>
  );
}
