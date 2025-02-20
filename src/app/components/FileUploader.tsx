'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ASSET_CONFIGS, AssetType } from '../utils/file/asset-configs';
import { uploadFile } from '../utils/file/file-upload';
import { isAssetSizeValid } from '../utils/file/file-validation';
import { FileSizeErrorAlert } from './FileSizeErrorAlert';
import Image from 'next/image';
import { usePoll } from '@/hooks/usePoll';

export type FileUploaderProps = {
  assetType: AssetType;
};

export default function FileUploader({ assetType }: FileUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [objectKey, setObjectKey] = useState<string | null>(null);
  const [rgbImages, setRgbImages] = useState<{
    red: string | null;
    green: string | null;
    blue: string | null;
  }>({ red: null, green: null, blue: null });

  const downloadRGBImages = async (objectKey: string) => {
    try {
      const colors = ['red', 'green', 'blue'];
      const urls = await Promise.all(
        colors.map(async (color) => {
          const { presignedUrl } = await (
            await fetch(
              `/api/rgb/processed/download-url?objectKey=${color}/${objectKey}`
            )
          ).json();
          return { color, presignedUrl };
        })
      );

      setRgbImages(
        urls.reduce(
          (acc, { color, presignedUrl }) => ({
            ...acc,
            [color]: presignedUrl,
          }),
          { red: null, green: null, blue: null }
        )
      );
    } catch (error) {
      console.error('Error downloading RGB images:', error);
    }
  };

  const getFileProcessingState = async (objectKey: string | null) => {
    if (!objectKey) return false;

    const response = await fetch(`/api/rgb/processed/status?key=${objectKey}`);
    const { exists } = await response.json();

    if (exists) {
      setIsFileProcessing(false);
      await downloadRGBImages(objectKey);
      return true;
    }

    return false;
  };

  const { isPolling } = usePoll({
    getPollingState: () => getFileProcessingState(objectKey),
    shouldPoll: isFileProcessing,
    interval: 2000,
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsFileProcessing(true);
    // Reset rgbImages when starting a new upload
    setRgbImages({ red: null, green: null, blue: null });

    const file = event.target.files?.[0];
    if (!file) return;

    if (!isAssetSizeValid(assetType, file)) {
      setShowSizeError(true);
      return;
    }

    await displayImagePreview(file);
    const objectKey = await uploadFile(assetType, file);
    setObjectKey(objectKey);
  };

  const displayImagePreview = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setShowSizeError(false);
        resolve();
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <div>
      {/* File Input */}
      <Input
        id="picture"
        type="file"
        accept={ASSET_CONFIGS[assetType].acceptedTypes.join(',')}
        onChange={handleFileChange}
      />

      {/* Error Alert */}
      {showSizeError && (
        <FileSizeErrorAlert maxSizeMB={ASSET_CONFIGS[assetType].maxSize} />
      )}

      {isPolling && (
        <div>
          File Processing...
          <button
            onClick={() => setIsFileProcessing(false)}
            className="ml-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel Processing
          </button>
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="mt-5">
          <Image
            src={selectedImage}
            alt="Preview"
            width={400}
            height={400}
            style={{ width: '100%', height: 'auto' }}
            className="object-contain"
          />
        </div>
      )}

      {!isFileProcessing && Object.values(rgbImages).some(Boolean) && (
        <div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {Object.entries(rgbImages).map(
              ([color, url]) =>
                url && (
                  <div key={color} className="flex flex-col items-center">
                    <h3 className="capitalize mb-2">{color} Channel</h3>
                    <Image
                      src={url}
                      alt={`${color} channel`}
                      width={200}
                      height={200}
                      style={{ width: '100%', height: 'auto' }}
                      className="object-contain"
                    />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
