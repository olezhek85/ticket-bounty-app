"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortParser } from "@/features/search-params";
import { sortOptions } from "@/features/search-params";
import { useQueryStates } from "nuqs";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect value={sort} onChange={setSort} options={options} />;
};

export { TicketSortSelect };
