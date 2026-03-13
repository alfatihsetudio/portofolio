import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file explicitly provided.' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, { 
      access: 'public',
      multipart: true
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Vercel Blob upload failed:", error);
    return NextResponse.json({ 
      error: 'Upload via Vercel Blob gagal.',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
