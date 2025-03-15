import { cn } from "@/lib/utils";
import { Slide } from "../types";
import RenderContent from "./RenderContent";
import RenderHeroImage from "./RenderHeroImage";
import RenderBackground from "./RenderBackground";

interface RenderSlideProps {
  slide: Slide;
  isPreview?: boolean;
}

export default function RenderSlide({
  slide,
  isPreview = false,
}: RenderSlideProps) {
  return (
    <div
      className={cn(
        "relative",
        isPreview &&
          "ring-2 ring-gray-200 dark:ring-gray-800 rounded-lg overflow-hidden"
      )}
    >
      <div
        className={`relative ${slide.backgroundColor} min-h-[600px] flex items-center justify-center`}
      >
        {/* Background Image */}
        <RenderBackground
          imageUrl={slide.imageUrl}
          imageFit={slide.imageFit}
          imageBackground={slide.imageBackground}
          imageBackgroundColor={slide.imageBackgroundColor}
          imageMargin={slide.imageMargin}
          imagePaddingTop={slide.imagePaddingTop}
          imagePaddingBottom={slide.imagePaddingBottom}
          imagePaddingLeft={slide.imagePaddingLeft}
          imagePaddingRight={slide.imagePaddingRight}
        />

        {/* Content and Hero Image Container */}
        <div
          className="container relative mx-auto flex flex-col md:flex-row justify-between items-center gap-8 w-full"
          style={{
            // Apply container margin
            marginTop: `${slide.containerMarginTop || 0}px`,
            marginBottom: `${slide.containerMarginBottom || 0}px`,
            marginLeft: `${slide.containerMarginLeft || 0}px`,
            marginRight: `${slide.containerMarginRight || 0}px`,
            // Apply container padding
            paddingTop: `${
              (slide.containerPaddingTop || slide.contentPaddingY || 0) * 4
            }px`,
            paddingBottom: `${
              (slide.containerPaddingBottom || slide.contentPaddingY || 0) * 4
            }px`,
            paddingLeft: `${
              (slide.containerPaddingLeft || slide.contentPaddingX || 0) * 4
            }px`,
            paddingRight: `${
              (slide.containerPaddingRight || slide.contentPaddingX || 0) * 4
            }px`,
          }}
        >
          {/* Content Section */}
          <div className="w-full md:flex-1 md:max-w-[50%]">
            <RenderContent slide={slide} />
          </div>

          {/* Hero Image */}
          {slide.heroImageUrl && (
            <div className="w-full md:flex-1 md:max-w-[50%]">
              <RenderHeroImage
                heroImageUrl={slide.heroImageUrl}
                heroImageFit={slide.heroImageFit}
                heroImageBackground={slide.heroImageBackground}
                heroImageBackgroundColor={slide.heroImageBackgroundColor}
                heroImageMarginTop={slide.heroImageMarginTop}
                heroImageMarginBottom={slide.heroImageMarginBottom}
                heroImageMarginLeft={slide.heroImageMarginLeft}
                heroImageMarginRight={slide.heroImageMarginRight}
                heroImagePaddingTop={slide.heroImagePaddingTop}
                heroImagePaddingBottom={slide.heroImagePaddingBottom}
                heroImagePaddingLeft={slide.heroImagePaddingLeft}
                heroImagePaddingRight={slide.heroImagePaddingRight}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
