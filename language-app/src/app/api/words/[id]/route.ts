import { getUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "ユーザーは認証されていません" },
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
  const id = params.id;
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "ユーザーは認証されていません" },
      { status: 401 }
    );
  }
  const { memo, favorite } = await request.json();

  try {
    const word = await prisma.word.update({
      where: { id: Number(id), userId },
      data: { memo, favorite },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "ユーザーは認証されていません" },
      { status: 401 }
    );
  }
  try {
    const word = await prisma.word.delete({
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
