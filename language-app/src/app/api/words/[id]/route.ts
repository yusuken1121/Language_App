import { ERROR_MESSAGES } from "@/config/errorMessage";
import { getUserId } from "@/lib/auth";
import { createErrorResponse } from "@/lib/backend/createErrorResponse";
import { getErrorMessage } from "@/lib/getErrorMessage";
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
      return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
    }
    const word = await prisma.word.findUnique({
      where: { id: Number(id), userId },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const userId = await getUserId();
  if (!userId) {
    return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
  }
  const { memo, favorite } = await request.json();

  try {
    const word = await prisma.word.update({
      where: { id: Number(id), userId },
      data: { memo, favorite },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const userId = await getUserId();
  if (!userId) {
    return createErrorResponse(ERROR_MESSAGES.BACKEND.AUTH.UNAUTHORIZED, 401);
  }
  try {
    const word = await prisma.word.delete({
      where: { id: Number(id), userId },
    });
    return NextResponse.json({ data: word });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", errorMessage);
    return createErrorResponse(ERROR_MESSAGES.BACKEND.GENERAL.UNEXPECTED, 500);
  }
}
