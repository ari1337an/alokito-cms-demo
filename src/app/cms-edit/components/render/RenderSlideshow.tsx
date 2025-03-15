"use client";

import { useState, useEffect, useRef } from "react";
import { Slide } from "@/app/cms-edit/components/types";
import RenderSlide from "./RenderSlide";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RenderSlideshowProps {
  slides: Slide[];
  showEditButton?: boolean;
  autoAdvance?: boolean;
  interval?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export default function RenderSlideshow({
  slides,
  showEditButton = false,
  autoAdvance = true,
  interval = 5000,
  fullWidth = true,
  fullHeight = true,
}: RenderSlideshowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Function to go to the next slide with animation
  const goToNextSlide = () => {
    if (isTransitioning || !slides.length) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  // Function to go to the previous slide with animation
  const goToPreviousSlide = () => {
    if (isTransitioning || !slides.length) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  // Set up auto-sliding
  useEffect(() => {
    if (!autoAdvance || !slides.length) return;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (!isPaused) {
          goToNextSlide();
        }
      }, interval);
    };

    startTimer();

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, slides.length, autoAdvance, interval]);

  // Reset timer when manually changing slides
  const resetTimer = () => {
    if (!autoAdvance || !timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        goToNextSlide();
      }
    }, interval);
  };

  // Handle manual navigation
  const handlePrevious = () => {
    goToPreviousSlide();
    resetTimer();
  };

  const handleNext = () => {
    goToNextSlide();
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    if (index === currentSlideIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex(index);
      setIsTransitioning(false);
    }, 300);
    resetTimer();
  };

  if (!slides.length) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <div
      ref={slideshowRef}
      className={cn(
        "relative flex flex-col",
        fullWidth && "w-full",
        fullHeight && "h-full"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edit button (top right) */}
      {showEditButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-all duration-200"
          onClick={() => (window.location.href = "/cms-edit")}
          aria-label="Edit slides"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}

      {/* Slide content - full width */}
      <div className="flex-1 flex items-center justify-center w-full h-full overflow-hidden">
        <div
          className={cn(
            "w-full h-full transition-opacity duration-300 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          <RenderSlide slide={currentSlide} />
        </div>
      </div>

      {/* Navigation arrows (left/right sides) - sized proportionally */}
      {slides.length > 1 && (
        <>
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
            <button
              className="group flex items-center justify-center rounded-full p-2 bg-background/70 backdrop-blur-sm shadow-md hover:bg-background/90 transition-all duration-200"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-7 w-7 text-foreground/70 group-hover:text-foreground" />
            </button>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30">
            <button
              className="group flex items-center justify-center rounded-full p-2 bg-background/70 backdrop-blur-sm shadow-md hover:bg-background/90 transition-all duration-200"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-7 w-7 text-foreground/70 group-hover:text-foreground" />
            </button>
          </div>

          {/* Slide indicators (bottom center) - compact and scaled appropriately */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "rounded-full transition-all duration-300 ring-[#F7B546]",
                    index === currentSlideIndex
                      ? "bg-primary w-4 h-4 ring-2 ring-offset-1 ring-offset-background/10"
                      : "bg-background/70 w-3 h-3 hover:bg-background/90 ring-1 hover:ring-2"
                  )}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
