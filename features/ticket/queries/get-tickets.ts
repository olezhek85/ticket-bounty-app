import { prisma } from "@/lib/prisma";
import type { ParsedSearchParams } from "@/features/search-params";
import { isOwner } from "@/features/auth/utils/is-owner";
import { auth } from "@/lib/auth/auth";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  const session = await auth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(session, ticket),
    })),
    metadata: { count, hasNextPage: count > skip + take },
  };
};
