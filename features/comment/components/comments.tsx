"use client";

import { CommentItem } from "@/features/comment/components/comment-item";
import { CardCompact } from "@/components/card-compact";
import { CommentCreateForm } from "@/features/comment/components/comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentWithMetadata } from "@/features/comment/types";
import { Button } from "@/components/ui/button";
import { getComments } from "@/features/comment/queries/get-comments";
import { useState } from "react";

type CommentsProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetadata[];
    metadata: {
      count: number;
      hasNextPage: boolean;
    };
  };
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
};

export { Comments };
