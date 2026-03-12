'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Skill {
  name: string;
  level: number;
  category: string;
  description?: string;
  image?: string;
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

export default function SkillsClient({ data }: { data: Skill[] }) {
  const categories = [...new Set(data.map((s) => s.category))];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-32">
      {/* Background Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#skills"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          
          <div className="text-sm font-semibold tracking-widest uppercase text-white/30 hidden sm:block">
            Full Skills Archive
          </div>
        </div>
      </nav>

      <section className="pt-32 px-6 max-w-4xl mx-auto relative z-10 w-full">
        <AnimatedText>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Skills.</span>
          </h1>
        </AnimatedText>
        
        <AnimatedText delay={0.1}>
          <p className="text-base text-white/40 font-light mb-16 max-w-xl">
            A comprehensive breakdown of the tools, languages, and frameworks I use on a daily basis. 
            Organized by category.
          </p>
        </AnimatedText>

        {/* Categorized Skills */}
        {categories.length > 0 ? (
          <div className="flex flex-col gap-12">
            {categories.map((category, catIndex) => (
              <AnimatedText key={category} delay={0.2 + catIndex * 0.1}>
                <div className="flex flex-col gap-6">
                  <h3 className="text-sm font-semibold text-white/60 tracking-[0.2em] uppercase flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20" />
                    {category}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {data
                      .filter(s => s.category === category)
                      .map((skill, index) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        ) : (
          <AnimatedText delay={0.2}>
            <div className="py-20 text-center text-white/30 text-sm">
              No skills listed yet.
            </div>
          </AnimatedText>
        )}
      </section>
    </main>
  );
}
