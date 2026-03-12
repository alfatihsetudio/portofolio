'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  description?: string;
  image?: string;
}

interface SkillsSectionProps {
  data: Skill[];
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  // Fallback gradient colors
  const gradient = index % 4 === 0 ? 'rgba(59,130,246,0.1), rgba(139,92,246,0.05)' : 
                   index % 4 === 1 ? 'rgba(139,92,246,0.1), rgba(236,72,153,0.05)' : 
                   index % 4 === 2 ? 'rgba(6,182,212,0.1), rgba(59,130,246,0.05)' : 
                   'rgba(16,185,129,0.1), rgba(6,182,212,0.05)';
                   
  const dotGradient = index % 4 === 0 ? '#3b82f6, #8b5cf6' : 
                      index % 4 === 1 ? '#8b5cf6, #ec4899' : 
                      index % 4 === 2 ? '#06b6d4, #3b82f6' : 
                      '#10b981, #06b6d4';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors flex flex-col sm:flex-row items-stretch"
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-48 lg:w-56 shrink-0 aspect-[2/1] sm:aspect-auto overflow-hidden bg-black/20">
        {skill.image ? (
          <img src={skill.image} alt={skill.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
            <div 
              className="w-full h-full rounded-2xl border border-white/10 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 group-hover:border-white/20"
              style={{ background: `linear-gradient(135deg, ${gradient})` }}
            >
              <span className="text-white/20 text-xs tracking-widest uppercase font-medium">No Image</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-shadow"
            style={{ background: `linear-gradient(135deg, ${dotGradient})` }}
          />
          <span className="text-[10px] font-semibold text-white/40 tracking-widest uppercase">
            {skill.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors mb-3">
          {skill.name}
        </h3>
        
        {skill.description ? (
          <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
            {skill.description}
          </p>
        ) : (
          <p className="text-sm text-white/30 font-light italic">
            No description available for this skill.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  // Group skills by category
  const categories = [...new Set(data.map(s => s.category))];

  return (
    <section id="skills" className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column: Text */}
          <div className="flex-1 md:w-1/3 md:shrink-0">
            {/* Section Label */}
            <AnimatedText className="mb-4">
              <span className="text-xs font-medium text-cyan-400 tracking-[0.3em] uppercase">
                Skills
              </span>
            </AnimatedText>

            {/* Section Title */}
            <AnimatedText delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                What I&apos;m
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  skilled at.
                </span>
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-base text-white/40 font-light mb-8 md:mb-0">
                Technologies, languages, and tools I use to bring ideas to life.
              </p>
            </AnimatedText>
          </div>

          {/* Right Column: Skills Layout */}
          <div className="flex-1 md:w-2/3">
            {data.length > 0 ? (
              <div className="flex flex-col items-start gap-10">
                <div className="flex flex-col w-full gap-4">
                  {data.slice(0, 3).map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>

                <AnimatedText delay={0.4}>
                  <Link
                    href="/skills"
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    View all skills
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </AnimatedText>
              </div>
            ) : (
              <AnimatedText delay={0.3}>
                <div className="text-center py-20">
                  <p className="text-white/30 text-sm">No skills listed yet.</p>
                </div>
              </AnimatedText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
