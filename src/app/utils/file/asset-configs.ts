export type AssetType = "RGB_SPLITTING";

interface AssetConfig {
    maxSize: number;
    acceptedTypes: string[];
    bucketName: string;
  }
  
  export const ASSET_CONFIGS: Record<AssetType, AssetConfig> = {
    RGB_SPLITTING: {
      maxSize: 5 * 1024 * 1024, // 5MB TODO: update this to by a realistic value
      acceptedTypes: ["image/*"],
      bucketName: "rgb-splitting-bucket", //TODO: update this to be actual bucket name
    },
  };