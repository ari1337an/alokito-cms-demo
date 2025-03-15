import { cn } from "@/lib/utils";
import { Slide } from "../types";
import RenderContent from "./RenderContent";
import RenderHeroImage from "./RenderHeroImage";
import RenderBackground from "./RenderBackground";

interface RenderSlideProps {
  slide: Slide;
  isPreview?: boolean;
}

export default function RenderSlide({ slide, isPreview = false }: RenderSlideProps) {
  return (
    <div className={cn(
      "relative",
      isPreview && "ring-2 ring-gray-200 dark:ring-gray-800 rounded-lg overflow-hidden"
    )}>
      <div className={`relative ${slide.backgroundColor} min-h-[600px] flex items-center`}>
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

        {/* Content and Hero Image */}
        <div
          className="container relative mx-auto grid md:grid-cols-2 gap-8 items-center"
          style={{
            paddingLeft: `${slide.contentPaddingX * 4}px`,
            paddingRight: `${slide.contentPaddingX * 4}px`,
            paddingTop: `${slide.contentPaddingY * 4}px`,
            paddingBottom: `${slide.contentPaddingY * 4}px`,
          }}
        >
          {/* Content Section */}
          <RenderContent slide={slide} />

          {/* Hero Image */}
          {slide.heroImageUrl && (
            <RenderHeroImage
              heroImageUrl={slide.heroImageUrl}
              heroImageFit={slide.heroImageFit}
              heroImageBackground={slide.heroImageBackground}
              heroImageBackgroundColor={slide.heroImageBackgroundColor}
              heroImageMargin={slide.heroImageMargin}
              heroImagePaddingTop={slide.heroImagePaddingTop}
              heroImagePaddingBottom={slide.heroImagePaddingBottom}
              heroImagePaddingLeft={slide.heroImagePaddingLeft}
              heroImagePaddingRight={slide.heroImagePaddingRight}
            />
          )}
        </div>
      </div>
    </div>
  );
} 