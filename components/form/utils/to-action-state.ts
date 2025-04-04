import { AuthError } from "next-auth";
import { z } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
  payload?: FormData;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof z.ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return {
          status: "ERROR",
          message: "Invalid email or password",
          fieldErrors: {},
          payload: formData,
          timestamp: Date.now(),
        };
      default:
        return {
          status: "ERROR",
          message: "An unknown error occurred",
          fieldErrors: {},
          payload: formData,
          timestamp: Date.now(),
        };
    }
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState => {
  return {
    status,
    message,
    payload: formData,
    timestamp: Date.now(),
  };
};
