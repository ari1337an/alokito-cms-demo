import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch slides from database
  const slides = await prisma.slide.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className={`relative ${slide.backgroundColor} min-h-screen flex items-center`}
            >
              <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700">
                    {slide.description}
                  </p>
                  <Button
                    variant={slide.buttonVariant as Slide["buttonVariant"]}
                    asChild
                    className="text-lg"
                  >
                    <a href={slide.buttonLink}>{slide.buttonText}</a>
                  </Button>
                </div>
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.imageUrl}
                    alt="Hero"
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

interface Slide {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  imageUrl: string;
  backgroundColor: string;
}
