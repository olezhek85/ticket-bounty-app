import { prisma } from "@/lib/prisma";

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
