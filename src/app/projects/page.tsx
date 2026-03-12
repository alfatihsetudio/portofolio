import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

export const dynamic = 'force-dynamic';

export default async function ProjectsArchive() {
  const data = await getPortfolioData();
  const projects = data.projects;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Background Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-purple-500/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          
          <div className="text-sm font-semibold tracking-widest uppercase text-white/30 hidden sm:block">
            Project Archive
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto relative z-10">
        <AnimatedText>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects.</span>
          </h1>
        </AnimatedText>
        
        <AnimatedText delay={0.1}>
          <p className="text-base text-white/40 font-light mb-16 max-w-xl">
            A complete archive of everything I&apos;ve designed and built.
            Click on any project to see its detailed description and links.
          </p>
        </AnimatedText>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <AnimatedText key={project.id} delay={0.1 + index * 0.05}>
              <Link href={`/projects/${project.id}`} className="block group h-full">
                <div className="relative overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/[0.06] flex flex-col h-full transition-all duration-300 md:hover:bg-white/[0.05] md:hover:-translate-y-1 md:hover:shadow-2xl md:hover:shadow-purple-500/10">
                  {/* Image placeholder / gradient */}
                  <div className="relative aspect-[4/5] overflow-hidden shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${
                        index % 3 === 0
                          ? 'from-blue-500/20 via-blue-600/10 to-purple-500/20'
                          : index % 3 === 1
                          ? 'from-purple-500/20 via-pink-500/10 to-rose-500/20'
                          : 'from-cyan-500/20 via-teal-500/10 to-emerald-500/20'
                      } group-hover:scale-105 transition-transform duration-700`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-16 h-16 rounded-2xl border border-white/10 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700`} />
                          <div className={`absolute w-10 h-10 rounded-xl border border-white/5 -rotate-12 group-hover:rotate-[78deg] transition-transform duration-700`} />
                        </div>
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[9px] font-medium text-white/90 tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Link icon (if has external link, show it here too over the card) */}
                    {project.link && (
                      <div className="absolute top-3 right-3 z-10 transition-opacity duration-300 pointer-events-none md:opacity-0 md:group-hover:opacity-100">
                        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-1.5 focus:outline-none">
                          <ExternalLink className="text-white/90 w-full h-full" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1.5 tracking-tight line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {project.technologies.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/40 font-medium whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/40 font-medium">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedText>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 py-20 text-center text-white/30 text-sm">
              No projects deployed yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
