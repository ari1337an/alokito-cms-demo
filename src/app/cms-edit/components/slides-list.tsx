import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Slide } from "./types";
import RenderSlide from "./render/RenderSlide";
import RenderHeroImage from "./render/RenderHeroImage";
import Link from "next/link";

interface SlidesListProps {
  slides: Slide[];
  onSelectSlide: (index: number) => void;
  onDeleteSlide: (index: number, id: string) => void;
}

export default function SlidesList({ slides, onDeleteSlide }: SlidesListProps) {
  return (
    <div className="grid gap-8">
      {slides.map((slide, index) => (
        <Card
          key={slide.id || Math.random().toString()}
          className="overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[3fr_1fr] gap-4">
              {/* Preview */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 h-[300px] overflow-auto">
                <RenderSlide slide={slide} isPreview={true} />
              </div>

              {/* Info and actions */}
              <div className="p-4 flex flex-col">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {slide.description}
                  </p>
                </div>

                {slide.heroImageUrl && (
                  <div className="w-full md:w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden border">
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

                <div className="mt-auto pt-4 flex gap-2">
                  {/* Use direct link instead of opening in the same page */}
                  <Link href={`/cms-edit/${slide.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteSlide(index, slide.id || "")}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
