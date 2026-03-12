import { getPortfolioData } from '@/lib/data';
import SkillsClient from './client';

export const dynamic = 'force-dynamic';

export default async function SkillsArchivePage() {
  const data = await getPortfolioData();
  
  return <SkillsClient data={data.skills} />;
}
