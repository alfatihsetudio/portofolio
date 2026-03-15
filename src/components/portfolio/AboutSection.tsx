'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';

interface AboutSectionProps {
  data: {
    description: string;
    highlights: string[];
  };
}

export default function AboutSection({ data }: AboutSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pt-10 pb-16 md:pb-24 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 right-0 h-full pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px]" />
      </motion.div>

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="flex-1 w-full">
            {/* Section Label */}
            <AnimatedText className="mb-4">
              <span className="text-xs font-medium text-blue-400 tracking-[0.3em] uppercase">
                Tentang
              </span>
            </AnimatedText>

            {/* Section Title */}
            <AnimatedText delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8">
                 Kenali
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  saya lebih jauh.
                </span>
              </h2>
            </AnimatedText>

            {/* Description */}
            <AnimatedText delay={0.2}>
              <p className="text-base text-white/50 font-light leading-relaxed mb-8 md:mb-0">
                {data.description}
              </p>
            </AnimatedText>
          </div>

          {/* Right Column: Highlights */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {data.highlights.map((highlight, index) => (
                <AnimatedText key={index} delay={0.3 + index * 0.1}>
                  <motion.div
                    className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Number */}
                    <span className="block text-2xl font-bold text-white/10 mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Text */}
                    <span className="relative text-sm font-medium text-white/70">
                      {highlight}
                    </span>
                  </motion.div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <AnimatedText delay={0.6}>
          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">∞</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
