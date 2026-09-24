
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects — Pujan Shrestha | Full Stack Developer",
  description:
    "Explore full stack web applications and software engineering projects by Pujan Shrestha — React, Next.js, Node.js, TypeScript, REST APIs, databases, and modern web solutions.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  );
}