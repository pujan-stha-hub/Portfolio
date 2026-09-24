"use client";

import { GraduationCap, Cloud, Terminal, GitBranch, Monitor, Server, Code, Database } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: easeOut },
  }),
};

const skillCategories = [
  {
    icon: Terminal,
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
  {
    icon: Code,
    title: "Frontend",
    skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "MySQL"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
  {
    icon: GitBranch,
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
  {
    icon: Cloud,
    title: "Deployment",
    skills: ["Vercel"],
    color: "from-slate-100 to-slate-50",
    iconColor: "text-slate-800",
  },
];

const stats = [
  { value: "4+", label: "Projects Completed" },
  { value: "10+", label: "Technologies" },
  { value: "Full Stack", label: "Core Focus" },
  { value: "2026", label: "Graduate" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-slate-50/70 border-y border-slate-200/60 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold tracking-widest uppercase mb-4 shadow-xs">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Engineering Modern{" "}
            <span className="text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-8">
              Full Stack Solutions
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From intuitive, responsive user interfaces to robust backend architectures and scalable cloud services.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 shadow-xs"
            >
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bio + Education */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Bio */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                <Code size={20} className="text-slate-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">About Me</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              I&apos;m a passionate{" "}
              <span className="text-slate-900 font-semibold">Full Stack Developer</span> and{" "}
              <span className="text-slate-900 font-semibold">Software Engineer</span> based in
              Kathmandu, Nepal. I specialize in designing and engineering scalable, modern web
              applications, combining intuitive user experiences with high-performance backends.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              With hands-on experience across the entire development lifecycle—from responsive frontend
              frameworks and API design to database optimization and cloud deployment—I turn complex
              ideas into elegant, production-ready digital products.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Full Stack Architecture", "Modern Web Apps", "API & Database Design", "Clean Code"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                <GraduationCap size={20} className="text-slate-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Education</h3>
            </div>
            <div className="space-y-6">
              <div className="relative pl-5 border-l-2 border-slate-300 hover:border-slate-800 transition-colors group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-slate-900 rounded-full group-hover:scale-125 transition-transform" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 text-sm">BSc. CSIT</h4>
                  <span className="text-xs text-slate-800 font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium">2022–2026</span>
                </div>
                <p className="text-slate-600 text-sm">Kathmandu BernHardt College</p>
                <p className="text-slate-500 text-xs mt-1">Software Engineering · Web Development </p>
              </div>
              <div className="relative pl-5 border-l-2 border-slate-200 hover:border-slate-400 transition-colors group">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-slate-400 rounded-full group-hover:scale-125 transition-transform" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 text-sm">NEB (10+2) Science</h4>
                  <span className="text-xs text-slate-600 font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium">2020–2022</span>
                </div>
                <p className="text-slate-600 text-sm">Uniglobe College</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Technical Skills</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-default shadow-xs"
            >
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${cat.color} border border-slate-200 mb-4`}>
                <cat.icon size={20} className={cat.iconColor} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">{cat.title}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium hover:border-slate-400 hover:text-black hover:bg-slate-100 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}