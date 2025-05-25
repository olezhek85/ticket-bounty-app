import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentWithMetadata } from "@/features/comment/types";

type CommentItemProps = {
  comment: CommentWithMetadata;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card className="p-4 flex-1 flex flex-col gap-y-1">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {comment.user?.name ?? "Deleted User"}
        </p>
        <p className="text-sm text-muted-foreground">
          {comment.createdAt.toLocaleString()}
        </p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
    </Card>
  );
};

export { CommentItem };
