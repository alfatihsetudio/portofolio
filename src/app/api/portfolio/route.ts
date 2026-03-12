import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getPortfolioData, savePortfolioData } from '@/lib/data';
import { cookies } from 'next/headers';

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

    const data = await request.json();
    await savePortfolioData(data);

    return NextResponse.json(
      { message: 'Portfolio data updated successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}
