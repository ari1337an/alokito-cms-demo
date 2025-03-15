"use client";

import { Suspense } from "react";
import { useSlides } from "@/hooks/useSlides";
import RenderSlideshow from "@/app/cms-edit/components/render/RenderSlideshow";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton component for slideshow
function SlideShowSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Hero section skeleton */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-gray-100 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 opacity-50" />

        {/* Content skeleton */}
        <div className="w-full max-w-6xl mx-auto px-6 py-16 z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              {/* Title skeleton */}
              <Skeleton className="h-12 w-3/4 rounded-lg" />

              {/* Description skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-10/12 rounded" />
                <Skeleton className="h-4 w-9/12 rounded" />
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-10 w-32 mt-6 rounded-md" />
            </div>

            {/* Image skeleton */}
            <div className="w-full md:w-1/2 aspect-square rounded-lg">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation controls skeleton */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-background/20">
        <div className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
        </div>
      </div>

      {/* Navigation arrows skeleton */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
        <Skeleton className="w-11 h-11 rounded-full" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30">
        <Skeleton className="w-11 h-11 rounded-full" />
      </div>
    </div>
  );
}

// Main slideshow content component
function SlideShowContent() {
  const { slides, error, isLoaded } = useSlides();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-center text-red-500">
          Error loading slides
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-md">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  // Only show "No slides available" if we've completed loading and still have no slides
  if (isLoaded && !slides.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-center">No slides available</h2>
        <p className="mt-4 text-muted-foreground text-center max-w-md">
          There are no slides to display. Please add some content in the CMS.
        </p>
      </div>
    );
  }

  return (
    <RenderSlideshow
      slides={slides}
      showEditButton={false}
      autoAdvance={true}
      interval={5000}
      fullWidth={true}
      fullHeight={true}
    />
  );
}

// Main client slideshow component with suspense
export default function ClientSlideshow() {
  return (
    <Suspense fallback={<SlideShowSkeleton />}>
      <SlideShowContent />
    </Suspense>
  );
}
