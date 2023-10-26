// import { suggestionsData } from "@/lib/dummies/suggestionData";
import SearchInput from "./searchInput";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import FooterLinks from "./footerLinks";
import { getImagePath } from "@/lib/images";
import membersQuery from "@/queries/home";
import { useQuery } from "@tanstack/react-query";

type Member = {
  nickname: string;
  age: number;
  countryName: string;
  member_uuid: string;
  gallery_uuid: string;
  gender: string;
};

const Suggestions = () => {
  const getMembers = membersQuery.getMembers(69);

  const members = useQuery({
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });

  const suggestions = members.data
    ?.slice(0, 3)
    .map((suggestion: Member, index: number) => {
      const imagePath = getImagePath(
        suggestion.gallery_uuid,
        suggestion.gender,
        suggestion.member_uuid
      );
      return (
        <li key={index} className="h-36 lg:h-340 w-full relative">
          <img
            className="h-full w-full rounded-xl z-10"
            src=""
            alt="cover photo"
            onError={(e) => {
              e.target.src = "https://dummyimage.com/600x400/f6f6f6/f6f6f6.png";
            }}
          />
          <div className="absolute flex bottom-4 left-4 z-20 space-x-2 items-end">
            <img
              className="rounded-full h-10 lg:h-16 ring-2 ring-primary"
              src={imagePath}
              alt="user avatar"
            />
            <div>
              <p className="font-semibold text-xs lg:text-lg">
                {suggestion.nickname}
              </p>
              <p className="text-xs lg:text-md">{suggestion.countryName}</p>
            </div>
          </div>
        </li>
      );
    });

  return (
    <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
      <SearchInput />
      <div className="h-max w-full flex justify-between mt-4 items-center">
        <p className=" lg:text-md px-5 py-2">SUGGESTIONS</p>
        <div className="flex px-5">
          <Button variant={"ghost"} className="p-0">
            <ChevronLeftIcon size={20} />
          </Button>
          <Button variant={"ghost"} className="p-0">
            <ChevronRightIcon size={20} />
          </Button>
        </div>
      </div>
      <ul className="no-scrollbar border-top h-full p-2 space-y-2 lg:space-y-4 overflow-y-auto rounded-lg mb-5">
        {suggestions}
      </ul>
      <div className="w-full border-t pt-2 hidden lg:block">
        <FooterLinks />
      </div>
    </div>
  );
};

export default Suggestions;
