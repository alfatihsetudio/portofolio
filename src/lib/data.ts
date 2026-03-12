import fs from 'fs';
import path from 'path';

import { kv } from '@vercel/kv';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

// Check if Vercel KV is configured via environment variables that Vercel injects
const isVercelKVConfigured = () => {
  return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
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
  if (isVercelKVConfigured()) {
    try {
      const data = await kv.get<PortfolioData>('portfolio_data');
      if (data) return data;
    } catch (e) {
      console.error("Vercel KV fetch error, falling back to local file", e);
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
  if (isVercelKVConfigured()) {
    try {
      await kv.set('portfolio_data', data);
      return; // If KV save succeeds, skip writing to local fs
    } catch (e) {
      console.error("Vercel KV save error, falling back to local file", e);
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
