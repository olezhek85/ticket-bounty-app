import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getUserByEmail = cache(async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
});
