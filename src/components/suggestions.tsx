import { suggestionsData } from "@/lib/dummies/suggestionData";
import SearchInput from "./searchInput";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import FooterLinks from "./footerLinks";

const Suggestions = () => {
  const suggestions = suggestionsData.slice(0, 3).map((suggestion, index) => {
    return (
      <li key={index} className="h-36 lg:h-340 w-full relative">
        <img
          className="h-full w-full rounded-xl z-10"
          src={suggestion.backgroundImage}
          alt="cover photo"
        />
        <div className="absolute flex bottom-4 left-4 z-20 space-x-2 items-end">
          <img
            className="rounded-full h-10 lg:h-16 ring-2 ring-primary"
            src={suggestion.avatar}
            alt="user avatar"
          />
          <div>
            <p className="font-semibold text-xs lg:text-lg">
              {suggestion.name}
            </p>
            <p className="text-xs lg:text-md">{suggestion.country}</p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden">
      <SearchInput />
      <div className="h-max w-full flex justify-between mt-4 items-center">
        <p className=" lg:text-lg">SUGGESTIONS</p>
        <div className="flex">
          <Button variant={"ghost"} className="p-0">
            <ChevronLeftIcon />
          </Button>
          <Button variant={"ghost"} className="p-0">
            <ChevronRightIcon />
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
