"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import SlidesList from "./components/slides-list";
import { SlideEditor } from "./components/slide-editor";
import { Slide } from "./components/types";

export default function CMSEdit() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/cms");
        const data = await response.json();
        
        if (data.slides && Array.isArray(data.slides)) {
          setSlides(data.slides);
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Math.random().toString(),
      title: "New Slide",
      description: "This is a new slide. Edit it to customize the content.",
      buttonText: "Learn More",
      buttonLink: "#",
      buttonVariant: "default",
      buttonIcon: "",
      buttonIconSize: 16,
      buttonIconColor: "",
      buttonGap: 8,
      buttonPaddingTop: 8,
      buttonPaddingBottom: 8,
      buttonPaddingLeft: 16,
      buttonPaddingRight: 16,
      buttonBgColor: "#3b82f6",
      buttonTextColor: "#ffffff",
      buttonWidth: "auto",
      buttonCustomWidth: 200,
      
      imageUrl: "/placeholder-image.jpg",
      imageFit: "cover",
      imageBackground: "transparent",
      imageBackgroundColor: "#000000",
      backgroundColor: "bg-white dark:bg-gray-950",
      imageMargin: "0",
      imagePaddingTop: 0,
      imagePaddingBottom: 0,
      imagePaddingLeft: 0,
      imagePaddingRight: 0,
      
      heroImageUrl: "/placeholder-hero.jpg",
      heroImageFit: "cover",
      heroImageBackground: "transparent",
      heroImageBackgroundColor: "#000000",
      heroImageMargin: "0",
      heroImageMarginTop: 0,
      heroImageMarginBottom: 0,
      heroImageMarginLeft: 0,
      heroImageMarginRight: 0,
      heroImagePaddingTop: 0,
      heroImagePaddingBottom: 0,
      heroImagePaddingLeft: 0,
      heroImagePaddingRight: 0,
      
      contentPaddingX: 4,
      contentPaddingY: 6,
      contentFont: "sans",
      
      containerMarginTop: 0,
      containerMarginBottom: 0,
      containerMarginLeft: 0,
      containerMarginRight: 0,
      containerPaddingTop: 0,
      containerPaddingBottom: 0,
      containerPaddingLeft: 0,
      containerPaddingRight: 0,
      
      titleFontSize: 48,
      titleFontWeight: 700,
      descriptionFontSize: 18,
      descriptionFontWeight: 400,
      titleColor: "#000000",
      descriptionColor: "#666666",
      
      titlePaddingTop: 0,
      titlePaddingBottom: 0,
      titlePaddingLeft: 0,
      titlePaddingRight: 0,
      descriptionPaddingTop: 0,
      descriptionPaddingBottom: 0,
      descriptionPaddingLeft: 0,
      descriptionPaddingRight: 0,
      titleMarginTop: 0,
      titleMarginBottom: 16,
      titleMarginLeft: 0,
      titleMarginRight: 0,
      descriptionMarginTop: 0,
      descriptionMarginBottom: 24,
      descriptionMarginLeft: 0,
      descriptionMarginRight: 0,
    };
    
    setSlides((prev) => [...prev, newSlide]);
    setSelectedSlideIndex(slides.length);
  };

  const handleSlideChange = async (index: number, updatedSlide: Slide) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
    
    try {
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides: [...slides.slice(0, index), updatedSlide, ...slides.slice(index+1)] }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save slide");
      }
      
      const data = await response.json();
      setSlides(data.slides);
      
      setSelectedSlideIndex(null);
      
      alert("Slide saved successfully!");
    } catch (error) {
      console.error("Error saving slide:", error);
      alert("Failed to save slide. Please try again.");
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save slides");
      }
      
      const data = await response.json();
      setSlides(data.slides);
      alert("All changes saved successfully!");
    } catch (error) {
      console.error("Error saving slides:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSlide = async (index: number, id: string) => {
    try {
      if (id) {
        await fetch("/api/cms", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
      }
      setSlides((prev) => prev.filter((_, i) => i !== index));
      setSelectedSlideIndex(null);
    } catch (error) {
      console.error("Failed to delete slide:", error);
      alert("Failed to delete slide");
    }
  };

  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">CMS Editor</h1>
            <div className="flex space-x-2">
              <Button onClick={handleAddSlide}>
                <Plus className="h-4 w-4 mr-2" />
                Add Slide
              </Button>
              <Button onClick={handleSaveAll} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedSlideIndex !== null ? (
          <div className="h-screen">
            <div className="flex items-center gap-4 p-4 border-b bg-background ml-20">
              <Button variant="ghost" onClick={() => setSelectedSlideIndex(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Slides
              </Button>
              <h1 className="text-2xl font-bold">
                Edit Slide {selectedSlideIndex + 1}
              </h1>
            </div>
            <SlideEditor
              slide={slides[selectedSlideIndex]}
              onSave={(updatedSlide) => handleSlideChange(selectedSlideIndex, updatedSlide)}
              onCancel={() => setSelectedSlideIndex(null)}
            />
          </div>
        ) : (
          <SlidesList
            slides={slides}
            onSelectSlide={setSelectedSlideIndex}
            onDeleteSlide={handleDeleteSlide}
          />
        )}
      </main>
    </div>
  );
}
