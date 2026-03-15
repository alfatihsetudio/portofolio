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
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-10 sm:pt-40 sm:pb-12"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content Box */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Dynamic Object & Avatar Space */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-10 flex items-center justify-center">
          {/* Dynamic Animated Rings */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-white/10 border-t-purple-500/50 border-r-blue-500/50"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-20px] rounded-[40%] border border-white/5 border-b-cyan-500/30 border-l-pink-500/30 blur-[2px]"
          />
          <motion.div
            animate={{ rotate: 180, scale: [0.9, 1.3, 0.9] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-2xl"
          />
          
          {/* Avatar Container */}
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
            {/* Inner Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] sm:text-xs font-medium text-white/70 tracking-[0.2em] uppercase backdrop-blur-md">
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
          {navCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(card.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden group rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex items-center justify-between sm:flex-col sm:items-start sm:gap-6 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors z-10 shrink-0">
                <card.icon size={18} />
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end sm:justify-start sm:w-full z-10">
                <span className="text-sm font-semibold text-white/80 group-hover:text-white tracking-wide">
                  {
                    card.title === 'About' ? 'Tentang' :
                    card.title === 'Projects' ? 'Layanan' :
                    card.title === 'Skills' ? 'Keahlian' :
                    card.title === 'Experience' ? 'Pendidikan' : // Added this line based on the instruction
                    card.title === 'Contact' ? 'Kontak' : card.title
                  }
                </span>
                <ArrowRight size={14} className="text-white/30 group-hover:text-white/80 group-hover:translate-x-1 transition-all opacity-0 sm:opacity-100 group-hover:opacity-100 hidden sm:block" />
              </div>
            </motion.a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
