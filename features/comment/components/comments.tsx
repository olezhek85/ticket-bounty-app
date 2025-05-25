import { getComments } from "@/features/comment/queries/get-comments";
import { CommentItem } from "@/features/comment/components/comment-item";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="flex flex-col gap-y-2 ml-8">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { Comments };
