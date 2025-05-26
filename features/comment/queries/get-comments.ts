import { isOwner } from "@/features/auth/utils/is-owner";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string) => {
  const session = await auth();

  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(session, comment),
  }));
};
