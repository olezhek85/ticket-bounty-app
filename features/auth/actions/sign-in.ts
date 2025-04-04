"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";
import { signInSchema } from "../schemas";
import { signIn as signInAction } from "@/lib/auth/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    await signInAction("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return toActionState("SUCCESS", "Signed in successfully", formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return fromErrorToActionState(error, formData);
  }
};
