"use client";

import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";
import { deleteComment } from "@/features/comment/actions/delete-comment";
import { useConfirmDialog } from "@/components/confirm-dialog";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="ghost" size="icon" type="submit">
        <LucideTrash className="w-4 h-4" />
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export { CommentDeleteButton };
