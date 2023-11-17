import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import AboutAccordionContent from "./aboutAccordionContent";
import { useQuery } from "@tanstack/react-query";
import profileContentQuery from "@/queries/profile/profileContent";
import profileAboutContentStore, {
  ProfileAbout,
} from "@/zustand/profile/profileAboutStore";
import { useEffect } from "react";
import {
    BodyType,
  Education,
  Ethnicity,
  FavoriteFood,
  Income,
  Languages,
  MaritalStatus,
  Nationality,
  Occupation,
} from "@/types/profile";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { useLocation } from "wouter";
const AboutAccordion = ({ userId }: { userId: number }) => {
  const setIsLoading = profileAboutContentStore((state) => state.setIsLoading);
  const setAboutData = profileAboutContentStore((state) => state.setData);
  const setEditModeFalse = profileAboutContentStore((state) =>
    state.setEditModeFalse
  );
  const {
    setNationalities,
    setEthnicities,
    setMaritalStatus,
    setLanguages,
    setEducations,
    setIncomes,
    setOccupations,
    setFavoriteFoods,
    setBodyTypes
  } = selectOptions();

  const [location] = useLocation();

  useEffect(() => {
    if (!location.startsWith("/profile")) {
      setEditModeFalse();
    }
  }, []);

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["profileContent", userId],
    refetchInterval: Infinity,
    queryFn: async () => {
      const basicInfo = await profileContentQuery.fetchBasicInfoInitialData(
        userId,
      );
      const workEducation = await profileContentQuery
        .fetchWorkEducationInitialData(userId);
      const location = await profileContentQuery.fetchLocationInitialData(
        userId,
      );
      const details = await profileContentQuery.fetchDetailsInitialData(
        userId,
      );
      return {
        ...basicInfo,
        ...workEducation,
        ...location,
        ...details,
      };
    },
    onSuccess: (data: ProfileAbout) => {
      setAboutData(data);
    },
    refetchOnWindowFocus: false,
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getNationality(),
    refetchInterval: Infinity,
    queryKey: ["nationalities"],
    onSuccess: (data: Nationality[]) => {
      setNationalities(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getLanguages(userId),
    refetchInterval: Infinity,
    queryKey: ["languages"],
    onSuccess: (data: Languages[]) => {
      setLanguages(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEthnicity(),
    refetchInterval: Infinity,
    queryKey: ["ethnicities"],
    onSuccess: (data: Ethnicity[]) => {
      setEthnicities(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getMaritalStatus(),
    refetchInterval: Infinity,
    queryKey: ["maritalStatus"],
    onSuccess: (data: MaritalStatus[]) => {
      setMaritalStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEducation(),
    refetchInterval: Infinity,
    queryKey: ["educations"],
    onSuccess: (data: Education[]) => {
      setEducations(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getOccupations(),
    refetchInterval: Infinity,
    queryKey: ["occupations"],
    onSuccess: (data: Occupation[]) => {
      setOccupations(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getIncomes(),
    refetchInterval: Infinity,
    queryKey: ["incomes"],
    onSuccess: (data: Income[]) => {
      setIncomes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getFavoriteFoods(userId),
    refetchInterval: Infinity,
    queryKey: ["favoriteFoods"],
    onSuccess: (data: FavoriteFood[]) => {
      setFavoriteFoods(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getBodyTypes(),
    refetchInterval: Infinity,
    queryKey: ["bodyTypes"],
    onSuccess: (data: BodyType[]) => {
      setBodyTypes(data);
    },
  });

  useEffect(() => {
    setIsLoading(isLoading || isRefetching);
  }, [isLoading, setIsLoading, isRefetching]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion
        type="single"
        collapsible
        className="w-full underline-0"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="px-5 py-1">
          <AccordionTrigger className="">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              About
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <AboutAccordionContent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutAccordion;
