"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/features/comment/actions/create-comment";
import { useActionState } from "react";
import { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>
  ) => {
    onCreateComment?.(actionState.data!);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind..." />
      <FieldError name="content" actionState={actionState} />
      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };
