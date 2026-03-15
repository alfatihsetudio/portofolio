'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { User, Briefcase, Code, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  data: {
    name: string;
    title: string;
    subtitle: string;
    tagline: string;
    avatar?: string;
  };
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Typing text effect
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: done ? [1, 0] : 1 }}
        transition={{ duration: 0.5, repeat: done ? Infinity : 0, repeatType: 'reverse' }}
        className="text-white/60"
      >
        |
      </motion.span>
    </span>
  );
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY, innerWidth, innerHeight } = e as any;
    setMousePos({
      x: (clientX / (innerWidth || window.innerWidth) - 0.5) * 20,
      y: (clientY / (innerHeight || window.innerHeight) - 0.5) * 20,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const navCards = [
    { title: 'About', icon: User, href: '#about', color: 'from-blue-500/20 to-cyan-500/20', glow: 'shadow-blue-500/20' },
    { title: 'Projects', icon: Briefcase, href: '#projects', color: 'from-purple-500/20 to-pink-500/20', glow: 'shadow-purple-500/20' },
    { title: 'Skills', icon: Code, href: '#skills', color: 'from-cyan-500/20 to-emerald-500/20', glow: 'shadow-cyan-500/20' },
    { title: 'Contact', icon: Mail, href: '#contact', color: 'from-orange-500/20 to-red-500/20', glow: 'shadow-orange-500/20' },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-10 sm:pt-40 sm:pb-12 min-h-[100dvh]"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)',
              'radial-gradient(ellipse 80% 50% at 30% -20%, rgba(59, 130, 246, 0.12), transparent)',
              'radial-gradient(ellipse 80% 50% at 70% -20%, rgba(139, 92, 246, 0.15), transparent)',
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
        style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
      />
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-[150px] pointer-events-none"
        style={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
      />
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 80, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-blue-500/8 blur-[100px] pointer-events-none"
      />

      {/* Background Grid */}
      <motion.div
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Main Content Box */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Dynamic Object & Avatar Space */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-10 flex items-center justify-center">
          {/* Multi-layered Animated Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-4px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(139,92,246,0.4), transparent, rgba(59,130,246,0.4), transparent)',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-black" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-20px] rounded-full border border-white/[0.03]"
            style={{
              background: 'conic-gradient(from 180deg, transparent, rgba(6,182,212,0.15), transparent, rgba(236,72,153,0.1), transparent)',
              padding: '1px',
            }}
          >
            <div className="w-full h-full rounded-full bg-black/80" />
          </motion.div>

          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-40px] rounded-full border border-white/[0.02]"
          />

          {/* Pulsing glow behind avatar */}
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-[-10px] bg-gradient-to-tr from-purple-500/20 via-blue-500/15 to-cyan-500/20 rounded-full blur-2xl"
          />

          {/* Orbiting dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-12px]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-25px]"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-35px]"
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
          </motion.div>
          
          {/* Avatar Container */}
          <motion.div 
            className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-center z-10 group cursor-default shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
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
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Text Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] sm:text-xs font-medium text-white/70 tracking-[0.2em] uppercase backdrop-blur-md">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={12} className="text-yellow-400/80" />
              </motion.span>
              {data.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            {data.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white/60 via-white/50 to-white/40 font-light leading-relaxed max-w-lg mx-auto"
          >
            <TypingText text={data.subtitle} />
          </motion.div>
        </div>

        {/* Quick Nav Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden group rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex items-center justify-between sm:flex-col sm:items-start sm:gap-6 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 hover:shadow-lg ${card.glow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none"
              />

              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/20 transition-all z-10 shrink-0">
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
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], height: ['4px', '12px', '4px'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 rounded-full bg-white/30"
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
