"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import { signIn } from "@/features/auth/actions/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="email">Email</Label>
      <Input name="email" type="email" />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
