"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketEditPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const session = await getAuthRedirect();

  let comment;

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    comment = await prisma.comment.create({
      data: {
        userId: session.user!.id,
        ticketId,
        ...data,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketEditPath(ticketId));

  return toActionState("SUCCESS", "Comment created", undefined, {
    ...comment,
    isOwner: isOwner(session, comment),
  });
};
