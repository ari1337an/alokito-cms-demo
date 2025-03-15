"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import SlidesList from "./components/slides-list";
import { SlideEditor } from "./components/slide-editor";
import { Slide } from "./components/types";

export default function CMSEdit() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides);
        }
      })
      .catch((error) => console.error("Failed to fetch slides:", error));
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
      buttonGap: 8,
      buttonPaddingTop: 8,
      buttonPaddingBottom: 8,
      buttonPaddingLeft: 16,
      buttonPaddingRight: 16,
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
      heroImagePaddingTop: 0,
      heroImagePaddingBottom: 0,
      heroImagePaddingLeft: 0,
      heroImagePaddingRight: 0,
      contentPaddingX: 4,
      contentPaddingY: 6,
      contentFont: "sans",
      titleFontSize: 48,
      titleFontWeight: 700,
      descriptionFontSize: 18,
      descriptionFontWeight: 400,
      titleColor: "#000000",
      descriptionColor: "#666666",
      buttonBgColor: "#3b82f6",
      buttonTextColor: "#ffffff",
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

  const handleSlideChange = (index: number, updatedSlide: Slide) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[index] = updatedSlide;
      return newSlides;
    });
  };

  const handleSave = async () => {
    try {
      await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      alert("Saved successfully!");
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save changes");
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
    <div className="min-h-screen bg-gray-50">
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
            onSave={(updatedSlide) => {
              handleSlideChange(selectedSlideIndex, updatedSlide);
              setSelectedSlideIndex(null);
            }}
            onCancel={() => setSelectedSlideIndex(null)}
          />
        </div>
      ) : (
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">CMS Editor</h1>
            <div className="flex gap-4">
              <Button onClick={handleAddSlide} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Slide
              </Button>
              <Button onClick={handleSave}>Save All Changes</Button>
            </div>
          </div>

          <SlidesList
            slides={slides}
            onSelectSlide={setSelectedSlideIndex}
            onDeleteSlide={handleDeleteSlide}
          />
        </div>
      )}
    </div>
  );
}
