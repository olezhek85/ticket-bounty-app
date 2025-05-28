"use client";

import { useQueryState, useQueryStates } from "nuqs";
import {
  paginationParser,
  paginationOptions,
  searchParser,
} from "@/features/search-params";
import { Pagination } from "@/components/pagination";
import { useEffect, useRef } from "react";
import { PaginationData } from "@/types/pagination";
import { TicketWithMetadata } from "@/features/ticket/types";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginationData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) {
      return;
    }
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [search, setPagination, pagination]);

  return (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export { TicketPagination };
