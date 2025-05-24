import { Button } from "./ui/button";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  setPagination: (pagination: PageAndSize) => void;
};

const Pagination = ({ pagination, setPagination }: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;

  const label = `${startOffset} - ${endOffset} of X`;

  const handleNextPage = () => {
    setPagination({ ...pagination, page: pagination.page + 1 });
  };

  const handlePreviousPage = () => {
    setPagination({ ...pagination, page: pagination.page - 1 });
  };

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={false}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
