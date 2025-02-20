'use client';

import FileUploader from '@/components/FileUploader';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-center mb-4">
        Upload an image to split it into its RGB components
      </h1>
      <FileUploader assetType="RGB_SPLITTING" />
    </div>
  );
}
