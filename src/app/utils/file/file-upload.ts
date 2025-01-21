import { getPresignedUrl } from "../s3/presigned-url";
import { AssetType } from "./asset-configs";
import { isAssetSizeValid } from "./file-validation";

export const uploadFile = async (assetType: AssetType, file: File) => {
  if (!isAssetSizeValid(assetType, file)) {
    console.log("file size is not valid");
    return;
  }
  const presignedUrl = await getPresignedUrl(assetType);
  console.log("upload it to s3 with presigned url " + presignedUrl);
};
