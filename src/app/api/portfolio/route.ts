import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data';
import { cookies } from 'next/headers';

function getImageFields(data: PortfolioData) {
  return JSON.stringify({
    avatar: data?.hero?.avatar || '',
    about: data?.about?.image || '',
    projects: Array.isArray(data?.projects) ? data.projects.map((item) => item?.image || '') : [],
    skills: Array.isArray(data?.skills) ? data.skills.map((item) => item?.image || '') : [],
  });
}

// GET - Public: Get portfolio data
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}

// PUT - Protected: Update portfolio data
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json() as PortfolioData;
    await savePortfolioData(data);

    const savedData = await getPortfolioData();
    if (getImageFields(savedData) !== getImageFields(data)) {
      throw new Error('URL gambar belum tersimpan dengan benar. Data yang tersimpan berbeda dari perubahan dashboard.');
    }

    return NextResponse.json(
      { message: 'Portfolio data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Portfolio update failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}
