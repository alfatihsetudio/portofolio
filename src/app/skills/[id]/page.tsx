import { getPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import SkillDetailClient from '@/app/skills/[id]/client';

export const dynamic = 'force-dynamic';

export default async function SkillDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await getPortfolioData();
  
  // Find skill by standardizing the name into a URL-friendly slug
  const decodedId = decodeURIComponent(params.id);
  const skill = data.skills.find(
    (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === decodedId
  );

  if (!skill) {
    notFound();
  }

  return <SkillDetailClient skill={skill} />;
}
