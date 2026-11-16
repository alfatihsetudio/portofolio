import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_UPLOAD_BYTES } from '@/lib/image-upload';

const imagePathPrefix = 'portfolio/images/';

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Penyimpanan gambar belum terhubung ke proyek ini.' },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token || !verifyToken(token)) {
          throw new Error('Sesi admin berakhir. Silakan login kembali.');
        }

        if (!pathname.startsWith(imagePathPrefix)) {
          throw new Error('Lokasi upload gambar tidak valid.');
        }

        return {
          allowedContentTypes: [...ALLOWED_IMAGE_TYPES],
          maximumSizeInBytes: MAX_IMAGE_UPLOAD_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Gagal menyiapkan upload gambar.';
    const status = message.startsWith('Sesi admin') ? 401 : 400;

    console.error('Image upload failed:', error);
    return NextResponse.json({ error: message }, { status });
  }
}
