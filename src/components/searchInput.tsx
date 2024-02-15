import { useSearchFilterStore } from "@/zustand/messaging/searchFilter";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  const updateSearchValue = useSearchFilterStore(
    (state) => state.setSearchValue
  );
  const searchValue = useSearchFilterStore((state) => state.value);
  return (
    <div className="hover:cursor-pointer h-full border-2 p-2 space-x-2 rounded-xl flex items-center px-5 mx-2 ">
      <input
        value={searchValue}
        onChange={(e) => {
          updateSearchValue(e.target.value);
        }}
        className="h-4 focus:outline-none  border-0 focus:outline-0 w-full placeholder-[#E0E0E0] text-sm dark:text-white dark:bg-[#020817]"
        placeholder="Search"
      />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
