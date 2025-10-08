import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { Experience } from "@/components/experience";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-80">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
