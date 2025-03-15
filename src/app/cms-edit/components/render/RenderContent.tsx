// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slide } from "../types";
import RenderButton from "./RenderButton";

interface RenderContentProps {
  slide: Slide;
  compact?: boolean;
}

export default function RenderContent({ slide, compact = false }: RenderContentProps) {
  return (
    <div className={cn("space-y-6", compact && "space-y-3")}>
      <h1
        className={cn(
          "leading-tight",
          `font-[${slide.contentFont}]`
        )}
        style={{
          fontSize: `${compact ? slide.titleFontSize / 2 : slide.titleFontSize}px`,
          fontWeight: slide.titleFontWeight,
          color: slide.titleColor,
          margin: `${slide.titleMarginTop}px ${slide.titleMarginRight}px ${slide.titleMarginBottom}px ${slide.titleMarginLeft}px`,
          padding: `${slide.titlePaddingTop}px ${slide.titlePaddingRight}px ${slide.titlePaddingBottom}px ${slide.titlePaddingLeft}px`,
        }}
      >
        {slide.title}
      </h1>
      <p
        className={cn(`font-[${slide.contentFont}]`)}
        style={{
          fontSize: `${compact ? slide.descriptionFontSize / 1.5 : slide.descriptionFontSize}px`,
          fontWeight: slide.descriptionFontWeight,
          color: slide.descriptionColor,
          margin: `${slide.descriptionMarginTop}px ${slide.descriptionMarginRight}px ${slide.descriptionMarginBottom}px ${slide.descriptionMarginLeft}px`,
          padding: `${slide.descriptionPaddingTop}px ${slide.descriptionPaddingRight}px ${slide.descriptionPaddingBottom}px ${slide.descriptionPaddingLeft}px`,
        }}
      >
        {slide.description}
      </p>
      
      <RenderButton 
        buttonText={slide.buttonText}
        buttonLink={slide.buttonLink}
        buttonVariant={slide.buttonVariant}
        buttonIcon={slide.buttonIcon}
        buttonIconSize={slide.buttonIconSize}
        buttonIconColor={slide.buttonIconColor}
        buttonGap={slide.buttonGap}
        buttonPaddingTop={slide.buttonPaddingTop}
        buttonPaddingBottom={slide.buttonPaddingBottom}
        buttonPaddingLeft={slide.buttonPaddingLeft}
        buttonPaddingRight={slide.buttonPaddingRight}
        buttonBgColor={slide.buttonBgColor}
        buttonTextColor={slide.buttonTextColor}
        buttonWidth={slide.buttonWidth}
        buttonCustomWidth={slide.buttonCustomWidth}
        contentFont={slide.contentFont}
        compact={compact}
      />
    </div>
  );
} 