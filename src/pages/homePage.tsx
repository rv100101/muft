import { useEffect, useRef, useState } from "react";
import PostHeader from "@/components/home/postHeader";
import AuthenticatedLayout from "./authenticatedPages/layout";
import { useQuery } from "@tanstack/react-query";
import membersQuery from "@/queries/home";
import { Skeleton } from "@/components/ui/skeleton";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useUserStore } from "@/zustand/auth/user";
import HomepageSearchInput from "@/components/homeSearchUsersInput";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "usehooks-ts";
import Posts from "@/components/home/posts";
import { useFilterStore } from "@/zustand/home/filter";
type Member = {
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
  nationality_code: string;
};

const HomePage = () => {
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
  const [endAgeSliderVal, setEndAgeSliderVal] = useState(60);
  const [suggestedTriggered, setSuggestedTriggered] = useState(false);
  const debouncedAgeFilterVal = useDebounce(startAgeSliderVal, 300);

  const handleStartSliderChange = (val: Array<number>) => {
    setStartAgeSliderVal(val[0]);
    updateFilters({ max_age: endAgeSliderVal, min_age: val[0] });
  };

  const handleEndSliderChange = (val: Array<number>) => {
    setEndAgeSliderVal(val[0]);
    updateFilters({ max_age: val[0], min_age: startAgeSliderVal });
  };

  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId,
  );
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList,
  );
  const { user } = useUserStore();
  const memberList = useHomepageViewStore((state) => state.modifiedMemberList);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const getMembers = membersQuery.getMembers(user!.member_id);
  const getMemberLikes = membersQuery.getMemberLikes(user!.member_id);
  const getMemberFavorites = membersQuery.getMemberFavorites(user!.member_id);

  const { data: members, isLoading: retrievingMemberData } = useQuery({
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["home-members", suggestedTriggered],
    queryFn: () => getMembers,
  });

  // likes
  const { data: memberLikes } = useQuery({
    queryKey: ["home-members-likes"],
    queryFn: () => getMemberLikes,
  });

  // favorites
  const { data: memberFavorites } = useQuery({
    queryKey: ["home-members-favs"],
    queryFn: () => getMemberFavorites,
  });

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more PostItems (for example, by adding new instances to state)
      }
    }
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
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
    return () => {
      setSelectedProfileId(null);
    };
  });

  const generateRandomNumbers = () => {
    const min = 23;
    const max = 50;

    // Create an array of possible values within the range
    const possibleValues = Array.from(
      { length: max - min + 1 },
      (_, index) => min + index,
    );

    // Shuffle the array using the Fisher-Yates algorithm
    const shuffledValues = [...possibleValues].sort(() => Math.random() - 0.5);

    // Take the first three elements
    const selectedNumbers = shuffledValues.slice(0, 6);

    // Update the state with the selected numbers
    setRandomNumbers(selectedNumbers);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    if (!retrievingMemberData && memberLikes && memberFavorites && members) {
      const updatedMemberList = members.map((member: Member) => {
        const memberHasLikes = memberLikes.find(
          (likes: Member) => member.member_id === likes.member_id,
        );

        const memberHasFavorites = memberFavorites?.find(
          (favs: Member) => member.member_id === favs.member_id,
        );

        // If a match is found, update the object in the first array
        if (memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: true,
          };
        } else if (!memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: false,
            isFavorite: true,
          };
        } else if (memberHasLikes && !memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: false,
          };
        } else {
          return {
            ...member,
            isLiked: false,
            isFavorite: false,
          };
        }
      });

      const filteredMemberList = updatedMemberList.filter(
        (member: Member) => member.age >= debouncedAgeFilterVal,
      );
      
      filteredMemberList.sort((a: Member, b: Member) => a.age > b.age);
      setMemberList(
        debouncedAgeFilterVal > 0 ? filteredMemberList : updatedMemberList,
      );
    }
  }, [
    memberLikes,
    memberFavorites,
    members,
    setMemberList,
    retrievingMemberData,
    debouncedAgeFilterVal,
  ]);

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center w-full">
        <div className="flex justify-center lg:grid-cols-9 grid-cols-1 gap-4">
          <div className="hidden lg:block w-32"></div>
          <div className="col-span-4 w-min overflow-auto no-scrollbar 2xl:w-1/2">
            {retrievingMemberData
              ? (
                <>
                  {/* <div className="flex flex-col justify-center space-x-4 w-full ml-5 mt-10 border w-full"> */}
                  <div className="flex flex-col items-start space-y-2 p-5 border bg-white m-5 w-[470px]">
                    <Skeleton className="h-[50px] w-full" />
                  </div>

                  <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                    <Skeleton className="h-[500px] w-full" />
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                  {/* </div> */}
                </>
              )
              : (
                <>
                  <PostHeader />
                  <div
                    className="no-scrollbar lg:p-8 px-0 lg:w-full h-screen w-screen rounded-b-xl space-y-4 border border-[#E0E0E0] lg:h-min overflow-y-auto scroll-smooth"
                    ref={containerRef}
                  >
                    {memberList.length > 0
                      ?
                      <Posts memberList={memberList} />
                      : (
                        <div className="rounded-t-md lg:w-[460px] w-[350px] h-[554px] object-cover h-screen">
                          No members associated with current user
                        </div>
                      )}
                  </div>
                </>
              )}
          </div>
          <div className="md:col-span-3 col-span-0 xs:hidden overflow-auto no-scrollbar ml-10">
            <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
              <HomepageSearchInput />
              {/* filter */}
              <div className="border mt-5 py-5 mx-2  rounded-lg">
                <p className="px-5 text-[#cfd8e4]">Suggested</p>
                <div className="flex flex-row justify-between items-center p-5 space-x-5">
                  <p
                    onClick={() => {
                      setSuggestedTriggered((prev) => !prev);
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
                      setSuggestedTriggered((prev) => !prev);
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
                      setSuggestedTriggered((prev) => !prev);
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
                <div className="flex flex-row justify-between items-center p-5 space-x-5">
                  <p
                    onClick={() => {
                      setSuggestedTriggered((prev) => !prev);
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
                      setSuggestedTriggered((prev) => !prev);
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
                      setSuggestedTriggered((prev) => !prev);
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
                <div className="flex flex-row justify-between items-center">
                  <p className="px-5 text-[#cfd8e4]">Filter By</p>
                  <p className="px-5 text-[#7e7e7e] text-xs underline hover:cursor-pointer">
                    Clear
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center mt-5">
                  <p className="px-5 text-sm">Age</p>
                  <p className="px-5 text-sm">{`${startAgeSliderVal}-${endAgeSliderVal}`}</p>
                </div>
                {/* <form action="post" onSubmit={formik.handleSubmit}> */}
                <div className="flex flex-row justify-center align-center py-5 px-5 mt-5">
                  <p className="text-slate-500 text-sm">From</p>
                  <Slider
                    // defaultValue={[50]}
                    value={[filters ? filters!.min_age : 23]}
                    max={60}
                    step={1}
                    className="w-full px-5"
                    onValueChange={handleStartSliderChange}
                    name="age"
                  />
                </div>
                <div className="flex flex-row justify-center align-center py-5 px-5">
                  <p className="text-slate-500 text-sm">To</p>
                  <Slider
                    // defaultValue={[50]}
                    // dir="right-to-left"
                    value={[filters ? filters!.max_age : 60]}
                    max={100}
                    step={1}
                    className="w-full pl-10 pr-5"
                    onValueChange={handleEndSliderChange}
                    name="age"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
