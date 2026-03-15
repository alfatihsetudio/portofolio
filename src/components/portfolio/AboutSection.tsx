'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      className="relative pt-10 pb-8 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 right-0 h-full pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px]" />
      </motion.div>

      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto text-left">
        <div className="flex flex-col gap-6 items-start">
          {/* Text Content */}
          <div className="w-full">
            {/* Section Label */}
            <AnimatedText className="mb-4">
              <span className="text-xs font-medium text-blue-400 tracking-[0.3em] uppercase">
                Tentang
              </span>
            </AnimatedText>

            {/* Section Title */}
            <AnimatedText delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                 Kenali
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  saya lebih jauh.
                </span>
              </h2>
            </AnimatedText>

            {/* Description */}
            <AnimatedText delay={0.2}>
              <p className="text-base text-white/50 font-light leading-relaxed line-clamp-4 md:line-clamp-6 mb-8 md:mb-10">
                {data.description}
              </p>
            </AnimatedText>

            {/* Link to detail page */}
            <AnimatedText delay={0.3}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                Lihat detail & riwayat pendidikan
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}
