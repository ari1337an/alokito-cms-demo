"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { SlidesList } from "./components/slides-list";
import { SlideEditor } from "./components/slide-editor";

interface SlideContent {
  id?: string;
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
    | "link"
    | "primary"
    | "custom";
  buttonIcon: string;
  buttonIconSize: number;
  buttonGap: number;
  imageUrl: string;
  imageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageBackground: "transparent" | "solid";
  imageBackgroundColor?: string;
  backgroundColor: string;
  imageMargin: string;
  imagePadding: string;
  buttonPaddingX: number;
  buttonPaddingY: number;
  heroImageUrl: string;
  heroImageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  heroImageBackground: "transparent" | "solid";
  heroImageBackgroundColor?: string;
  heroImageMargin: string;
  heroImagePadding: string;
  contentPaddingX: number;
  contentPaddingY: number;
  contentFont: string;
  titleFontSize: number;
  titleFontWeight: number;
  descriptionFontSize: number;
  descriptionFontWeight: number;
  titleColor: string;
  descriptionColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

export default function CMSEdit() {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(
    null
  );

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
    const newSlide: SlideContent = {
      title: "New Slide",
      description: "Add your description here",
      buttonText: "Click Here",
      buttonLink: "/",
      buttonVariant: "primary",
      buttonIcon: "ArrowRight",
      buttonIconSize: 16,
      buttonGap: 2,
      imageUrl: "https://alokitoteachers.com/bg-assets.svg",
      imageFit: "cover",
      imageBackground: "transparent",
      imageBackgroundColor: "",
      imageMargin: "",
      imagePadding: "",
      buttonPaddingX: 4,
      buttonPaddingY: 2,
      heroImageUrl: "https://alokitoteachers.com/hero-image.png",
      heroImageFit: "cover",
      heroImageBackground: "transparent",
      heroImageBackgroundColor: "",
      heroImageMargin: "",
      heroImagePadding: "",
      contentPaddingX: 4,
      contentPaddingY: 4,
      contentFont: "Inter",
      titleFontSize: 48,
      titleFontWeight: 700,
      descriptionFontSize: 18,
      descriptionFontWeight: 400,
      titleColor: "#000000",
      descriptionColor: "#374151",
      buttonBgColor: "#000000",
      buttonTextColor: "#ffffff",
      backgroundColor: "",
    };
    setSlides((prev) => [...prev, newSlide]);
    setSelectedSlideIndex(slides.length);
  };

  const handleSlideChange = (index: number, updatedSlide: SlideContent) => {
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
        <div className="container mx-auto py-8">
          <div className="flex items-center gap-4 mb-8">
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
