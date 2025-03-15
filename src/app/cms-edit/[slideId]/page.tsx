"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SlideEditor } from "../components/slide-editor";
import { Slide } from "../components/types";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditSlidePage() {
  const router = useRouter();
  const params = useParams();
  const slideId = params.slideId as string;

  const [slide, setSlide] = useState<Slide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cms");
        const data = await response.json();

        if (data.slides && Array.isArray(data.slides)) {
          const foundSlide = data.slides.find((s: Slide) => s.id === slideId);
          if (foundSlide) {
            setSlide(foundSlide);
          } else {
            // Slide not found, redirect to main page
            router.push("/cms-edit");
          }
        }
      } catch (error) {
        console.error("Failed to fetch slide:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slideId) {
      fetchSlide();
    }
  }, [slideId, router]);

  const handleSaveSlide = async (updatedSlide: Slide) => {
    try {
      setIsSaving(true);
      
      // Fetch all slides first
      const allSlidesResponse = await fetch("/api/cms");
      const allSlidesData = await allSlidesResponse.json();
      
      if (!allSlidesData.slides || !Array.isArray(allSlidesData.slides)) {
        throw new Error("Failed to fetch slides");
      }
      
      // Find the index of the slide we're updating
      const slideIndex = allSlidesData.slides.findIndex(
        (s: Slide) => s.id === slideId
      );
      
      if (slideIndex === -1) {
        throw new Error("Slide not found");
      }
      
      // Create new array with the updated slide
      const updatedSlides = [...allSlidesData.slides];
      updatedSlides[slideIndex] = updatedSlide;
      
      // Save all slides
      const saveResponse = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides: updatedSlides }),
      });
      
      if (!saveResponse.ok) {
        throw new Error("Failed to save slide");
      }
      
      // Get the saved data from response
      const savedData = await saveResponse.json();
      
      // Find the updated slide in the response
      const savedSlide = savedData.slides.find((s: Slide) => s.id === slideId);
      
      if (savedSlide) {
        // Update the local state with the saved slide
        setSlide(savedSlide);
      }
      
      // Show success message without redirecting
      alert("Slide saved successfully!");
      
      // Note: Removed the router.push("/cms-edit") to stay on this page
    } catch (error) {
      console.error("Error saving slide:", error);
      alert("Failed to save slide. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading slide...</p>
        </div>
      </div>
    );
  }

  if (!slide) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Slide not found</p>
          <Link href="/cms-edit">
            <Button className="mt-4">Return to Slides List</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center p-4 border-b bg-background ml-20">
        <Link href="/cms-edit">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            Back to Slides
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Slide: {slide.title}</h1>
      </div>

      <SlideEditor
        slide={slide}
        onSave={handleSaveSlide}
        onCancel={() => router.push("/cms-edit")}
        isSaving={isSaving}
      />
    </div>
  );
}
