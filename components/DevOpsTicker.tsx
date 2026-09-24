"use client";

import { motion } from "framer-motion";
import { Poppins, IBM_Plex_Mono } from "next/font/google";

// Professional typography choices
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function DevOpsTicker() {
  const tools = [
    { name: "React", color: "from-slate-700 to-slate-900" },
    { name: "Next.js", color: "from-slate-700 to-slate-900" },
    { name: "TypeScript", color: "from-slate-700 to-slate-900" },
    { name: "Node.js", color: "from-slate-700 to-slate-900" },
    { name: "Express", color: "from-slate-700 to-slate-900" },
    { name: "PostgreSQL", color: "from-slate-700 to-slate-900" },
    { name: "MongoDB", color: "from-slate-700 to-slate-900" },
    { name: "Tailwind CSS", color: "from-slate-700 to-slate-900" },
    { name: "Docker", color: "from-slate-700 to-slate-900" },
    { name: "Git", color: "from-slate-700 to-slate-900" },
  ];

  // Create a longer continuous loop
  const tickerItems = [...tools, ...tools, ...tools];

  return (
    <div className={`relative w-full overflow-hidden bg-slate-50/80 py-6 border-y border-slate-200 ${poppins.variable} ${ibmMono.variable}`}>
      {/* Gradient overlay edges for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <motion.div
        className="flex gap-12"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tickerItems.map((tool, index) => (
          <motion.div
            key={`${tool.name}-${index}`}
            className="flex items-center gap-3 px-8 py-2 whitespace-nowrap flex-shrink-0 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Color dot indicator */}
            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${tool.color} shadow-xs`} />
            
            {/* Tool name */}
            <span className="font-medium tracking-wide text-slate-700 group-hover:text-black transition-colors duration-200 font-[family-name:var(--font-poppins)]">
              {tool.name}
            </span>

            {/* Subtle separator dot */}
            <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors" />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}