import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="border p-2 space-x-2 rounded-xl flex items-center">
      <SearchIcon color="gray" />
      <input
        className="h-4 border-0 focus:outline-0 w-full"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
