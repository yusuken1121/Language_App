import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(user: User) {
  await prisma.user.create({ data: user });
}
