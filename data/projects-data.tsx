import { Project } from "@/types/project";

// Las imágenes deben mantener el aspect ratio de 16:9 (mantener ancho y altura = 9*ancho/16)
export const projects: Project[] = [
  {
    title: "Trackr - Video Analysis Platform with Person Detection",
    description: (
        <>
        This project is part of a Bachelor's Thesis and consists of a platform{" "}
        developed with <strong>Django</strong> that allows users to{" "}
        <strong>upload videos via a web interface</strong> and receive them back{" "}
        with <strong>bounding boxes</strong> highlighting the detected people in{" "}
        each frame. Its modular architecture allows for future expansions to{" "}
        other detection types. It includes <strong>AWS S3</strong> cloud storage
        integration, and is divided into two Django apps: one for backend logic
        and another for the web interface.
        </>),
    image: "/trackr.png",
    technologies: [
      "Python",
      "Django",
      "HTML",
      "JavaScript",
      "CSS",
      "Amazon S3",
      "Render",
      "JSON",
      "SQL",
      "PostgreSQL",
    ],
    github: "https://github.com/danielcaag17/trackr-app",
    live: "",
  },
  {
    title: "Trackr API - Object Detection Microservice with FastAPI",
    description: (
      <>
        Microservice built with <strong>FastAPI</strong> that processes{" "}
        <strong>videos hosted on Amazon S3</strong> using own object detection{" "}
        models developed from the infrastrucutre of YOLO. The system generates
        an annotated version of the video with detected objects, which is
        reuploaded to S3. The API response includes both the original and
        processed video URLs, along with metadata about the detections (classes,
        counts, timestamps, etc.). It is part of a larger video analysis system
        focused on person detection.
      </>
    ),
    image: "/trackr-api.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "Amazon S3",
      "YOLO",
      "Ultralytics",
      "Render",
      "JSON",
    ],
    github: "https://github.com/danielcaag17/trackr-api",
    live: "",
  },
  {
    title: "Kbin Interface - Collaborative Frontend Inspired by Kbin",
    description: (
      <>
        This frontend was developed as part of a team project using{" "}
        <strong>Vue</strong>. Inspired by the Kbin platform, it connects to a
        Django-based backend. It was deployed on Heroku.
      </>
    ),
    image: "/kbin-interface.png",
    technologies: ["CSS", "HTML", "Vue.js", "JavaScript", "Heroku"],
    github: "https://github.com/danielcaag17/kbin-frontend",
    live: "",
  },
  {
    title: "Kbin Fullstack - Complete Web Project Inspired by Kbin",
    description: (
      <>
        Full web project (frontend + backend) inspired by the Kbin platform.{" "}
        Developed by team <strong>bravo13</strong>, it uses{" "}
        <strong>Django</strong> for the backend and web technologies like HTML,{" "}
        CSS, and JavaScript for the frontend. The application was deployed on{" "}
        Heroku and represents an integrated social or content aggregator{" "}
        solution.
      </>
    ),
    image: "/django-placeholder.png",
    technologies: ["CSS", "Python", "HTML", "Heroku", "Django", "JavaScript"],
    github: "https://github.com/danielcaag17/projecte_ASW",
    live: "",
  },
  {
    title: "Airmon - Backend for Monitoring in an Academic Environment",
    description: (
      <>
        This backend was developed for the <strong>Airmon</strong> project, part{" "}
        of the PES course (QP23-24). It uses <strong>Python 3.11.5</strong> and{" "}
        is intended to run on Linux environments (Ubuntu 22.04). The environment{" "}
        is managed using <code>venv</code> and <code>pip</code>. Although it is{" "}
        an academic project, its structure and setup make it easily extendable{" "}
        to production environments.
      </>
    ),
    image: "/django-placeholder.png",
    technologies: [
      "Python",
      "Django",
      "Amazon S3",
      "Amazon EC2",
      "SQL",
      "PostgreSQL",
    ],
    github: "https://github.com/danielcaag17/airmon-backend",
    live: "",
  },
];
