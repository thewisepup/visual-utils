"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ASSET_CONFIGS, AssetType } from "../utils/file/asset-configs";
import { uploadFile } from "../utils/file/file-upload";
import { isAssetSizeValid } from "../utils/file/file-validation";

export type FileUploaderProps = {
  assetType: AssetType;
};

export default function FileUploader({ assetType }: FileUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | null = event.target.files?.[0] ?? null;
    if (file) {
      if (!isAssetSizeValid(assetType, file)) {
        setShowSizeError(true);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setShowSizeError(false);
      };
      reader.readAsDataURL(file);

      uploadFile(assetType, file);
    }
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <Input
        id="picture"
        type="file"
        accept={ASSET_CONFIGS[assetType].acceptedTypes.join(",")}
        onChange={handleFileChange}
      />
      {showSizeError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            File Upload Size Too Big {ASSET_CONFIGS[assetType].maxSize}MB
          </AlertDescription>
        </Alert>
      )}
      {selectedImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}
    </div>
  );
}
