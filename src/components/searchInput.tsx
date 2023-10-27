import { useSearchFilterStore } from "@/zustand/messaging/searchFilter";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  const updateSearchValue = useSearchFilterStore(
    (state) => state.setSearchValue,
  );
  const searchValue = useSearchFilterStore((state) => state.value);
  return (
    <div className="border p-2 space-x-2 rounded-xl flex items-center">
      <SearchIcon color="gray" />
      <input
        value={searchValue}
        onChange={(e) => {
          updateSearchValue(e.target.value);
        }}
        className="h-4 border-0 focus:outline-0 w-full"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
