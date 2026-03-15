'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { User, Briefcase, Code, Mail, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  data: {
    name: string;
    title: string;
    subtitle: string;
    tagline: string;
    avatar?: string;
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const navCards = [
    { title: 'About', icon: User, href: '#about', color: 'from-blue-500/20 to-cyan-500/20' },
    { title: 'Projects', icon: Briefcase, href: '#projects', color: 'from-purple-500/20 to-pink-500/20' },
    { title: 'Skills', icon: Code, href: '#skills', color: 'from-cyan-500/20 to-emerald-500/20' },
    { title: 'Contact', icon: Mail, href: '#contact', color: 'from-orange-500/20 to-red-500/20' },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-10 sm:pt-40 sm:pb-12 min-h-[100dvh]"
    >
      {/* Lightweight CSS aurora glow */}
      <div className="hero-aurora absolute inset-0 pointer-events-none" />

      {/* Subtle grid (pure CSS, almost zero cost) */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Avatar with CSS-only animated ring */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-10 flex items-center justify-center">
          {/* Outer spinning ring — pure CSS */}
          <div className="hero-ring-outer absolute inset-[-4px] rounded-full" />
          {/* Inner counter-spin ring */}
          <div className="hero-ring-inner absolute inset-[-20px] rounded-full border border-white/[0.03]" />

          {/* Soft glow behind avatar — CSS pulse */}
          <div className="hero-glow absolute inset-[-10px] rounded-full bg-gradient-to-tr from-purple-500/15 via-blue-500/10 to-cyan-500/15 blur-2xl" />
          
          {/* Avatar */}
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-center z-10 group cursor-default shadow-2xl">
            {data.avatar ? (
              <img src={data.avatar} alt="Profile avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <User className="w-8 h-8 mx-auto text-white/20 mb-2" />
                <span className="text-[10px] text-white/30 uppercase tracking-widest leading-tight block">
                  Avatar<br/>Space
                </span>
              </div>
            )}
            {/* Subtle shimmer — CSS only */}
            <div className="hero-shimmer absolute inset-0 pointer-events-none" />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] sm:text-xs font-medium text-white/70 tracking-[0.2em] uppercase backdrop-blur-md">
              <span className="hero-sparkle inline-block">✦</span>
              {data.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            {data.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-lg mx-auto"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Quick Nav Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mx-auto px-4 sm:px-0"
        >
          {navCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(card.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative overflow-hidden group rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex items-center justify-between sm:flex-col sm:items-start sm:gap-6 hover:bg-white/[0.06] hover:border-white/[0.15] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all z-10 shrink-0">
                <card.icon size={18} />
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end sm:justify-start sm:w-full z-10">
                <span className="text-sm font-semibold text-white/70 group-hover:text-white tracking-wide transition-colors">
                  {
                    card.title === 'About' ? 'Tentang' :
                    card.title === 'Projects' ? 'Layanan' :
                    card.title === 'Skills' ? 'Keahlian' :
                    card.title === 'Contact' ? 'Kontak' : card.title
                  }
                </span>
                <ArrowRight size={14} className="text-white/20 group-hover:text-white/80 group-hover:translate-x-1 transition-all hidden sm:block" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator — CSS only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
            <div className="hero-scroll-dot w-1 h-1 rounded-full bg-white/40" />
          </div>
        </motion.div>

      </motion.div>

      {/* All heavy animations replaced by lightweight CSS */}
      <style jsx>{`
        .hero-aurora {
          background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.12), transparent);
          animation: auroraShift 10s ease-in-out infinite;
        }
        @keyframes auroraShift {
          0%, 100% { background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.12), transparent); }
          33% { background: radial-gradient(ellipse 80% 50% at 35% -20%, rgba(59, 130, 246, 0.08), transparent); }
          66% { background: radial-gradient(ellipse 80% 50% at 65% -20%, rgba(139, 92, 246, 0.10), transparent); }
        }

        .hero-ring-outer {
          background: conic-gradient(from 0deg, transparent, rgba(139,92,246,0.3), transparent, rgba(59,130,246,0.3), transparent);
          animation: spinSlow 15s linear infinite;
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px));
        }
        .hero-ring-inner {
          animation: spinReverse 20s linear infinite;
          border-color: rgba(255,255,255,0.03);
          border-bottom-color: rgba(6,182,212,0.15);
          border-left-color: rgba(236,72,153,0.1);
        }

        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }

        .hero-glow {
          animation: glowPulse 4s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }

        .hero-shimmer {
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 70%, 100% { background-position: 200% 0; }
          50% { background-position: -100% 0; }
        }

        .hero-sparkle {
          color: rgba(250, 204, 21, 0.7);
          animation: sparkleWiggle 2s ease-in-out infinite;
        }
        @keyframes sparkleWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(12deg); }
          75% { transform: rotate(-12deg); }
        }

        .hero-scroll-dot {
          animation: scrollBounce 1.5s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(16px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
