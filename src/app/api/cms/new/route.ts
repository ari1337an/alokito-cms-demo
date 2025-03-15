import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const newSlide = await prisma.slide.create({
      data: {
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
      },
    });
    
    return NextResponse.json({ slide: newSlide });
  } catch (error) {
    console.error("Error creating new slide:", error);
    return NextResponse.json(
      { error: "Failed to create new slide" },
      { status: 500 }
    );
  }
} 