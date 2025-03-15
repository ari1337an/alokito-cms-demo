"use client";

import { useState, useEffect } from "react";
import { Slide } from "@/app/cms-edit/components/types";

// Cache for slides data
let slidesCache: {
  status: 'pending' | 'success' | 'error';
  data?: Slide[];
  error?: string;
  promise?: Promise<void>;
} = {
  status: 'pending',
  promise: undefined,
};

// Function to fetch slides data
function fetchSlidesData() {
  if (!slidesCache.promise) {
    slidesCache.promise = fetch("/api/cms")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        return response.json();
      })
      .then(data => {
        slidesCache.status = 'success';
        slidesCache.data = data.slides || [];
      })
      .catch(error => {
        slidesCache.status = 'error';
        slidesCache.error = error instanceof Error ? error.message : "An error occurred";
        // Clear the promise so we can retry
        slidesCache.promise = undefined;
      });
  }
  return slidesCache.promise;
}

// Hook that works with suspense
export function useSlides() {
  const [, setForceUpdate] = useState({});

  useEffect(() => {
    // If we need to refetch, reset the cache
    if (slidesCache.status === 'error') {
      slidesCache = {
        status: 'pending',
        promise: undefined,
      };
    }
    
    // This is safe to call in useEffect (after mounting)
    if (slidesCache.status === 'pending') {
      fetchSlidesData().then(() => setForceUpdate({}));
    }
  }, []);

  // Only throw during render if we're still pending and have a promise
  if (slidesCache.status === 'pending' && slidesCache.promise) {
    throw slidesCache.promise;
  }

  // Return isLoaded flag to indicate if data fetch is complete
  const isLoaded = slidesCache.status === 'success' || slidesCache.status === 'error';
  
  if (slidesCache.status === 'error') {
    return { slides: [], error: slidesCache.error, isLoaded };
  }

  return { slides: slidesCache.data || [], error: null, isLoaded };
} 