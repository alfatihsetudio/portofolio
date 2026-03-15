import { getPortfolioData } from '@/lib/data';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

// Force dynamic since data might change from dashboard
export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="relative min-h-screen selection:bg-white/20">
      {/* Top progress bar */}
      <ScrollProgress color="linear-gradient(90deg, #3b82f6, #ec4899)" />
      
      {/* Navigation */}
      <Navigation />

      {/* Pages Sections */}
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} />
      <ProjectsSection data={data.projects} />
      <SkillsSection data={data.skills} />
      <ContactSection data={data.contact} />

      {/* Footer */}
      <Footer name={data.hero.name} />
    </main>
  );
}
