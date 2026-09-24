// components/Projects.tsx — Home section preview (dark theme + Framer Motion)
'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Folder, ChevronRight, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Link from 'next/link';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: number;
  gradient: string;
  images?: string[];
}

type CategoryFilter = 'all' | string;

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Kubernetes Cluster Implementation',
    description: 'Deployed and managed containerized applications using core K8s components (Pods, Deployments, Services).',
    longDescription: 'Wrote practical YAML configurations to demonstrate scaling, self-healing, and rolling updates. Showcased production‑grade patterns for service discovery and ingress routing using NGINX Ingress Controller.',
    tags: ['Kubernetes', 'Docker', 'YAML', 'Linux'],
    category: 'Containerization Orchestration',
    githubUrl: 'https://github.com/MySagarGitHub/kubernetes-1st.git',
    featured: true,
    year: 2025,
    gradient: 'from-slate-100 to-slate-50',
    images: ['ansible-1.jpg', '/projects/1/shot-2.jpg', '/projects/1/shot-3.jpg', '/projects/1/shot-4.jpg'],
  },
  {
    id: '2',
    title: 'Automation Pipeline with Ansible',
    description: 'Automated multi-environment infrastructure deployment using Terraform, Python, and Ansible. Provisions servers, generates dynamic inventory, and configures systems using a single Bash script.',
    longDescription: 'Built an automated pipeline that that Spins up 6 cloud servers (Dev, Stage, Prod), Generates server IPs automatically using Terraform outputs, Dynamically creates Ansible inventory using Python Configures all servers in one go with Ansible, Deploys everything using a single Bash script.',
    tags: ['Ansible', 'Terraform', 'Python', 'Bash'],
    category: 'Infrastructure Automation',
    githubUrl: 'https://github.com/MySagarGitHub/Automation-pipeline.git',
    featured: true,
    year: 2026,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '3',
    title: 'CI/CD Pipeline — Jenkins + GitHub + AWS EC2',
    description: 'Built an end-to-end CI/CD pipeline triggered by GitHub webhooks on an Ubuntu EC2 instance.',
    longDescription: 'Automated build, test, and deployment using Docker containers. Integrated Slack notifications and rollback mechanisms to reduce manual intervention.',
    tags: ['Jenkins', 'GitHub Actions', 'AWS EC2', 'Docker', 'Bash'],
    category: 'CI/CD',
    githubUrl: 'https://github.com/MySagarGitHub/CI-Cd-pipeline-using-Jenkins-Github-weebhook-ububtu-Aws-Ec2-Docker.git',
    featured: true,
    year: 2026,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '4',
    title: 'AWS ECS Container Orchestration',
    description: 'Deployed a Docker container using AWS ECS with task definitions, services, and application load balancing.',
    longDescription: 'Configured health checks, auto-scaling policies, and CloudWatch alarms to ensure high availability and zero-downtime deployments.',
    tags: ['AWS ECS', 'Docker', 'ALB', 'CloudWatch'],
    category: 'Cloud',
    githubUrl: 'https://github.com/MySagarGitHub/AWS-ECS.git',
    featured: true,
    year: 2025,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '5',
    title: 'Terraform Infrastructure as Code',
    description: 'Created production-ready infrastructure modules using HCL.',
    longDescription: 'Provisioned AWS resources (EC2, S3, RDS) with reusable, version-controlled Terraform scripts. Enforced best practices via terraform fmt, validate, and state locking with S3 backend.',
    tags: ['Terraform', 'AWS', 'HCL', 'Git'],
    category: 'IaC',
    githubUrl: 'https://github.com/MySagarGitHub/Terraform.git',
    featured: true,
    year: 2024,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '6',
    title: 'CI/CD Auto-Deploy to Vercel',
    description: 'Automated deployment pipeline from GitHub to Vercel with preview deployments for every pull request.',
    longDescription: 'Enabled seamless frontend updates with zero-downtime deployments. Configured preview deployments for every pull request.',
    tags: ['Vercel', 'GitHub Actions', 'Next.js', 'CI/CD'],
    category: 'Automation',
    liveUrl: 'offline',
    githubUrl: 'https://github.com/MySagarGitHub/CI-CD-Pipeline-Auto-Deploy-Vercel.git',
    year: 2025,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '7',
    title: 'Serverless REST API with AWS Lambda & DynamoDB',
    description: 'Built and deployed a fully serverless REST API for managing posts using AWS Lambda, API Gateway, and DynamoDB.',
    longDescription: 'Developed a complete CRUD REST API using the Serverless Framework, with AWS Lambda handling business logic, API Gateway managing HTTP routing, and DynamoDB as the NoSQL database. Configured IAM roles, environment variables, and CORS to ensure secure and accessible endpoints.',
    tags: ['AWS', 'Lambda', 'DynamoDB', 'Serverless', 'Node.js', 'API Gateway'],
    category: 'Cloud',
    githubUrl: 'https://github.com/MySagarGitHub/REST-API.git',
    year: 2026,
    featured: true,
    gradient: 'from-slate-100 to-slate-50',
  },
  {
    id: '8', 
    title: 'DevSecOps CI/CD Pipeline for Express & React App',
    description: 'Engineered a comprehensive DevSecOps pipeline on Windows Jenkins, integrating automated security scanning (SAST, DAST, Secrets) and Docker deployment.',
    longDescription: 'Designed and implemented a robust CI/CD pipeline using Jenkins Declarative Pipeline for a full-stack Express.js and React application. The pipeline enforces security at every stage: secret detection with Gitleaks, dependency auditing, static code analysis with Semgrep, and container vulnerability scanning with Trivy. It automates the build process using multi-stage Dockerfiles, pushes images to Docker Hub, and handles zero-downtime deployment with automatic health checks and rollback capabilities on a Windows infrastructure.',
    tags: ['Jenkins', 'Docker', 'DevSecOps', 'Trivy', 'Semgrep', 'Gitleaks', 'CI/CD', 'Windows', 'Express.js', 'React'],
    category: 'DevOps',
    githubUrl: 'https://github.com/MySagarGitHub/Practice-project.git',
    year: 2026,
    featured: true,
    gradient: 'from-slate-100 to-slate-50',
  },
];

