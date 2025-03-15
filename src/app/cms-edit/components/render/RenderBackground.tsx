/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

interface RenderBackgroundProps {
  imageUrl?: string;
  imageFit?: string;
  imageBackground?: string;
  imageBackgroundColor?: string;
  imageMargin?: string | number;
  imagePaddingTop?: number;
  imagePaddingBottom?: number;
  imagePaddingLeft?: number;
  imagePaddingRight?: number;
}

export default function RenderBackground({
  imageUrl,
  imageFit = "cover",
  imageBackground = "transparent",
  imageBackgroundColor,
  imageMargin = 0,
  imagePaddingTop = 0,
  imagePaddingBottom = 0,
  imagePaddingLeft = 0,
  imagePaddingRight = 0,
}: RenderBackgroundProps) {
  if (!imageUrl) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden",
        imageBackground === "transparent" &&
          "bg-[url('/checkered-pattern.png')] bg-repeat"
      )}
      style={
        imageBackground === "solid"
          ? {
              backgroundColor: imageBackgroundColor,
            }
          : undefined
      }
    >
      <img
        src={imageUrl}
        alt="Background"
        className="w-full h-full"
        style={{
          objectFit: imageFit as any,
          margin:
            typeof imageMargin === "number" ? `${imageMargin}px` : imageMargin,
          padding: `${imagePaddingTop}px ${imagePaddingRight}px ${imagePaddingBottom}px ${imagePaddingLeft}px`,
        }}
      />
    </div>
  );
}
