import fs from 'fs';
import path from 'path';

import { Redis } from '@upstash/redis';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

// Get Redis instance if env vars are present
const getRedis = () => {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return null;
};

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    tagline: string;
    avatar?: string;
  };
  about: {
    description: string;
    highlights: string[];
  };
  projects: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    link: string;
    technologies: string[];
  }[];
  skills: {
    name: string;
    level: number;
    category: string;
    description?: string;
    image?: string;
  }[];
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    social: {
      github: string;
      linkedin: string;
      instagram: string;
      twitter: string;
    };
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const redis = getRedis();

  if (redis) {
    try {
      const data = await redis.get<PortfolioData>('portfolio_data');
      if (data) return data;
    } catch (e) {
      console.error("Redis fetch error, falling back to local file", e);
    }
  }

  // Fallback to local file if no Redis or fetch failed (default behavior)
  try {
    // Dynamic import to avoid build-time caching issues, but still bundled by Next.js
    const localData = await import('@/data/portfolio.json');
    return localData.default as PortfolioData;
  } catch {
    return getDefaultData();
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const redis = getRedis();

  if (redis) {
    try {
      await redis.set('portfolio_data', JSON.stringify(data));
      return; // If Redis save succeeds, we don't strictly need to write to fs (which Vercel might block anyway).
    } catch (e) {
      console.error("Redis save error, falling back to local file", e);
    }
  }

  // Fallback to local file if no Redis (e.g. Local Development)
  const dirPath = path.dirname(dataFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getDefaultData(): PortfolioData {
  return {
    hero: {
      name: "Your Name",
      title: "Creative Developer",
      subtitle: "I craft digital experiences that inspire and engage.",
      tagline: "Design. Build. Inspire."
    },
    about: {
      description: "I'm a passionate developer and designer.",
      highlights: ["Full-Stack Development", "UI/UX Design"]
    },
    projects: [],
    skills: [],
    experience: [],
    contact: {
      email: "hello@yourname.com",
      phone: "",
      location: "Indonesia",
      social: {
        github: "",
        linkedin: "",
        instagram: "",
        twitter: ""
      }
    }
  };
}
