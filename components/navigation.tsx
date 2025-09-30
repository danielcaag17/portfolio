"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "hero", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-screen w-80 flex-col justify-between border-r border-border bg-sidebar p-12 lg:flex">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.65 0.19 180 / 0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-16" style={{ animation: "reveal 0.8s ease-out" }}>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">Your Name</h1>
          <p className="text-lg text-muted-foreground">Software Developer</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </div>

        <div className="space-y-1" style={{ animation: "reveal 1s ease-out 0.2s both" }}>
          {navItems.map(({ id, label }, index) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative flex w-full items-center gap-3 py-3 text-left transition-colors"
              style={{
                animation: `reveal 0.4s ease-out ${0.4 + index * 0.1}s both`,
              }}
            >
              <div
                className="h-px transition-all duration-500"
                style={{
                  width: activeSection === id ? "64px" : "32px",
                  backgroundColor: activeSection === id ? "oklch(0.95 0.01 250)" : "oklch(0.65 0.01 250)",
                  boxShadow: activeSection === id ? "0 0 10px oklch(0.65 0.19 180 / 0.5)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) {
                    e.currentTarget.style.width = "48px"
                    e.currentTarget.style.backgroundColor = "oklch(0.95 0.01 250)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) {
                    e.currentTarget.style.width = "32px"
                    e.currentTarget.style.backgroundColor = "oklch(0.65 0.01 250)"
                  }
                }}
              />
              <span
                className="text-xs font-medium tracking-wider transition-all duration-300"
                style={{
                  color: activeSection === id ? "oklch(0.95 0.01 250)" : "oklch(0.65 0.01 250)",
                  transform: activeSection === id ? "translateX(4px)" : "translateX(0)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex gap-4" style={{ animation: "reveal 1s ease-out 0.6s both" }}>
        {[
          { icon: Github, href: "https://github.com" },
          { icon: Linkedin, href: "https://linkedin.com" },
          { icon: Twitter, href: "https://twitter.com" },
          { icon: Mail, href: "mailto:hello@example.com" },
        ].map(({ icon: Icon, href }, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="h-9 w-9 transition-all duration-300 hover:scale-110 hover:text-primary"
            asChild
          >
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className="h-5 w-5" />
            </a>
          </Button>
        ))}
      </div>
    </nav>
  )
}
