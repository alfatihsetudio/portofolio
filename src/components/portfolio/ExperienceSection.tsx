'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceSectionProps {
  data: Experience[];
}

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        className="absolute left-[7px] top-3 w-px bg-gradient-to-b from-white/20 to-transparent"
      />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
        className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-blue-400/50 bg-black flex items-center justify-center"
      >
        <div className="w-[5px] h-[5px] rounded-full bg-blue-400" />
      </motion.div>

      {/* Content */}
      <div className="group">
        <span className="text-[10px] font-medium text-white/30 tracking-[0.2em] uppercase">
          {experience.period}
        </span>
        <h3 className="text-lg font-semibold text-white mt-1 tracking-tight group-hover:text-blue-400 transition-colors">
          {experience.role}
        </h3>
        <p className="text-sm text-white/40 font-medium mt-0.5 mb-2">
          {experience.company}
        </p>
        <p className="text-sm text-white/30 font-light leading-relaxed">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column: Text Content */}
          <div className="flex-1 md:w-1/3 md:shrink-0 md:sticky md:top-32 md:h-fit">
            {/* Section Label */}
            <AnimatedText className="mb-4">
              <span className="text-xs font-medium text-emerald-400 tracking-[0.3em] uppercase">
              Pendidikan
            </span>
            </AnimatedText>

            {/* Section Title */}
            <AnimatedText delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Perjalanan
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                pendidikan saya.
              </span>
            </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-base text-white/40 font-light mb-12">
              Sejarah sekolah, pencapaian akademis, dan perjalanan belajar saya.
            </p>
            </AnimatedText>
          </div>

          {/* Right Column: Timeline */}
          <div className="flex-1 md:w-2/3">
            {data.length > 0 ? (
              <div className="relative">
                {data.map((experience, index) => (
                  <TimelineItem key={experience.id} experience={experience} index={index} />
                ))}
              </div>
            ) : (
              <AnimatedText delay={0.3}>
                <div className="text-center py-20">
                  <p className="text-white/30 text-sm">Belum ada riwayat pendidikan yang ditambahkan.</p>
                </div>
              </AnimatedText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
