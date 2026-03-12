'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, ArrowUpRight } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}

interface ContactSectionProps {
  data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const socialLinks = [
    { name: 'GitHub', url: data.social?.github, icon: Github, color: 'hover:text-white' },
    { name: 'LinkedIn', url: data.social?.linkedin, icon: Linkedin, color: 'hover:text-blue-400' },
    { name: 'Instagram', url: data.social?.instagram, icon: Instagram, color: 'hover:text-pink-400' },
    { name: 'Twitter', url: data.social?.twitter, icon: Twitter, color: 'hover:text-sky-400' },
  ].filter(link => link.url); // Only show if URL exists

  return (
    <section id="contact" className="relative py-16 md:py-24 px-6 overflow-hidden bg-black/50 border-t border-white/5">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg md:max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column: Text and Socials */}
          <div className="flex-1 md:w-1/2">
            <AnimatedText className="mb-4">
              <span className="text-xs font-medium text-blue-400 tracking-[0.3em] uppercase">
                Contact
              </span>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Let&apos;s build
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  something amazing.
                </span>
              </h2>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-base text-white/40 font-light mb-12 md:mb-16 leading-relaxed max-w-md">
                I&apos;m currently available for freelance work and full-time opportunities.
                If you have a project that needs some creative magic, I&apos;d love to hear from you.
              </p>
            </AnimatedText>

            {/* Social Links on Desktop inside left column */}
            <div className="hidden md:block">
              {socialLinks.length > 0 && (
                <AnimatedText delay={0.3}>
                  <div className="pt-8 border-t border-white/5 w-fit">
                    <p className="text-xs text-white/30 tracking-wider uppercase mb-6">
                      Or find me on
                    </p>
                    <div className="flex gap-4">
                      {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 transition-all ${link.color}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <Icon size={20} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedText>
              )}
            </div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="flex-1 md:w-1/2 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Contact Details */}
              {data.email && (
                <AnimatedText delay={0.3}>
                  <a
                    href={`mailto:${data.email}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="text-blue-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/30 tracking-wider uppercase mb-1">Email</p>
                      <p className="text-sm font-medium text-white/90 group-hover:text-white">{data.email}</p>
                    </div>
                    <ArrowUpRight className="text-white/20 group-hover:text-white/80 w-5 h-5 transition-colors" />
                  </a>
                </AnimatedText>
              )}

              {data.phone && (
                <AnimatedText delay={0.4}>
                  <a
                    href={`tel:${data.phone}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                      <Phone className="text-purple-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/30 tracking-wider uppercase mb-1">Phone</p>
                      <p className="text-sm font-medium text-white/90 group-hover:text-white">{data.phone}</p>
                    </div>
                    <ArrowUpRight className="text-white/20 group-hover:text-white/80 w-5 h-5 transition-colors" />
                  </a>
                </AnimatedText>
              )}

              {data.location && (
                <AnimatedText delay={0.5}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                      <MapPin className="text-pink-400 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 tracking-wider uppercase mb-1">Location</p>
                      <p className="text-sm font-medium text-white/90">{data.location}</p>
                    </div>
                  </div>
                </AnimatedText>
              )}
            </div>

            {/* Social Links on Mobile inside space-y-8 */}
            <div className="md:hidden mt-12">
              {socialLinks.length > 0 && (
                <AnimatedText delay={0.6}>
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-xs text-white/30 tracking-wider uppercase mb-6 text-center">
                      Or find me on
                    </p>
                    <div className="flex justify-center gap-4">
                      {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 transition-all ${link.color}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            <Icon size={20} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedText>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
