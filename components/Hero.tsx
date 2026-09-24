"use client";

import { ArrowDown, MapPin, GraduationCap, Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Poppins, IBM_Plex_Mono, Sora } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

function Particle({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-tr from-slate-400/20 to-slate-200/40"
      style={{ width: size, height: size, left, top }}
      animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ delay, duration: 5 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function TypingText({ text, delay = 0, speed = 45 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [complete, setComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          timerRef.current = setTimeout(type, speed);
        } else {
          setComplete(true);
        }
      };
      type();
    }, delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, delay, speed]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 550);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className="font-[family-name:var(--font-mono)]">
      {displayed}
      {!complete && (
        <span className={`inline-block w-px h-5 ml-1 align-middle bg-black transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
      )}
    </span>
  );
}

function ToolsTicker() {
  const tools = [
    "Python", "JavaScript", "TypeScript", "React.js", "Next.js",
    "Node.js", "Express.js", "Tailwind CSS", "HTML", "CSS",
    "PostgreSQL", "MySQL", "Git", "GitHub", "VS Code", "Vercel"
  ];
  const duplicated = [...tools, ...tools];

  return (
    <div className="relative w-full h-11 overflow-hidden bg-slate-50 border border-slate-200/80 rounded-xl">
      <div className="absolute inset-y-0 left-0 flex items-center animate-scroll whitespace-nowrap">
        {duplicated.map((tool, i) => (
          <div
            key={`${tool}-${i}`}
            className="flex items-center gap-2 px-4 py-1.5 mx-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-xs"
          >
            {tool}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 700], [0, 60]);
  const opacityBg = useTransform(scrollY, [0, 400], [1, 0.8]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-white ${poppins.variable} ${ibmMono.variable} ${sora.variable}`}
    >
      {/* Background Layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yBg, opacity: opacityBg }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/70 via-white to-white" />

        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-slate-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-slate-100/60 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {mounted && (
          <>
            <Particle delay={0} size={5} left="45%" top="20%" />
            <Particle delay={1.5} size={3} left="60%" top="80%" />
            <Particle delay={3} size={4} left="30%" top="50%" />
            <Particle delay={2} size={3} left="72%" top="35%" />
          </>
        )}

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-20">

        {/* ─── LEFT: Text Content ───────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-8 order-last lg:order-first"
        >
          {/* Status Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-widest uppercase shadow-xs">
              <motion.span className="w-2 h-2 bg-emerald-500 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Full Stack Developer
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold tracking-widest uppercase shadow-xs">
              <Sparkles size={12} className="text-amber-500" />
              Building Scalable Web Apps
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-none font-[family-name:var(--font-poppins)]"
            >
              Pujan
              <br />
              Shrestha
            </motion.h1>
            <motion.div variants={fadeUp}>
              <p className="text-xl sm:text-2xl text-slate-700 font-semibold font-[family-name:var(--font-sora)]">
                <TypingText text="Full Stack Developer" delay={600} speed={50} />
              </p>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-sora)]">
            Passionate and results-driven <span className="font-semibold text-slate-900">Full Stack Developer</span> with hands-on experience in crafting modern web applications, scalable backend systems, and responsive user interfaces. Dedicated to writing clean, maintainable code and delivering performant end-to-end digital experiences.
          </motion.p>

          {/* Tools Ticker */}
          <motion.div variants={fadeUp}>
            <ToolsTicker />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-semibold transition-all shadow-md shadow-black/10"
            >
              View My Projects
              <ExternalLink size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, borderColor: "rgba(0, 0, 0, 0.6)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-7 py-3.5 rounded-xl border border-slate-300 text-slate-800 hover:text-black font-semibold transition-all hover:bg-slate-100 hover:border-slate-400"
            >
              Let's Connect
            </motion.a>
          </motion.div>

          {/* Location & Education */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-4 border-t border-slate-200">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-400" />
              Kathmandu, Nepal
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={14} className="text-slate-400" />
              BSc. CSIT • 2022–2026
            </span>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Image Content ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-slate-200/80 via-slate-100 to-transparent opacity-80 blur-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/80 ring-1 ring-slate-200"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/pfp.png"
                alt="Pujan Shrestha"
                width={384}
                height={384}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/5 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-800 font-medium">Available for Work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-3 group">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border border-slate-300 flex items-start justify-center pt-2 group-hover:border-slate-500 transition-colors"
          >
            <ArrowDown size={12} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
          </motion.div>
        </a>
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: fit-content;
          display: flex;
          align-items: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}