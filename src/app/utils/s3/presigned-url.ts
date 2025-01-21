import { ASSET_CONFIGS, AssetType } from "../file/asset-configs";

export const getPresignedUrl = async (assetType: AssetType) => {
    const bucketName:string =  ASSET_CONFIGS[assetType].bucketName;
  //depending on assetType, genereate presigned url for that specific bucket
  return "mock presigned url for " + bucketName;
};
