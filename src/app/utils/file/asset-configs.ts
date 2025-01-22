export type AssetType = 'RGB_SPLITTING';

interface AssetConfig {
  maxSize: number;
  acceptedTypes: string[];
  bucketName: string;
}

export const ASSET_CONFIGS: Record<AssetType, AssetConfig> = {
  RGB_SPLITTING: {
    maxSize: 5 * 1024 * 1024,
    acceptedTypes: ['image/*'],
    bucketName: 'rgb-splitting-bucket',
  },
};
