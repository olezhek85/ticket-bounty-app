"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/form/submit-button";
import { signUp } from "@/features/auth/actions/sign-up";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        name="username"
        type="text"
        defaultValue={actionState.payload?.get("username") as string}
        placeholder="John Doe"
      />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="email"
        defaultValue={actionState.payload?.get("email") as string}
        placeholder="john.doe@example.com"
      />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
        placeholder="********"
      />
      <FieldError actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        name="confirmPassword"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
        placeholder="********"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
