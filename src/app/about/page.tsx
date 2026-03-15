import { getPortfolioData } from '@/lib/data';
import Navigation from '@/components/portfolio/Navigation';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import Footer from '@/components/portfolio/Footer';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const data = await getPortfolioData();

  return (
    <main className="relative min-h-screen bg-black selection:bg-white/20">
      <Navigation />

      {/* Main About Content */}
      <section className="pt-28 md:pt-36 pb-16 px-6 max-w-4xl mx-auto flex flex-col items-start">
        {/* Large 1x1 Image */}
        <div className="w-full max-w-2xl aspect-square mb-12 rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 p-2 lg:p-4 shrink-0 group relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
          {data.about.image ? (
            <img 
              src={data.about.image} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-[24px] lg:rounded-[28px] grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
             <div className="w-full h-full rounded-[24px] lg:rounded-[28px] border sm:border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-white/[0.02] to-transparent">
               <span className="text-xs uppercase tracking-widest text-white/20 font-medium">Foto Profil Utama</span>
               <span className="text-[10px] text-white/10">(Upload foto dengan aspek rasio 1:1 di Dashboard)</span>
             </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight text-left">
          Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Saya.</span>
        </h1>
        <div className="w-full text-base text-white/70 font-light leading-relaxed mb-8 text-left">
          {data.about.description.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index} className="mb-6">{paragraph}</p> : null
          ))}
        </div>
      </section>

      {/* Education / Experience Timeline */}
      <ExperienceSection data={data.experience} />

      <Footer name={data.hero.name} />
    </main>
  );
}
