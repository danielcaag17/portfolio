"use client"

import { ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with modern web technologies for optimal performance.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features. Supports multiple workspaces and custom workflows.",
    image: "/task-management-kanban.png",
    technologies: ["React", "Firebase", "TypeScript", "DnD Kit"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content generation tool that helps marketers and writers create engaging content. Features include tone adjustment, SEO optimization, and multi-language support.",
    image: "/ai-writing-assistant-interface.png",
    technologies: ["Next.js", "OpenAI", "Vercel AI SDK", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Design System Library",
    description:
      "Comprehensive design system and component library used across multiple products. Includes 50+ accessible components, documentation site, and Figma integration.",
    image: "/design-system-component-library.png",
    technologies: ["React", "Storybook", "Radix UI", "CSS Variables"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

export function Projects() {
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
    <section id="projects" ref={sectionRef} className="relative min-h-screen px-6 py-20 lg:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.19 180 / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, oklch(0.65 0.19 180 / 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "reveal 1s ease-out",
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
          {"<projects />"}
        </h2>
        <h3
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Featured Work
        </h3>
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty"
          style={{
            animation: isVisible ? "reveal 1s ease-out 0.4s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          A selection of projects that showcase my expertise in building modern web applications with focus on user
          experience and performance.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden border-border bg-card transition-all duration-500 hover:border-primary/50"
              style={{
                animation: isVisible ? `reveal 0.6s ease-out ${0.6 + index * 0.1}s both` : "none",
                opacity: isVisible ? 1 : 0,
                transform: hoveredIndex === index ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 20px 40px oklch(0.65 0.19 180 / 0.2), 0 0 60px oklch(0.65 0.19 180 / 0.1)"
                    : "none",
              }}
            >
              <div
                className="pointer-events-none absolute -inset-[1px] rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(45deg, oklch(0.65 0.19 180), oklch(0.7 0.12 160), oklch(0.65 0.19 180))",
                  backgroundSize: "200% 200%",
                  animation: hoveredIndex === index ? "shimmer 3s linear infinite" : "none",
                  zIndex: -1,
                }}
              />

              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  style={{
                    filter: hoveredIndex === index ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <h4 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h4>
                <p className="mb-4 leading-relaxed text-muted-foreground text-pretty">{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary/50 text-xs transition-all hover:bg-primary/20 hover:text-primary"
                      style={{
                        animation: hoveredIndex === index ? `reveal 0.3s ease-out ${techIndex * 0.05}s both` : "none",
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group/btn bg-transparent transition-all hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="group/btn relative overflow-hidden" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
