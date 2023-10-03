import { suggestionsData } from "@/lib/dummies/suggestionData";
import SearchInput from "./searchInput";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import FooterLinks from "./footerLinks";

const Suggestions = () => {
  const suggestions = suggestionsData.map((suggestion, index) => {
    return (
      <li key={index} className="h-48 w-full relative">
        <img
          className="h-full w-full rounded-xl z-10"
          src={suggestion.backgroundImage}
          alt="cover photo"
        />
        <div className="absolute flex bottom-4 left-4 z-20 space-x-2 items-end">
          <img
            className="rounded-full h-20 ring-2 ring-primary"
            src={suggestion.avatar}
            alt="user avatar"
          />
          <div>
            <p className="font-semibold">{suggestion.name}</p>
            <p>{suggestion.country}</p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <SearchInput />
      <div className="h-max w-full flex justify-between mt-4 items-center">
        <p className="font-semibold text-xl">SUGGESTIONS</p>
        <div className="flex">
          <Button variant={"ghost"} className="p-0">
            <ChevronLeftIcon />
          </Button>
          <Button variant={"ghost"} className="p-0">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <ul className="border-top h-full p-2 space-y-4 overflow-y-scroll">
        {suggestions}
      </ul>
      <div className="w-full border-t pt-2">
        <FooterLinks />
      </div>
    </div>
  );
};

export default Suggestions;
