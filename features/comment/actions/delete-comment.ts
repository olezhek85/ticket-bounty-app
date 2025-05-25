"use server";

import { prisma } from "@/lib/prisma";
import { ticketEditPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { isOwner } from "@/features/auth/utils/is-owner";

export const deleteComment = async (id: string) => {
  const session = await getAuthRedirect();

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment || !isOwner(session, comment)) {
    return toActionState("ERROR", "Not authorized");
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketEditPath(comment!.ticketId));

  return toActionState("SUCCESS", "Comment deleted");
};
