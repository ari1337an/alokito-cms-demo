import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface Slide {
  id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  buttonVariant: string
  imageUrl: string
  backgroundColor: string
}

interface SlidesListProps {
  slides: Slide[]
  onSelectSlide: (index: number) => void
  onDeleteSlide: (index: number, id: string) => void
}

export function SlidesList({ slides, onSelectSlide, onDeleteSlide }: SlidesListProps) {
  return (
    <div className="grid gap-4">
      {slides.map((slide, index) => (
        <Card key={slide.id} className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold truncate">{slide.title}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSelectSlide(index)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteSlide(index, slide.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 