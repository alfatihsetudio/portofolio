import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag, Folder } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getPortfolioData();
  const project = data.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Determine a random color theme based on the ID for the placeholder gradient
  const idNumber = parseInt(id) || 0;
  const colorthemeClass =
    idNumber % 3 === 0
      ? 'from-blue-500/20 via-blue-600/10 to-purple-500/20'
      : idNumber % 3 === 1
      ? 'from-purple-500/20 via-pink-500/10 to-rose-500/20'
      : 'from-cyan-500/20 via-teal-500/10 to-emerald-500/20';

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 pb-32">
      {/* Background Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium tracking-wide">Archive</span>
          </Link>
          
          <div className="text-sm font-semibold tracking-widest uppercase text-white/30 truncate max-w-[200px]">
            {project.title}
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <div className="pt-24 px-6 max-w-6xl mx-auto relative z-10 w-full mb-12">
        <AnimatedText>
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/[0.06]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${colorthemeClass}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[2rem] border border-white/10 rotate-45 flex items-center justify-center`}>
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-white/5 -rotate-12" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Soft gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
            
            {/* Bottom Content inside Image */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </AnimatedText>
      </div>

      <div className="px-6 max-w-4xl mx-auto relative z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Content Info */}
        <div className="md:col-span-2 order-2 md:order-1 flex flex-col gap-6">
          <AnimatedText delay={0.1}>
            <div className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg max-w-none">
              <p>{project.description}</p>
              
              {/* Note: since JSON description is simple text, we render it directly. If markdown is used in future, parse it here */}
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2} className="mt-8 border-t border-white/[0.05] pt-8">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">
              Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.05] text-sm text-white/60 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedText>
        </div>

        {/* Info Sidebar */}
        <div className="md:col-span-1 order-1 md:order-2">
          <AnimatedText delay={0.1} className="sticky top-28 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col gap-6 backdrop-blur-xl">
            <h3 className="text-xs font-semibold text-white/30 tracking-widest uppercase mb-2">Project Info</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Folder size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">Category</p>
                  <p className="text-sm font-medium text-white/90">{project.category}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Tag size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">Stack Size</p>
                  <p className="text-sm font-medium text-white/90">{project.technologies.length} Techs</p>
                </div>
              </div>
            </div>

            {project.link && (
              <div className="pt-6 border-t border-white/[0.05] mt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-xl p-[1px] flex"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex-1 bg-black rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-all group-hover:bg-black/50">
                    <span className="text-white text-sm font-medium">Visit Live Project</span>
                    <ExternalLink className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all" />
                  </div>
                </a>
              </div>
            )}
          </AnimatedText>
        </div>
      </div>
    </main>
  );
}
