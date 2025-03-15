import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slideId: string }> }
) {
  try {
    const { slideId } = await params;

    if (!slideId) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 }
      );
    }

    const slide = await prisma.slide.findUnique({
      where: { id: slideId },
    });

    if (!slide) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ slide });
  } catch (error) {
    console.error("Error fetching slide:", error);
    return NextResponse.json(
      { error: "Failed to fetch slide" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slideId: string }> }
) {
  try {
    const { slideId } = await params;
    const slideData = await request.json();

    if (!slideId) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 }
      );
    }

    // Check if slide exists
    const existingSlide = await prisma.slide.findUnique({
      where: { id: slideId },
    });

    if (!existingSlide) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      );
    }

    // Update the slide
    const updatedSlide = await prisma.slide.update({
      where: { id: slideId },
      data: slideData,
    });

    return NextResponse.json({ slide: updatedSlide });
  } catch (error) {
    console.error("Error updating slide:", error);
    return NextResponse.json(
      { error: "Failed to update slide" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slideId: string }> }
) {
  try {
    const { slideId } = await params;

    if (!slideId) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 }
      );
    }

    // Check if slide exists
    const existingSlide = await prisma.slide.findUnique({
      where: { id: slideId },
    });

    if (!existingSlide) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      );
    }

    // Delete the slide
    await prisma.slide.delete({
      where: { id: slideId },
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