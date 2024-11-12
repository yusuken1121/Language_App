import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import prisma from "./prisma";

export async function getUserId() {
  const { userId } = await auth();
  if (!userId) {
    return undefined;
  }
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) {
    return undefined;
  }
  return user.id;
}
