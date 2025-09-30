"use client"

import { Card } from "@/components/ui/card"
import { Code2, Palette, Database, Wrench, Rocket, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Development",
    skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5 & CSS3", "Responsive Design"],
  },
  {
    icon: Database,
    title: "Backend & Database",
    skills: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Prisma ORM"],
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    skills: ["Git & GitHub", "Docker", "AWS", "Vercel", "CI/CD", "Testing (Jest, Playwright)"],
  },
  {
    icon: Palette,
    title: "Design & UX",
    skills: ["Figma", "Design Systems", "Accessibility (WCAG)", "UI/UX Principles", "Prototyping", "User Research"],
  },
  {
    icon: Rocket,
    title: "Performance & Optimization",
    skills: ["Web Vitals", "SEO", "Code Splitting", "Lazy Loading", "Caching Strategies", "Bundle Optimization"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    skills: ["Team Collaboration", "Agile/Scrum", "Code Review", "Mentoring", "Technical Writing", "Problem Solving"],
  },
]

export function Skills() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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
    <section id="skills" ref={sectionRef} className="relative min-h-screen px-6 py-20 lg:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite, morph 15s ease-in-out infinite" }}
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
          {"<skills />"}
        </h2>
        <h3
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
          style={{
            animation: isVisible ? "reveal 0.8s ease-out 0.2s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          Technical Expertise
        </h3>
        <p
          className="mb-16 max-w-2xl text-lg text-muted-foreground text-pretty"
          style={{
            animation: isVisible ? "reveal 1s ease-out 0.4s both" : "none",
            opacity: isVisible ? 1 : 0,
          }}
        >
          A comprehensive toolkit built through years of hands-on experience and continuous learning in modern web
          development.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative border-border bg-card p-6 transition-all duration-500 hover:border-primary/50"
                style={{
                  animation: isVisible ? `reveal 0.6s ease-out ${0.6 + index * 0.1}s both` : "none",
                  opacity: isVisible ? 1 : 0,
                  transform:
                    hoveredCard === index
                      ? "translateY(-8px) rotateX(5deg) rotateY(-5deg)"
                      : "translateY(0) rotateX(0) rotateY(0)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, oklch(0.65 0.19 180 / 0.1), transparent 70%)",
                    opacity: hoveredCard === index ? 1 : 0,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground"
                      style={{
                        transform: hoveredCard === index ? "rotate(360deg) scale(1.1)" : "rotate(0deg) scale(1)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-foreground transition-colors group-hover:text-primary">
                      {category.title}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skill}
                        className="flex items-center text-sm text-muted-foreground transition-all"
                        style={{
                          animation: hoveredCard === index ? `reveal 0.3s ease-out ${skillIndex * 0.05}s both` : "none",
                          transform: hoveredCard === index ? "translateX(4px)" : "translateX(0)",
                        }}
                      >
                        <div
                          className="mr-2 h-1.5 w-1.5 rounded-full bg-primary transition-all"
                          style={{
                            transform: hoveredCard === index ? "scale(1.5)" : "scale(1)",
                          }}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
