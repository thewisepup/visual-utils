import { AssetType } from './asset-configs';
import { isAssetSizeValid } from './file-validation';

export const uploadFile = async (
  assetType: AssetType,
  file: File
): Promise<string> => {
  if (!isAssetSizeValid(assetType, file)) {
    console.log('file size is not valid');
    throw new Error('Invalid file size');
  }

  const objectKey = file.name;
  const response = await fetch(`/api/s3/rgb/upload-url?objectKey=${objectKey}`);
  const { presignedUrl } = await response.json();

  try {
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    return objectKey;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
