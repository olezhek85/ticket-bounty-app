import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";

export const getTicket = async (id: string) => {
  const session = await auth();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  return {
    ...ticket,
    isOwner: isOwner(session, ticket),
  };
};
