import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

import { kv } from '@vercel/kv';
import { get, list, put } from '@vercel/blob';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
const portfolioBlobPath = 'portfolio/portfolio.json';
const portfolioSnapshotPrefix = 'portfolio/snapshots/';

// Check if Vercel KV is configured via environment variables that Vercel injects
const isVercelKVConfigured = () => {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

const isVercelBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

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
    image?: string;
  };
  projects: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    technologies: string[];
    price?: string;
    website?: string;
    whatsapp?: string;
    whatsappText?: string;
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
  if (isVercelBlobConfigured()) {
    try {
      let latestBlob: { url: string; pathname: string; uploadedAt: Date } | undefined;
      let cursor: string | undefined;

      do {
        const page = await list({ prefix: portfolioSnapshotPrefix, limit: 1000, cursor });
        for (const blob of page.blobs) {
          if (
            !latestBlob ||
            blob.uploadedAt > latestBlob.uploadedAt ||
            (blob.uploadedAt.getTime() === latestBlob.uploadedAt.getTime() && blob.pathname > latestBlob.pathname)
          ) {
            latestBlob = blob;
          }
        }
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);

      const blob = latestBlob
        ? await get(latestBlob.url, { access: 'public' })
        : await get(portfolioBlobPath, { access: 'public' });

      if (blob?.stream) {
        return JSON.parse(await new Response(blob.stream).text()) as PortfolioData;
      }
    } catch (e) {
      console.error('Vercel Blob fetch error, trying Vercel KV', e);
    }
  }

  if (isVercelKVConfigured()) {
    try {
      const data = await kv.get<PortfolioData>('portfolio_data');
      if (data) return data;
    } catch (e) {
      console.error('Vercel KV fetch error, falling back to local file', e);
    }
  }

  // The JSON file remains the fallback for local development and initial data.
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')) as PortfolioData;
  } catch {
    return getDefaultData();
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (isVercelBlobConfigured()) {
    try {
      await put(`${portfolioSnapshotPrefix}${Date.now()}-${randomUUID()}.json`, JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        contentType: 'application/json',
      });
      return;
    } catch (e) {
      console.error('Vercel Blob save error', e);
      throw new Error('Gagal menyimpan data ke Vercel Blob. Periksa koneksi dan token Blob di pengaturan proyek Vercel.');
    }
  }

  if (isVercelKVConfigured()) {
    try {
      await kv.set('portfolio_data', data);
      return;
    } catch (e) {
      console.error('Vercel KV save error, falling back to local file', e);
    }
  }

  if (process.env.VERCEL === '1') {
    throw new Error('Penyimpanan persisten belum dikonfigurasi. Hubungkan Vercel Blob atau Upstash Redis ke proyek ini.');
  }

  // Local development fallback
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
