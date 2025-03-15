/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { slides } = await req.json();

    // Delete all existing slides
    await prisma.slide.deleteMany({});

    // Create new slides
    await prisma.slide.createMany({
      data: slides.map((slide: any) => ({
        title: slide.title,
        description: slide.description,
        buttonText: slide.buttonText,
        buttonLink: slide.buttonLink,
        buttonVariant: slide.buttonVariant,
        imageUrl: slide.imageUrl,
        backgroundColor: slide.backgroundColor,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save CMS data:", error);
    return NextResponse.json(
      { error: "Failed to save CMS data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ slides });
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    return NextResponse.json({ slides: [] });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 }
      );
    }

    await prisma.slide.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete slide:", error);
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 }
    );
  }
}
