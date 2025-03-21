/* eslint-disable @typescript-eslint/no-explicit-any */

interface RenderHeroImageProps {
  heroImageUrl: string;
  heroImageFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  heroImageBackground?: "transparent" | "solid";
  heroImageBackgroundColor?: string;
  heroImageMarginTop?: number;
  heroImageMarginBottom?: number;
  heroImageMarginLeft?: number;
  heroImageMarginRight?: number;
  heroImagePaddingTop?: number;
  heroImagePaddingBottom?: number;
  heroImagePaddingLeft?: number;
  heroImagePaddingRight?: number;
}

export default function RenderHeroImage({
  heroImageUrl,
  heroImageFit = "cover",
  heroImageBackground = "transparent",
  heroImageBackgroundColor,
  heroImageMarginTop = 0,
  heroImageMarginBottom = 0,
  heroImageMarginLeft = 0,
  heroImageMarginRight = 0,
  heroImagePaddingTop = 0,
  heroImagePaddingBottom = 0,
  heroImagePaddingLeft = 0,
  heroImagePaddingRight = 0,
}: RenderHeroImageProps) {
  if (!heroImageUrl) return null;

  return (
    <div
      className={`relative ${
        heroImageBackground === "transparent" &&
        "bg-[url('/checkered-pattern.png')] bg-repeat"
      }`}
      style={{
        backgroundColor:
          heroImageBackground === "solid"
            ? heroImageBackgroundColor
            : undefined,
        marginTop: `${heroImageMarginTop}px`,
        marginBottom: `${heroImageMarginBottom}px`,
        marginLeft: `${heroImageMarginLeft}px`,
        marginRight: `${heroImageMarginRight}px`,
        padding: `${heroImagePaddingTop}px ${heroImagePaddingRight}px ${heroImagePaddingBottom}px ${heroImagePaddingLeft}px`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImageUrl}
        alt="Hero image"
        className="w-full h-auto rounded"
        style={{
          objectFit: heroImageFit as any,
        }}
      />
    </div>
  );
}
