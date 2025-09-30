"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }
    }

    const hero = heroRef.current
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove)
      return () => hero.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite, morph 10s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          style={{ animation: "float 10s ease-in-out infinite reverse, morph 12s ease-in-out infinite" }}
        />

        <div
          ref={cursorRef}
          className="absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 pointer-events-none"
          style={{ opacity: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="mb-6 inline-block overflow-hidden">
          <span className="inline-block text-sm font-mono text-primary" style={{ animation: "reveal 0.6s ease-out" }}>
            {"<hello world />"}
          </span>
        </div>

        <h1
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl"
          style={{ animation: "reveal 0.8s ease-out 0.2s both" }}
        >
          I'm a developer passionate about{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">crafting accessible</span>
            <span
              className="absolute inset-0 -z-10 bg-primary/20 blur-xl"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            />
          </span>
          , pixel-perfect user interfaces
        </h1>

        <p
          className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
          style={{ animation: "reveal 1s ease-out 0.4s both" }}
        >
          I blend thoughtful design with robust engineering to create digital experiences that not only look great but
          are meticulously built for performance and usability. Currently specializing in modern web technologies and
          design systems.
        </p>

        <div className="flex flex-wrap gap-4" style={{ animation: "reveal 1.2s ease-out 0.6s both" }}>
          <Button size="lg" className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden border-primary/30 hover:border-primary bg-transparent"
          >
            <span className="relative z-10">Download Resume</span>
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 text-sm" style={{ animation: "reveal 1.4s ease-out 0.8s both" }}>
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "20+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default transition-transform hover:scale-110">
              <div className="text-3xl font-bold text-primary transition-all group-hover:text-4xl">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
