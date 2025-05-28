"use server";

import { isOwner } from "@/features/auth/utils/is-owner";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
  const session = await auth();

  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
  };

  const take = 2;

  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(session, comment),
    })),
    metadata: {
      count,
      cursor: comments.at(-1)?.id,
      hasNextPage,
    },
  };
};
