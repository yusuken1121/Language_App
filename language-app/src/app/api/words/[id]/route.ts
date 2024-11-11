import { getUserId } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const id = params.id;
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const word = await prisma.word.findUnique({
      where: { id: Number(id), userId },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const id = params.id;
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
  const { memo } = await request.json();
  try {
    const word = await prisma.word.update({
      where: { id: Number(id), userId },
      data: { memo },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
