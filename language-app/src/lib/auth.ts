import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
