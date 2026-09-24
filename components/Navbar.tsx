"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "All Projects" },
  { href: "/#contact", label: "Contact" },
];

const nameCycle = ["पूजन श्रेष्ठ", "푸잔 슈레스타", "Pujan Shrestha"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [kathmanduTime, setKathmanduTime] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const formatTime = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

    setKathmanduTime(formatTime());
    const timer = setInterval(() => setKathmanduTime(formatTime()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = nameCycle[nameIndex];
    const typingSpeed = isDeleting ? 60 : 100;
    const pauseMs = 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayedName.length + 1);
        setDisplayedName(next);
        if (next === current) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        const next = current.slice(0, displayedName.length - 1);
        setDisplayedName(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setNameIndex((prev) => (prev + 1) % nameCycle.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedName, isDeleting, nameIndex]);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href === "/projects" && pathname === "/projects") return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-all duration-300">
            <span className="text-white font-extrabold text-base tracking-tight">PS</span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-slate-900 transition-colors duration-300 font-mono min-w-[4.5rem]">
            {displayedName}
            <span className="inline-block w-2 animate-pulse">|</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-black font-semibold bg-slate-100 border border-slate-200"
                  : "text-slate-600 hover:text-black hover:bg-slate-100/70"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
              <Clock size={14} className="text-slate-600" />
              <span>{kathmanduTime}</span>
              <span className="text-slate-400">NPT</span>
            </div>
            <a
              href="https://github.com/pujan-stha-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 hover:text-black hover:bg-slate-100 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/pujan-shrestha-656729285"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 hover:text-black hover:bg-slate-100 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={19} />
            </a>
            <a
              href="/Pujan Shrestha CV.pdf"
              download
              className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-black/10 hover:-translate-y-0.5"
            >
              <FileText size={15} />
              Resume
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-black hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-slate-200 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-2">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-slate-600" />
                {kathmanduTime}
              </span>
              <span className="text-slate-400">Kathmandu (NPT)</span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-slate-100 text-black font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 flex gap-3 mt-2">
              <a
                href="https://github.com/pujan-stha-hub"
                target="_blank"
                className="flex items-center gap-2 text-slate-600 hover:text-black px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm"
              >
                <GitHubIcon size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pujan-shrestha-656729285"
                target="_blank"
                className="flex items-center gap-2 text-slate-600 hover:text-black px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm"
              >
                <LinkedInIcon size={16} /> LinkedIn
              </a>
            </div>
            <a
              href="/Pujan Shrestha CV.pdf"
              download
              className="flex items-center justify-center gap-2 w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-lg font-semibold mt-2 transition-colors shadow-md"
            >
              <FileText size={15} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}