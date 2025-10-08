import { ReactNode } from "react";

export interface Experience {
  period: string;
  title: string;
  company: string;
  companyURL: string;
  description: ReactNode;
  technologies: string[];
}
