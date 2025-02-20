import s3Client from '@/lib/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('[RGB Download URL] Request received');
  const objectKey = request.nextUrl.searchParams.get('objectKey');

  if (!objectKey) {
    console.warn('[RGB Download URL] Missing objectKey parameter');
    return NextResponse.json(
      { error: 'objectKey is required' },
      { status: 400 }
    );
  }

  try {
    console.log(
      `[RGB Download URL] Generating presigned URL for object: ${objectKey}`
    );
    const command = new GetObjectCommand({
      Bucket: process.env.RGB_SPLITTING_PROCESSED_BUCKET_NAME!,
      Key: objectKey,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    console.log('[RGB Download URL] Successfully generated presigned URL');
    return NextResponse.json({ presignedUrl: url });
  } catch (error) {
    console.error('[RGB Download URL] Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate download URL' },
      { status: 500 }
    );
  }
}