const allCategories: CategoryFilter[] = ['all', ...Array.from(new Set(projectsData.map((p) => p.category)))];

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: easeOut },
  }),
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      layout
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-500 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer shadow-xs"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="h-1 w-full bg-slate-200 group-hover:bg-slate-900 transition-colors" />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {project.featured && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
                ★ Featured
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono">
              {project.year}
            </span>
          </div>
          <ChevronRight
            size={16}
            className={`mt-0.5 shrink-0 text-slate-400 transition-transform duration-300 ${expanded ? 'rotate-90 text-black' : 'group-hover:translate-x-0.5 group-hover:text-black'}`}
          />
        </div>

        <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug group-hover:text-black transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <AnimatePresence>
          {expanded && project.longDescription && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-slate-700 leading-relaxed mb-4"
            >
              {project.longDescription}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium group-hover:border-slate-300 group-hover:text-slate-800 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex gap-3 mt-5 pt-4 border-t border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-black hover:underline transition-all"
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-black transition-colors"
                >
                  <GithubIcon size={13} /> Source Code
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}



function FilterTabs({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {categories.map((cat, index) => (
        <button
          key={`filter-${cat}-${index}`}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-300 ${
            active === cat
              ? 'bg-black text-white shadow-sm shadow-black/10'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-black hover:bg-slate-50'
          }`}
        >
          {cat === 'all' ? 'All Projects' : cat}
        </button>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    let result = projectsData;
    if (activeFilter !== 'all') result = result.filter((p) => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-100/80 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-100/60 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured{' '}
            <span className="text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-8">
              Full Stack Projects
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Interactive web applications, scalable REST & GraphQL APIs, modern frontends, and end-to-end full stack architecture.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or technologies…"
              className="w-full rounded-full border border-slate-300 bg-slate-50/50 px-5 py-3 pl-11 text-sm text-slate-900 placeholder-slate-400 transition-all duration-300 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <FilterTabs categories={allCategories} active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {filteredProjects.length > 0 && (
          <p className="text-center text-xs text-slate-500 mb-8">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {activeFilter !== 'all' && (
              <span className="text-slate-500">
                {' '}
                in <span className="text-slate-700 font-medium capitalize">{activeFilter}</span>
              </span>
            )}
          </p>
        )}

        {filteredProjects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Folder size={40} className="mb-4 text-slate-300" />
            <p className="text-slate-500 text-sm">
              No projects found for <span className="text-slate-700 capitalize">{activeFilter}</span>
            </p>
          </div>
        )}

        <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-800 hover:text-black hover:border-slate-900 hover:bg-slate-100 transition-all duration-300 text-sm font-semibold group shadow-xs"
          >
            View All Projects
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}