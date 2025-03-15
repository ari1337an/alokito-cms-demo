/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Slide } from "@/app/cms-edit/components/types";

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json({ slides });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slides } = await request.json();
    
    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json(
        { error: "Invalid slides data" },
        { status: 400 }
      );
    }
    
    // Delete all existing slides first
    await prisma.slide.deleteMany({});
    
    // Create new slides
    const createdSlides = await Promise.all(
      slides.map(async (slide: Slide) => {
        // Remove any id to let Prisma generate a new one
        const { id, ...slideData } = slide;
        
        // Ensure all required fields have default values
        const data = {
          title: slideData.title || "Untitled Slide",
          description: slideData.description || "",
          buttonText: slideData.buttonText || "Learn More",
          buttonLink: slideData.buttonLink || "#",
          buttonVariant: slideData.buttonVariant || "default",
          buttonIcon: slideData.buttonIcon || "",
          buttonIconSize: slideData.buttonIconSize || 16,
          buttonIconColor: slideData.buttonIconColor || "",
          buttonGap: slideData.buttonGap || 8,
          buttonPaddingTop: slideData.buttonPaddingTop || 8,
          buttonPaddingBottom: slideData.buttonPaddingBottom || 8,
          buttonPaddingLeft: slideData.buttonPaddingLeft || 16,
          buttonPaddingRight: slideData.buttonPaddingRight || 16,
          buttonBgColor: slideData.buttonBgColor || "#000000",
          buttonTextColor: slideData.buttonTextColor || "#ffffff",
          buttonWidth: slideData.buttonWidth || "auto",
          buttonCustomWidth: slideData.buttonCustomWidth || 200,
          
          imageUrl: slideData.imageUrl || "",
          imageFit: slideData.imageFit || "cover",
          imageBackground: slideData.imageBackground || "transparent",
          imageBackgroundColor: slideData.imageBackgroundColor || "",
          backgroundColor: slideData.backgroundColor || "bg-white",
          imageMargin: slideData.imageMargin || "0",
          imagePaddingTop: slideData.imagePaddingTop || 0,
          imagePaddingBottom: slideData.imagePaddingBottom || 0,
          imagePaddingLeft: slideData.imagePaddingLeft || 0,
          imagePaddingRight: slideData.imagePaddingRight || 0,
          
          heroImageUrl: slideData.heroImageUrl || "",
          heroImageFit: slideData.heroImageFit || "cover",
          heroImageBackground: slideData.heroImageBackground || "transparent",
          heroImageBackgroundColor: slideData.heroImageBackgroundColor || "",
          heroImageMargin: slideData.heroImageMargin || "0",
          heroImageMarginTop: slideData.heroImageMarginTop || 0,
          heroImageMarginBottom: slideData.heroImageMarginBottom || 0,
          heroImageMarginLeft: slideData.heroImageMarginLeft || 0,
          heroImageMarginRight: slideData.heroImageMarginRight || 0,
          heroImagePaddingTop: slideData.heroImagePaddingTop || 0,
          heroImagePaddingBottom: slideData.heroImagePaddingBottom || 0,
          heroImagePaddingLeft: slideData.heroImagePaddingLeft || 0,
          heroImagePaddingRight: slideData.heroImagePaddingRight || 0,
          
          contentPaddingX: slideData.contentPaddingX || 4,
          contentPaddingY: slideData.contentPaddingY || 6,
          contentFont: slideData.contentFont || "sans",
          
          containerMarginTop: slideData.containerMarginTop || 0,
          containerMarginBottom: slideData.containerMarginBottom || 0,
          containerMarginLeft: slideData.containerMarginLeft || 0,
          containerMarginRight: slideData.containerMarginRight || 0,
          containerPaddingTop: slideData.containerPaddingTop || 0,
          containerPaddingBottom: slideData.containerPaddingBottom || 0,
          containerPaddingLeft: slideData.containerPaddingLeft || 0,
          containerPaddingRight: slideData.containerPaddingRight || 0,
          
          titleFontSize: slideData.titleFontSize || 48,
          titleFontWeight: slideData.titleFontWeight || 700,
          descriptionFontSize: slideData.descriptionFontSize || 18,
          descriptionFontWeight: slideData.descriptionFontWeight || 400,
          titleColor: slideData.titleColor || "#000000",
          descriptionColor: slideData.descriptionColor || "#666666",
          
          titlePaddingTop: slideData.titlePaddingTop || 0,
          titlePaddingBottom: slideData.titlePaddingBottom || 0,
          titlePaddingLeft: slideData.titlePaddingLeft || 0,
          titlePaddingRight: slideData.titlePaddingRight || 0,
          descriptionPaddingTop: slideData.descriptionPaddingTop || 0,
          descriptionPaddingBottom: slideData.descriptionPaddingBottom || 0,
          descriptionPaddingLeft: slideData.descriptionPaddingLeft || 0,
          descriptionPaddingRight: slideData.descriptionPaddingRight || 0,
          titleMarginTop: slideData.titleMarginTop || 0,
          titleMarginBottom: slideData.titleMarginBottom || 16,
          titleMarginLeft: slideData.titleMarginLeft || 0,
          titleMarginRight: slideData.titleMarginRight || 0,
          descriptionMarginTop: slideData.descriptionMarginTop || 0,
          descriptionMarginBottom: slideData.descriptionMarginBottom || 24,
          descriptionMarginLeft: slideData.descriptionMarginLeft || 0,
          descriptionMarginRight: slideData.descriptionMarginRight || 0,
        };
        
        return prisma.slide.create({ data });
      })
    );
    
    return NextResponse.json({ slides: createdSlides });
  } catch (error) {
    console.error("Error saving slides:", error);
    return NextResponse.json(
      { error: "Failed to save slides" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 }
      );
    }
    
    // Check if slide exists
    const slide = await prisma.slide.findUnique({
      where: { id },
    });
    
    if (!slide) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      );
    }
    
    await prisma.slide.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting slide:", error);
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 }
    );
  }
}
