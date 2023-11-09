import searchQuery from "@/queries/search";
import { useUserStore } from "@/zustand/auth/user";
import useHomepageSearchStore from "@/zustand/home/searchValue";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Button } from "./ui/button";
import { getImagePath } from "@/lib/images";
import useHomepageViewStore from "@/zustand/home/homepageView";

type SearchResultItem = {
  member_id: number;
  gallery_uuid: string | null;
  gender: string;
  member_uuid: string;
  nickname: string;
  age: string;
  country_name: string;
};

const HomepageSearchInput = () => {
  const [searchResults, setSearchResults] = useState([]);
  const setHomepageView = useHomepageViewStore((state) => state.setView);
  const setSelectedProfileId = useHomepageViewStore((state) => state.setSelectedProfileId)
  const user = useUserStore((state) => state.user);
  const setSearchValue = useHomepageSearchStore(
    (state) => state.setSearchValue,
  );
  const searchValue = useHomepageSearchStore((state) => state.value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const searchUsers = async () =>
    await searchQuery.search(debouncedSearchValue, user!.member_id);

  const search = useQuery({
    queryFn: searchUsers,
    queryKey: ["searchUsers", debouncedSearchValue],
    enabled: debouncedSearchValue.length !== 0,
    onSuccess: (data) => {
      console.log(data);
      if (data !== undefined && data) {
        setSearchResults(data.data);
      }
    },
  });

  console.log(search);

  return (
    <div className="w-[330px] flex flex-col justify-center items-center">
      <div className="hover:cursor-pointer w-full border border-2 p-2 space-x-2 rounded-xl flex items-center px-5 mx-2">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onBlur={()=>{
            setTimeout(()=>{
            setSearchResults([]);
            setSearchValue('');
            }, 200);
          }}
          className="h-4 border-0 focus:outline-0 w-full placeholder-[#E0E0E0] text-sm"
          placeholder="Search"
        />
        <SearchIcon />
      </div>
      {searchResults.length !== 0 &&
        (
          <div className="mt-1 sticky z-40 h-min max-h-[200px] border rounded-b-md w-[330px] bg-white overflow-y-auto">
            {searchResults.map((result: SearchResultItem) => {
              return (
                <Button onClick={()=>{
            setSelectedProfileId(result!.member_id!);
            setHomepageView("PROFILE");
                }} className="bg-white border-b h-max w-full">
                  <div className="flex text-black space-x-2 w-full items-center justify-start">
                    <img
                      src={getImagePath(
                        result.gallery_uuid,
                        result.gender,
                        result.member_uuid,
                      )}
                      className="h-12 rounded-full"
                    />
                    <div className="w-full text-start">
                      <p>
                        {result.nickname}, <span>{result.age}</span>
                      </p>
                      <p>{result.country_name}</p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default HomepageSearchInput;