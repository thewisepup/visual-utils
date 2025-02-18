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
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [objectKey, setObjectKey] = useState<string | null>(null);

  const getFileProcessingState = async (objectKey: string | null) => {
    if (!objectKey) return false;
    //api call

    const isDoneProcessing = false;
    if (isDoneProcessing) {
      setIsFileProcessing(false);
      setIsProcessingComplete(true);
    }
    console.log('polling with objectKey: ', objectKey);
    return isDoneProcessing;
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
          <button
            onClick={() => {
              setIsFileProcessing(false);
              setIsProcessingComplete(true);
            }}
            className="ml-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Complete Processing
          </button>
        </div>
      )}

      {isProcessingComplete && <div>Processing Complete</div>}

      {/* Image Preview */}
      {selectedImage && (
        <div className="mt-5">
          <Image
            src={selectedImage}
            alt="Preview"
            width={400}
            height={400}
            className="max-w-full h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
}
