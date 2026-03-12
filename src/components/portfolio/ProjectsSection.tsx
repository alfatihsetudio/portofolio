'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';
import { ExternalLink, ArrowRight, MoveRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  technologies: string[];
}

interface ProjectsSectionProps {
  data: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="group relative h-full focus:outline-none"
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/[0.06] flex flex-col h-full">
        {/* Image placeholder / gradient */}
        <div className="relative aspect-[4/5] overflow-hidden shrink-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${
              index % 3 === 0
                ? 'from-blue-500/20 via-blue-600/10 to-purple-500/20'
                : index % 3 === 1
                ? 'from-purple-500/20 via-pink-500/10 to-rose-500/20'
                : 'from-cyan-500/20 via-teal-500/10 to-emerald-500/20'
            } group-hover:scale-105 transition-transform duration-700`}>
              {/* Geometric pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-2xl border border-white/10 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700`} />
                <div className={`absolute w-10 h-10 rounded-xl border border-white/5 -rotate-12 group-hover:rotate-[78deg] transition-transform duration-700`} />
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[9px] font-medium text-white/90 tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          {/* Link icon */}
          {project.link && (
            <div className="absolute top-3 right-3 z-10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-1.5 focus:outline-none"
              >
                <ExternalLink className="text-white/90 w-full h-full" />
              </a>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-white mb-1.5 tracking-tight line-clamp-2 pr-2">
            {project.title}
          </h3>
          <p className="text-xs text-white/40 font-light leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.technologies.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/40 font-medium whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/40 font-medium">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (carouselRef.current) {
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Natural scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="projects" className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto">
        {/* Section Label */}
        <AnimatedText className="mb-4">
          <span className="text-xs font-medium text-purple-400 tracking-[0.3em] uppercase">
            Projects
          </span>
        </AnimatedText>

        {/* Section Title */}
        <AnimatedText delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Selected
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              works.
            </span>
          </h2>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <p className="text-base text-white/40 font-light mb-12 max-w-xl">
            A curated collection of projects that showcase my skills and passion.
          </p>
        </AnimatedText>

        <div 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 sm:gap-6 overflow-x-auto pb-8 pt-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:h-1.5 md:[&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-white/10 md:[&::-webkit-scrollbar-thumb]:rounded-full [-ms-overflow-style:none] [scrollbar-width:none] md:[scrollbar-width:thin] md:[scrollbar-color:rgba(255,255,255,0.1)_transparent] ${
            isDragging 
              ? 'cursor-grabbing select-none' 
              : 'cursor-grab scroll-smooth'
          }`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {data.slice(0, 3).map((project, index) => (
            <div key={project.id} className={`shrink-0 w-[calc(50vw-32px)] md:w-[320px] flex h-[auto] min-h-[300px] ${isDragging ? 'pointer-events-none' : ''}`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          
          {/* View More Card */}
          {data.length > 0 && (
            <div className={`shrink-0 w-[calc(50vw-32px)] md:w-[320px] flex h-[auto] min-h-[300px] ${isDragging ? 'pointer-events-none' : ''}`}>
              <Link href="/projects" className="w-full h-full group" draggable={false}>
                <div className="w-full h-full rounded-[20px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors flex flex-col items-center justify-center p-6 gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white text-white/50 group-hover:text-black transition-all">
                    <ArrowRight size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/90 mb-1">View Full Archive</p>
                    <p className="text-xs text-white/40">Explore all projects</p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Spacer to ensure right scroll padding */}
          <div className="shrink-0 w-2 md:w-6" />
        </div>

        {/* Swipe Indicator (Mobile Only) */}
        {data.length > 0 && (
          <AnimatedText delay={0.4}>
            <div className="mt-8 flex items-center justify-center gap-2 text-white/30 md:hidden">
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Swipe to explore</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MoveRight size={14} />
              </motion.div>
            </div>
          </AnimatedText>
        )}

        {data.length === 0 && (
          <AnimatedText delay={0.3}>
            <div className="text-center py-20">
              <p className="text-white/30 text-sm">No projects yet. Add some from the dashboard!</p>
            </div>
          </AnimatedText>
        )}
      </div>
    </section>
  );
}
