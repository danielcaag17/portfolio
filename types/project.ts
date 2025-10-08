import { ReactNode } from "react";

export interface Project {
  title: string;
  description: ReactNode;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
}
