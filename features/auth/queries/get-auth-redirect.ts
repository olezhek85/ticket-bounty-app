import { auth } from "@/lib/auth/auth";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export const getAuthRedirect = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return redirect(signInPath());
  }

  return session;
};
