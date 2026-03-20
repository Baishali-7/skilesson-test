import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET SINGLE LESSON
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      progress: true,
    },
  });

  if (!lesson) {
    return NextResponse.json(
      { success: false, error: "Lesson not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, lesson });
}

// ✅ UPDATE LESSON
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const lesson = await prisma.lesson.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      level: body.level,
      sport: body.sport,
    },
  });

  return NextResponse.json({ success: true, lesson });
}

// ✅ DELETE LESSON
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.lesson.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
