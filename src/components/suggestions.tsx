import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { getImagePath } from "@/lib/images";
import membersQuery from "@/queries/home";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import { scrollToTop } from "@/lib/utils";
import HomepageSearchInput from "./homeSearchUsersInput";
import { ReactNode, useState } from "react";

type Member = {
  nickname: string;
  age: number;
  country_name: string;
  member_uuid: string;
  gallery_uuid: string;
  gender: string;
  member_id: number;
};

const Suggestions = () => {
  const getMembers = membersQuery.getMembers(69);
  const [, setLocation] = useLocation();
  const [suggestions, setSuggestions] = useState<ReactNode[]>([]);
  useQuery({
    queryKey: ["home-members"],
    queryFn: () => getMembers,
    onSuccess: (data) => {
      const results = data
        ?.slice(0, 3)
        .map((suggestion: Member, index: number) => {
          const imagePath = getImagePath(
            suggestion.gallery_uuid,
            suggestion.gender,
            suggestion.member_uuid,
          );

          return (
            <li
              key={index}
              className="h-36 border rounded-xl lg:h-340 w-full relative"
            >
              <img
                className="h-full w-full rounded-xl "
                src=""
                alt="cover photo"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.src =
                    "https://dummyimage.com/600x400/f6f6f6/f6f6f6.png";
                }}
              />
              <div className="absolute top-0 right-0 mt-2 mr-1">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVerticalIcon height={20} />
                    {" "}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col">
                    <Button variant={"ghost"}>Like</Button>
                    <Button variant={"ghost"}>Favourite</Button>
                    <Button variant={"ghost"}>Send Message</Button>
                    <DropdownMenuSeparator />
                    <Button variant={"ghost"}>Block</Button>
                    <Button variant={"destructive"}>Report</Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="absolute flex bottom-4 left-4 z-20 space-x-2 items-end hover:underline">
                <img
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="rounded-full h-10 lg:h-16 ring-2 ring-primary hover:cursor-pointer"
                  src={imagePath}
                  alt="user avatar"
                />
                <div>
                  <p
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="font-semibold text-xs  hover:cursor-pointer lg:text-lg"
                  >
                    {suggestion.nickname},{" "}
                    <span className="font-bold">{suggestion.age}</span>
                  </p>
                  <p
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="text-xs lg:text-md  hover:cursor-pointer"
                  >
                    {suggestion.country_name}
                  </p>
                </div>
              </div>
            </li>
          );
        });

      setSuggestions(results);
    },
  });

  const handleSuggestionSelect = (suggestion: Member) => {
    setLocation(`/users/${suggestion.member_id}`);
  };

  return (
    <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
      <HomepageSearchInput />
      <div className="h-max w-full flex justify-between mt-4 items-center">
        <p className=" lg:text-md px-5 py-2 font-semibold">SUGGESTIONS</p>
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
        <ul className="flex items-center justify-center list-none space-x-4 text-xs md:text-md">
          <li>
            <Link onClick={scrollToTop} href="/privacy-policy">
              <a className=" font-light hover:text-slate-700">Privacy Policy</a>
            </Link>
          </li>
          <li className="w-1 h-1 rounded-full bg-slate-400" />
          <li>
            <Link onClick={scrollToTop} href="/terms">
              <a className=" font-light hover:text-slate-700">
                Terms of Service
              </a>
            </Link>
          </li>
          <li className="w-1 h-1 rounded-full bg-slate-400" />
          <li>
            <Link onClick={scrollToTop} href="/release-notes">
              <a className="font-light hover:text-slate-700">Release Notes</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;
