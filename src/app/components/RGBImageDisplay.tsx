import Image from 'next/image';
import { Spinner } from '@/components/spinner';

type RGBImages = {
  red: string | null;
  green: string | null;
  blue: string | null;
};

type ImageLoadingStates = {
  red: boolean;
  green: boolean;
  blue: boolean;
};

interface RGBImageDisplayProps {
  rgbImages: RGBImages;
  imageLoadingStates: ImageLoadingStates;
  setImageLoadingStates: React.Dispatch<
    React.SetStateAction<ImageLoadingStates>
  >;
}

export function RGBImageDisplay({
  rgbImages,
  imageLoadingStates,
  setImageLoadingStates,
}: RGBImageDisplayProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Object.entries(rgbImages).map(
          ([color, url]) =>
            url && (
              <div key={color} className="flex flex-col items-center">
                <h3 className="capitalize mb-2">{color} Channel</h3>
                {imageLoadingStates[
                  color as keyof typeof imageLoadingStates
                ] && <Spinner />}
                <Image
                  src={url}
                  alt={`${color} channel`}
                  width={200}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                  className="object-contain"
                  onLoad={() =>
                    setImageLoadingStates((prev) => ({
                      ...prev,
                      [color]: false,
                    }))
                  }
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
