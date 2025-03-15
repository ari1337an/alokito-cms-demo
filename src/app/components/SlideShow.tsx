/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { Slide } from "@/app/cms-edit/components/types";
import RenderSlide from "@/app/cms-edit/components/render/RenderSlide";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SlideShow({ slides }: { slides: Slide[] }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to go to the next slide with animation
  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };
  
  // Function to go to the previous slide with animation
  const goToPreviousSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };
  
  // Set up auto-sliding
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (!isPaused) {
          goToNextSlide();
        }
      }, 5000);
    };
    
    startTimer();
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, slides.length]);
  
  // Reset timer when manually changing slides
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!isPaused) {
          goToNextSlide();
        }
      }, 5000);
    }
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
  
  const currentSlide = slides[currentSlideIndex];
  
  if (!slides.length) return null;
  
  return (
    <div 
      className="relative h-full w-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edit button (top right) */}
      <Button 
        variant="outline" 
        size="icon"
        className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-all duration-200"
        onClick={() => window.location.href = '/cms-edit'}
        aria-label="Edit slides"
      >
        <Edit className="h-4 w-4" />
      </Button>
      
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
      
      {/* Navigation arrows (left/right sides) */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-all duration-200 z-20"
        onClick={handlePrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-all duration-200 z-20"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Slide indicators (bottom center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlideIndex 
                ? "bg-primary w-5" 
                : "bg-background/40 hover:bg-background/60 backdrop-blur-sm"
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 