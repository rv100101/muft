import { Slider } from "@/components/ui/slider";
import { MemberData } from "@/types/home";
import { useFilterStore } from "@/zustand/home/filter";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
const HomeFilters = ({
  isLoading,
  members,
}: {
  isLoading: boolean;
  members: MemberData[] | null | undefined;
}) => {
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const filters = useFilterStore((state) => state.filters);
  const [startAgeSliderVal, setStartAgeSliderVal] = useState(18);
  const [endAgeSliderVal, setEndAgeSliderVal] = useState(80);
  const debouncedStartFilterVal = useDebounce(filters!.min_age, 300);
  const debouncedEndFilterVal = useDebounce(
    filters!.max_age < startAgeSliderVal ? startAgeSliderVal : filters!.max_age,
    300
  );
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const generateRandomNumbers = () => {
    const min = 18;
    const max = 75;

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

  useEffect(() => {
    if (members) {
      const filteredMemberList = members.filter(
        (member: MemberData) =>
          member.age >= debouncedStartFilterVal &&
          member.age <= debouncedEndFilterVal
      );

      setMemberList(filteredMemberList);
    }
  }, [
    isLoading,
    members,
    setMemberList,
    debouncedEndFilterVal,
    debouncedStartFilterVal,
  ]);

  useEffect(() => {
    generateRandomNumbers();
  }, []);
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
  const handleStartSliderChange = (val: Array<number>) => {
    setStartAgeSliderVal(val[0]);
    updateFilters({
      max_age: val[0] > endAgeSliderVal ? val[0] : endAgeSliderVal,
      min_age: val[0],
    });
  };

  const handleEndSliderChange = (val: Array<number>) => {
    let endAge = val[0];
    if (endAge > 80) {
      endAge = 80;
    }
    setEndAgeSliderVal(endAge);
    updateFilters({
      max_age: endAge < startAgeSliderVal ? startAgeSliderVal : endAge,
      min_age: startAgeSliderVal,
    });
  };

  const toggleSuggestionTags = (index: number, suggestionValue: number) => {
    const newActiveTags = clickedTags.map((_, i) => i === index);
    if (suggestionValue === 100) {
      setEndAgeSliderVal(100);
      updateFilters({ max_age: 100, min_age: suggestionValue });
    } else {
      setEndAgeSliderVal(suggestionValue + 5);
      updateFilters({
        max_age: suggestionValue + 5,
        min_age: suggestionValue,
      });
    }

    // setStartAgeSliderVal(suggestionValue);
    setClickedTags(newActiveTags);
  };
  return (
    <div className="border-none sm:border-solid sm:border mt-5 py-5 mx-2 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <p className="px-0 sm:px-5 text-[#cfd8e4]">Filter By</p>
        {/* <p className="px-5 text-[#7e7e7e] text-xs underline hover:cursor-pointer">
                    Clear
                  </p> */}
      </div>

      <div className="flex flex-col border-none sm:border-solid sm:border m-0 sm:m-5 rounded-lg px-0 sm:px-5">
        <p className="px-5 text-[#cfd8e4] pt-5 hidden sm:flex">Suggested</p>
        <div className="flex flex-row justify-between items-center p-4 space-x-5">
          <p
            onClick={() => {
              setStartAgeSliderVal(randomNumbers[0]);
              toggleSuggestionTags(0, randomNumbers[0]);
            }}
            className={`${
              !clickedTags[0]
                ? "bg-white text-[#ff569a]"
                : "bg-[#ff569a] text-white"
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
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
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
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
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
          >
            {randomNumbers[2]}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center p-4 space-x-5">
          <p
            onClick={() => {
              setStartAgeSliderVal(randomNumbers[3]);
              toggleSuggestionTags(3, randomNumbers[3]);
            }}
            className={`${
              !clickedTags[3]
                ? "bg-white text-[#ff569a]"
                : "bg-[#ff569a] text-white"
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
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
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
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
            } hover:bg-[#ff569a] hover:text-white text-center px-5 py-1 rounded-full  border border-[#ff569a] w-full hover:cursor-pointer dark:bg-[#3b0117]`}
          >
            {randomNumbers[5]}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mt-5">
          <p className="px-5 text-sm">Age</p>
          {/* <p className="px-5 text-sm">{`${startAgeSliderVal}-${endAgeSliderVal}`}</p> */}
          <p className="px-5 text-sm">{`${filters?.min_age}-${filters?.max_age}`}</p>
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
            min={18}
            max={80}
            step={1}
            className="w-full ml-10 pr-5"
            onValueChange={handleEndSliderChange}
            name="age"
          />
        </div>
      </div>
    </div>
  );
};
export default HomeFilters;