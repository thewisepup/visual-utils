'use server';
import { NextResponse } from 'next/server';
import s3Client from '@/lib/s3';
import { HeadObjectCommand } from '@aws-sdk/client-s3';

const RGB_CHANNELS = ['red', 'green', 'blue'] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const objectKey = searchParams.get('key');

  console.log('Received request for status check with params:', { objectKey });

  if (!objectKey) {
    console.warn('Request rejected: Missing object key');
    return NextResponse.json(
      { error: 'Object key is required' },
      { status: 400 }
    );
  }

  try {
    console.log(`Initiating status check for object key: ${objectKey}`);
    await Promise.all(
      RGB_CHANNELS.map((color) => {
        console.log(`Checking ${color} channel for: ${objectKey}`);
        return s3Client.send(
          new HeadObjectCommand({
            Bucket: process.env.RGB_SPLITTING_PROCESSED_BUCKET_NAME,
            Key: `${color}/${objectKey}`,
          })
        );
      })
    );
    console.log(`Status check completed successfully for: ${objectKey}`);
    return NextResponse.json({ exists: true });
  } catch (error) {
    console.error('Status check failed:', {
      objectKey,
      error: error instanceof Error ? error.message : error,
    });
    return NextResponse.json({ exists: false });
  }
}
