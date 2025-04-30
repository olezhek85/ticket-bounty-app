"use client";

import { usePathname, useRouter,useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder?: string;
};

const SearchInput = ({ placeholder = "Search..." }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return <Input placeholder={placeholder} onChange={handleChange} />;
};

export { SearchInput };
