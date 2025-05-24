"use client";

import { useQueryStates } from "nuqs";
import { paginationParser, paginationOptions } from "@/features/search-params";
import { Pagination } from "@/components/pagination";

const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  return <Pagination pagination={pagination} setPagination={setPagination} />;
};

export { TicketPagination };
