import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag, Folder } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const data = await getPortfolioData();
  const project = data.projects.find((p) => String(p.id) === String(id));

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
            <span className="text-sm font-medium tracking-wide">Arsip</span>
          </Link>
          
          <div className="text-sm font-semibold tracking-widest uppercase text-white/30 truncate max-w-[200px]">
            {project.title}
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <div className="pt-20 md:pt-24 px-4 md:px-6 max-w-6xl mx-auto relative z-10 w-full mb-6 md:mb-12">
        <AnimatedText>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl md:rounded-[32px] overflow-hidden bg-white/[0.03] border border-white/[0.06]">
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
            <div className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-12 md:right-12">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-0 md:mb-2 leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </AnimatedText>
      </div>

      <div className="px-4 md:px-6 max-w-4xl mx-auto relative z-10 w-full flex flex-col-reverse md:grid md:grid-cols-3 gap-4 md:gap-12">
        {/* Main Content Info */}
        <div className="md:col-span-2 md:col-start-1 md:row-start-1 w-full flex flex-col gap-4 md:gap-6">
          <div className="text-white bg-black/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 md:bg-transparent md:border-none md:p-0 md:rounded-none text-sm md:text-base">
            {project.description.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index} className="text-white/70 leading-relaxed mb-3 md:mb-6 block w-full break-words">{paragraph}</p> : null
            ))}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="md:col-start-3 md:col-span-1 md:row-start-1">
          <AnimatedText delay={0.1} className="md:sticky md:top-28 bg-white/[0.02] border border-white/[0.05] rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-4 md:gap-6 backdrop-blur-xl">
            <h3 className="text-[10px] md:text-xs font-semibold text-white/30 tracking-widest uppercase mb-0 md:mb-2 text-center md:text-left">Info Layanan</h3>
            
            <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4">
              <div className="flex items-center md:items-start gap-3 md:gap-4 flex-1">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Folder className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase mb-0.5 md:mb-1">Kategori</p>
                  <p className="text-xs md:text-sm font-medium text-white/90">{project.category}</p>
                </div>
              </div>

              <div className="flex items-center md:items-start gap-3 md:gap-4 flex-1">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase mb-0.5 md:mb-1">Harga</p>
                  <p className="text-xs md:text-sm font-bold text-emerald-400 line-clamp-1">
                    {project.price ? (
                      !isNaN(Number(project.price)) 
                        ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(project.price))
                        : project.price
                    ) : "Rp 0 (Hubungi)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6 border-t border-white/[0.05] mt-0 md:mt-2 flex flex-col gap-2 md:gap-3">
              <a
                href={
                  project.whatsapp 
                    ? `https://wa.me/${project.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(project.whatsappText || `Halo, saya tertarik dan ingin memesan jasa: ${project.title}`)}`
                    : data.contact?.phone
                      ? `https://wa.me/${data.contact.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(project.whatsappText || `Halo, saya tertarik dan ingin memesan jasa: ${project.title}`)}`
                      : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full overflow-hidden rounded-xl p-[1px] flex"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex-1 bg-black rounded-xl px-4 py-2.5 md:py-3 flex items-center justify-center gap-2 transition-all group-hover:bg-black/50">
                  <span className="text-white text-xs md:text-sm font-semibold tracking-wide">Pesan via WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all" />
                </div>
              </a>
            </div>
          </AnimatedText>
        </div>
      </div>
    </main>
  );
}
