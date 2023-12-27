import { LogOutIcon, MenuIcon, Search, SlidersHorizontal } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { cn, scrollToTop } from "@/lib/utils";

import { useUserStore } from "@/zustand/auth/user";
import { useQueryClient } from "@tanstack/react-query";
import useHomepageViewStore from "@/zustand/home/homepageView";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useFilterStore } from "@/zustand/home/filter";
import { Slider } from "./ui/slider";
import HomepageSearchInput from "./homeSearchUsersInput";
import NotificationsListFiters from "./notifications/notificationListFilters";

const TopBar2 = ({ children }: { children: ReactNode }) => {
  const [location] = useLocation();
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const filters = useFilterStore((state) => state.filters);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);

  const [clickedTags, setClickedTags] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [startAgeSliderVal, setStartAgeSliderVal] = useState(23);
  const [filtersTriggered, setFiltersTriggered] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [endAgeSliderVal, setEndAgeSliderVal] = useState(60);

  const handleStartSliderChange = (val: Array<number>) => {
    setStartAgeSliderVal(val[0]);
    updateFilters({ max_age: endAgeSliderVal, min_age: val[0] });
  };

  const handleEndSliderChange = (val: Array<number>) => {
    setEndAgeSliderVal(val[0]);
    updateFilters({ max_age: val[0], min_age: startAgeSliderVal });
  };
  const reset = useConversationHistoryStore((state) => state.resetToNull);
  const signOut = useUserStore((state) => state.reset);

  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );

  const generateRandomNumbers = () => {
    const min = 23;
    const max = 50;

    // Create an array of possible values within the range
    const possibleValues = Array.from(
      { length: max - min + 1 },
      (_, index) => min + index
    );

    // Shuffle the array using the Fisher-Yates algorithm
    const shuffledValues = [...possibleValues].sort(() => Math.random() - 0.5);

    // Take the first three elements
    const selectedNumbers = shuffledValues.slice(0, 6);

    // Update the state with the selected numbers
    setRandomNumbers(selectedNumbers);
  };

  const toggleSuggestionTags = (index: number, suggestionValue: number) => {
    const newActiveTags = clickedTags.map((_, i) => i === index);
    if (suggestionValue === 100) {
      setEndAgeSliderVal(100);
      updateFilters({ max_age: 100, min_age: startAgeSliderVal });
    } else {
      setEndAgeSliderVal(suggestionValue + 5);
      updateFilters({
        max_age: suggestionValue + 5,
        min_age: suggestionValue,
      });
    }

    setStartAgeSliderVal(suggestionValue);
    setClickedTags(newActiveTags);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  // const [location] = useLocation();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const navLinks = links(user!.member_id).map((link, index) => {
    return (
      <li key={index} className="w-full">
        <Link
          className={cn(
            "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2",
            location.startsWith("/profile") && link.path.startsWith("/profile")
              ? "font-semibold bg-accent"
              : location.endsWith(link.path)
              ? "font-semibold bg-accent"
              : "font-normal"
          )}
          href={
            link.name == "My Profile"
              ? `/profile/${user!.member_id}`
              : link.path
          }
          onClick={() => {
            console.log("this here is triggered");
            if (link.name == "My Profile") {
              setSelectedProfileId(null);
              queryClient.invalidateQueries({ queryKey: ["profileHeader"] });
            }
            if (link.name === "Messages") {
              setSelectedProfileId(null);
              reset();
            }
          }}
        >
          {
            <link.icon
              fill={
                location.startsWith("/profile") &&
                link.path.startsWith("/profile")
                  ? "black"
                  : location.endsWith(link.path)
                  ? "black"
                  : "white"
              }
              stroke={
                link.name == "Home" && location.endsWith(link.path)
                  ? "white"
                  : "black"
              }
              strokeWidth={location.endsWith(link.path) ? 0.8 : 2}
              size={20}
            />
          }
          <p className="text-sm">{link.name}</p>
        </Link>
      </li>
    );
  });

  // navLinks = [
  //   ...navLinks,
  //   <li key={navLinks.length + 1} className="w-full h-full">
  //     <Link
  //       className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
  //       href={"/settings"}
  //     >
  //       <Link
  //         onClick={signOut}
  //         className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
  //         href={"/"}
  //       >
  //         {<LogOutIcon size={20} />} <p className="text-sm">Sign out</p>
  //       </Link>

  //       {/* <Settings2Icon /> <p>Settings</p> */}
  //     </Link>
  //     <div className="flex items-start justify-end flex-col space-y-4 px-4 h-full mt-10 ">
  //       <a
  //         className="hover:text-slate-700 text-sm text-black"
  //         href="https://softnames.bolddesk.com/"
  //         target="__blank"
  //       >
  //         Help Center
  //       </a>
  //       <Link onClick={scrollToTop} href="/privacy-policy">
  //         <a className="hover:text-slate-700 text-sm text-black">
  //           Privacy Policy
  //         </a>
  //       </Link>
  //       <Link onClick={scrollToTop} href="/terms">
  //         <a className="hover:text-slate-700 text-sm text-black">
  //           Terms of Service
  //         </a>
  //       </Link>
  //     </div>
  //   </li>,
  // ];
  if (!user?.profile_completed) {
    return <></>;
  }

  return (
    <div className="flex lg:h-full h-8 lg:items-start items-center lg:space-x-0 space-x-4  lg:pl-0 pl-5 lg:border-0 border-b px-10 py-8">
      {/* search */}
      <Dialog
        open={searchTriggered}
        onOpenChange={(val) => setSearchTriggered(val)}
      >
        <DialogContent className="sm:max-w-md opacity-100 w-4/5 left-[50%] top-[18%]">
          <p>Search user</p>
          <HomepageSearchInput />
        </DialogContent>
      </Dialog>

      {/* filters */}
      <Dialog
        open={filtersTriggered}
        onOpenChange={(val) => setFiltersTriggered(val)}
      >
        {location === "/" && (
          <DialogContent className="flex flex-col sm:max-w-md opacity-100 w-4/5">
            <p className="px-5 text-[#cfd8e4]">Suggested</p>
            <div className="max-[320px]:flex-row max-[320px]:flex">
              <div className="flex flex-row max-[320px]:flex-col max-[320px]:space-y-3 max-[320px]:w-24 max-[320px]:justify-start max-[320px]:space-x-0  justify-between items-center p-5 space-x-5">
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[0]);
                    toggleSuggestionTags(0, randomNumbers[1]);
                  }}
                  className={`${
                    !clickedTags[0]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[0]}
                </p>
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[1]);
                    toggleSuggestionTags(1, randomNumbers[1]);
                  }}
                  className={`${
                    !clickedTags[1]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[1]}
                </p>
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[2]);
                    toggleSuggestionTags(2, randomNumbers[2]);
                  }}
                  className={`${
                    !clickedTags[2]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[2]}
                </p>
              </div>
              <div className="flex flex-row justify-between  max-[320px]:flex-col max-[320px]:space-y-3 max-[320px]:w-24 max-[320px]:justify-start max-[320px]:space-x-0  items-center p-5 space-x-5">
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[3]);
                    toggleSuggestionTags(3, randomNumbers[3]);
                  }}
                  className={`${
                    !clickedTags[3]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[3]}
                </p>
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[4]);
                    toggleSuggestionTags(4, randomNumbers[4]);
                  }}
                  className={`${
                    !clickedTags[4]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[4]}
                </p>
                <p
                  onClick={() => {
                    setStartAgeSliderVal(randomNumbers[5]);
                    toggleSuggestionTags(5, randomNumbers[5]);
                  }}
                  className={`${
                    !clickedTags[5]
                      ? "bg-white text-[#ff569a]"
                      : "bg-[#ff569a] text-white"
                  } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer`}
                >
                  {randomNumbers[5]}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="px-5 text-[#cfd8e4]">Filter By</p>
              {/* <p className="px-5 text-[#7e7e7e] text-xs underline hover:cursor-pointer">
                Clear
              </p> */}
            </div>

            <div className="flex flex-row justify-between items-center mt-5">
              <p className="px-5 text-sm">Age</p>
              <p className="px-5 text-sm">{`${startAgeSliderVal}-${endAgeSliderVal}`}</p>
            </div>
            {/* <form action="post" onSubmit={formik.handleSubmit}> */}
            <div className="flex flex-row justify-center align-center py-5 px-5 mt-5 space-x-5">
              <p className="text-slate-500 text-sm">From</p>
              <Slider
                // defaultValue={[50]}
                value={[filters!.min_age]}
                // value={[startAgeSliderVal]}
                min={18}
                max={80}
                step={1}
                className=" ml-10 pr-5"
                onValueChange={handleStartSliderChange}
                name="age"
              />
            </div>
            <div className="flex flex-row justify-center align-center py-5 px-5">
              <p className="text-slate-500 text-sm">To</p>
              <Slider
                // defaultValue={[50]}
                // dir="right-to-left"
                value={[filters!.max_age]}
                // value={[endAgeSliderVal]}
                max={80}
                step={1}
                className="w-full ml-10 pr-5"
                onValueChange={handleEndSliderChange}
                name="age"
              />
            </div>
          </DialogContent>
        )}

        {location === "/notifications" && (
          <DialogContent className="sm:max-w-md opacity-100 w-4/5">
            <p className="px-5 text-[#cfd8e4]">Filters</p>
            <NotificationsListFiters />
          </DialogContent>
        )}
      </Dialog>
      <Sheet>
        <div className="flex justify-between w-full">
          <SheetTrigger className="flex flex-row lg:hidden w-full space-x-5">
            <MenuIcon />
            {children}
          </SheetTrigger>

          {location === "/" || location === "/notifications" ? (
            <div className="flex flex-row space-x-3 justify-end">
              {" "}
              <SlidersHorizontal
                size={20}
                onClick={() => {
                  setFiltersTriggered(true);
                }}
                className="block lg:hidden w-full"
              />
              <Search
                size={20}
                onClick={() => {
                  setSearchTriggered(true);
                }}
                className="block lg:hidden w-full"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <img
                  className="hover:cursor-pointer h-max w-max my-8 mx-4"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </SheetTitle>{" "}
            <ul>{navLinks}</ul>
            <hr />
            <div className="flex items-start justify-end flex-col space-y-4 px-4 h-full mt-10 pt-5 ">
              <a
                className="hover:text-slate-700 text-sm text-black dark:text-white"
                href="https://softnames.bolddesk.com/"
                target="__blank"
              >
                Help Center
              </a>
              <Link onClick={scrollToTop} href="/privacy">
                <a className="hover:text-slate-700 text-sm text-black dark:text-white">
                  Privacy Policy
                </a>
              </Link>
              <Link onClick={scrollToTop} href="/terms">
                <a className="hover:text-slate-700 text-sm text-black dark:text-white">
                  Terms & Conditions
                </a>
              </Link>
            </div>
            <Dialog>
              <DialogTrigger>
                <div className="flex space-x-2 my-4 ml-3">
                  {<LogOutIcon size={20} className="text-primary" />}{" "}
                  <p className="text-sm">Sign out</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md opacity-100">
                <DialogHeader>
                  <DialogTitle>Are you sure you want to sign out?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start flex flex-col space-y-4 pt-5">
                  <Button
                    className="hover:bg-primary"
                    onClick={() => {
                      queryClient.invalidateQueries();
                      signOut();
                    }}
                  >
                    Yes
                  </Button>
                  <DialogClose asChild>
                    <Button
                      className="text-white hover:bg-secondary"
                      type="button"
                      variant="secondary"
                    >
                      No
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TopBar2;
