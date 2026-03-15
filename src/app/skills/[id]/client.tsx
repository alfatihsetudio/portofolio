'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';

interface Skill {
  name: string;
  level: number;
  category: string;
  description?: string;
  image?: string;
}

export default function SkillDetailClient({ skill }: { skill: Skill }) {
  // Generate random stable aesthetic values based on the name length
  const charLength = skill.name.length;
  
  const gradient = charLength % 4 === 0 ? 'rgba(59,130,246,0.1), rgba(139,92,246,0.05)' : 
                   charLength % 4 === 1 ? 'rgba(139,92,246,0.1), rgba(236,72,153,0.05)' : 
                   charLength % 4 === 2 ? 'rgba(6,182,212,0.1), rgba(59,130,246,0.05)' : 
                   'rgba(16,185,129,0.1), rgba(6,182,212,0.05)';
                   
  const dotGradient = charLength % 4 === 0 ? '#3b82f6, #8b5cf6' : 
                      charLength % 4 === 1 ? '#8b5cf6, #ec4899' : 
                      charLength % 4 === 2 ? '#06b6d4, #3b82f6' : 
                      '#10b981, #06b6d4';

  const themeGlow = charLength % 2 === 0 ? 'bg-cyan-500/10' : 'bg-purple-500/10';

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-32">
      {/* Background Effect */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ${themeGlow} blur-[120px] pointer-events-none`} />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/skills"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium tracking-wide">Kembali ke Keahlian</span>
          </Link>
          
          <div className="text-sm font-semibold tracking-widest uppercase text-white/30 hidden sm:block">
            {skill.category}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-24 px-6 max-w-4xl mx-auto relative z-10 w-full flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
        
        {/* Left Side: Avatar / Big Block */}
        <AnimatedText className="w-full md:w-2/5 lg:w-1/3 shrink-0">
          <div className="w-full aspect-[2/1] rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 p-4 flex items-center justify-center relative group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
            
            {skill.image ? (
              <img src={skill.image} alt={skill.name} className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" />
            ) : (
              <div 
                className="w-full h-full rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 group-hover:scale-[1.02] transition-transform duration-700"
                style={{ background: `linear-gradient(135deg, ${gradient})` }}
              >
                 <div 
                   className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                   style={{ background: `linear-gradient(135deg, ${dotGradient})` }}
                 />
                <span className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase">Keahlian Tech</span>
              </div>
            )}
          </div>
        </AnimatedText>

        {/* Right Side: Details */}
        <div className="flex-1 w-full pt-4 md:pt-8 min-w-0">
          <AnimatedText delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
               <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${dotGradient})` }}
                />
              <span className="text-xs font-semibold text-white/50 tracking-[0.2em] uppercase">
                {skill.category}
              </span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
              {skill.name}
            </h1>
          </AnimatedText>


          <AnimatedText delay={0.4}>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">Tentang Teknologi Ini</h3>
              <p className="text-white/70 leading-loose font-light sm:text-lg">
                {skill.description || `Saya telah banyak membangun proyek menggunakan ${skill.name}. Teknologi ini adalah bagian inti dari pekerjaan saya untuk membantu saya membuat proyek dan aplikasi digital yang modern.`}
              </p>
            </div>
          </AnimatedText>
        </div>

      </section>
    </main>
  );
}
