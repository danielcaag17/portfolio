"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    period: "2024 — PRESENT",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    description:
      "Lead frontend development for enterprise SaaS platform. Architected and implemented design system used across 15+ products. Mentored junior developers and established best practices for accessibility and performance.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    period: "2022 — 2024",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    description:
      "Built and maintained customer-facing web applications serving 100K+ users. Implemented real-time features using WebSockets and optimized database queries reducing load times by 60%.",
    technologies: ["Node.js", "PostgreSQL", "React", "AWS"],
  },
  {
    period: "2020 — 2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Developed responsive websites and web applications for diverse clients. Collaborated with designers to transform Figma designs into pixel-perfect implementations.",
    technologies: ["JavaScript", "Vue.js", "SCSS", "Figma"],
  },
]

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative min-h-screen px-6 py-20 lg:px-20">
      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:left-80 lg:block" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <h2
          className="mb-4 text-sm font-mono text-primary"
          style={{
            animation: isVisible ? "reveal 0.6s ease-out" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {"<experience />"}
        </h2>
        <h3
          className="mb-16 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Professional Journey
        </h3>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden border-border bg-card p-8 transition-all duration-500 hover:border-primary/50"
              style={{
                animation: isVisible ? `reveal 0.6s ease-out ${0.6 + index * 0.2}s both` : "none",
                opacity: isVisible ? 1 : 0,
                transform: hoveredIndex === index ? "translateX(12px)" : "translateX(0)",
                boxShadow: hoveredIndex === index ? "0 10px 40px oklch(0.65 0.19 180 / 0.15)" : "none",
              }}
            >
              <div
                className="absolute left-0 top-0 w-1 bg-primary transition-all duration-500"
                style={{
                  height: hoveredIndex === index ? "100%" : "0%",
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div
                className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div
                      className="mb-2 text-xs font-mono text-muted-foreground transition-colors"
                      style={{
                        color: hoveredIndex === index ? "oklch(0.65 0.19 180)" : undefined,
                      }}
                    >
                      {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {exp.title}
                    </h4>
                    <div className="text-primary">{exp.company}</div>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary/50 text-xs transition-all hover:bg-primary/20 hover:text-primary"
                      style={{
                        animation: hoveredIndex === index ? `reveal 0.3s ease-out ${techIndex * 0.05}s both` : "none",
                        transform: hoveredIndex === index ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
