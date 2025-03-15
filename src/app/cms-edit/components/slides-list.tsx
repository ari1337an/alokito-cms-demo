import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Slide } from "./types";
import RenderSlide from "./render/RenderSlide";

interface SlidesListProps {
  slides: Slide[];
  onSelectSlide: (index: number) => void;
  onDeleteSlide: (index: number, id: string) => void;
}

export default function SlidesList({ slides, onSelectSlide, onDeleteSlide }: SlidesListProps) {
  return (
    <div className="grid gap-6">
      {slides.map((slide, index) => (
        <Card key={slide.id || Math.random().toString()}>
          <CardContent className="pt-6">
            <div className="relative">
              <RenderSlide slide={slide} isPreview={true} />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelectSlide(index)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteSlide(index, slide.id || '')}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
