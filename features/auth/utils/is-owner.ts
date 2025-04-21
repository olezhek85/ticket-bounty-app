import { Session } from "next-auth";

type Entity = {
  userId: string | null;
};

export const isOwner = (
  session: Session | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!session?.user || !entity) {
    return false;
  }

  return session.user.id === entity.userId;
};
