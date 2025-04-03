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
      <Input name="username" type="text" />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input name="email" type="email" />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input name="confirmPassword" type="password" />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
