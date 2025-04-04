"use server";

import { signOut as signOutAction } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { homePath } from "@/paths";

export const signOut = async () => {
  await signOutAction();
  redirect(homePath());
};
