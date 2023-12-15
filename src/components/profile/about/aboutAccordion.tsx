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
  BodyArt,
  BodyType,
  Car,
  Country,
  Disability,
  Drink,
  Education,
  EmploymentStatus,
  Ethnicity,
  Eye,
  FavoriteFood,
  Hair,
  HaveChildren,
  Income,
  Interest,
  Languages,
  LivingStatus,
  MaritalStatus,
  Nationality,
  Occupation,
  Pets,
  Religion,
  Smoke,
  State,
  WantChildren,
  Workout,
} from "@/types/profile";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { useLocation } from "wouter";
// import { useUserStore } from "@/zustand/auth/user";
import useSelectedCountryStore from "@/zustand/profile/location/selectedCountry";
import { convertJsonToConvertedObject } from "@/lib/utils";
const AboutAccordion = ({ userId }: { userId: number }) => {
  const selectedCountry = useSelectedCountryStore(
    (state) => state.selectedCountry
  );
  // const user = useUserStore((state) => state.user);
  const {
    setIsLoading,
    setData: setAboutData,
    setEditModeFalse,
  } = profileAboutContentStore();

  const {
    setEyes,
    setBodyArts,
    setNationalities,
    setEthnicities,
    setMaritalStatus,
    setLanguages,
    setEducations,
    setIncomes,
    setOccupations,
    setFavoriteFoods,
    setBodyTypes,
    setCountries,
    setStates,
    setHair,
    setHaveChildren,
    setWantChildren,
    setWorkout,
    setDisability,
    setPets,
    setDrinks,
    setSmoke,
    setLivingStatus,
    setCar,
    setInterest,
    setReligion,
    setEmploymentStatus,
  } = selectOptions();

  const [location] = useLocation();

  useEffect(() => {
    if (!location.startsWith("/profile")) {
      setEditModeFalse();
    }
  }, [location]);

  const { isLoading: currentUserLoading, isRefetching } = useQuery({
    queryKey: ["profileContent", userId],
    queryFn: async () => {
      const additionalInformation =
        await profileContentQuery.fetchAdditionalInformation(userId);
      const memberDetails = await profileContentQuery.fetchMemberDetails(
        userId,
        userId
      );
      console.log(memberDetails);
      const convertedDetails = convertJsonToConvertedObject(memberDetails);
      const details = {
        ...convertedDetails,
        ...additionalInformation,
      };
      console.log(details);
      return details;
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
    queryFn: () => profileContentQuery.editOptions.getLanguages(),
    refetchInterval: Infinity,
    queryKey: ["languages"],
    onSuccess: (data: Languages[]) => {
      setLanguages(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getInterests(),
    refetchInterval: Infinity,
    queryKey: ["interests"],
    onSuccess: (data: Interest[]) => {
      setInterest(data);
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
    queryFn: () => profileContentQuery.editOptions.getFavoriteFoods(),
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

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCountries(),
    refetchInterval: Infinity,
    queryKey: ["countries"],
    onSuccess: (data: Country[]) => {
      setCountries(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHair(),
    refetchInterval: Infinity,
    queryKey: ["hair"],
    onSuccess: (data: Hair[]) => {
      setHair(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEyes(),
    refetchInterval: Infinity,
    queryKey: ["eyes"],
    onSuccess: (data: Eye[]) => {
      setEyes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHaveChildren(),
    refetchInterval: Infinity,
    queryKey: ["haveChildren"],
    onSuccess: (data: HaveChildren[]) => {
      setHaveChildren(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWantChildren(),
    refetchInterval: Infinity,
    queryKey: ["wantChildren"],
    onSuccess: (data: WantChildren[]) => {
      setWantChildren(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWorkout(),
    refetchInterval: Infinity,
    queryKey: ["workout"],
    onSuccess: (data: Workout[]) => {
      setWorkout(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getDisability(),
    refetchInterval: Infinity,
    queryKey: ["disability"],
    onSuccess: (data: Disability[]) => {
      setDisability(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getPets(),
    refetchInterval: Infinity,
    queryKey: ["pets"],
    onSuccess: (data: Pets[]) => {
      setPets(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getDrink(),
    refetchInterval: Infinity,
    queryKey: ["drinks"],
    onSuccess: (data: Drink[]) => {
      setDrinks(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getSmoke(),
    refetchInterval: Infinity,
    queryKey: ["smokes"],
    onSuccess: (data: Smoke[]) => {
      setSmoke(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getLivingStatus(),
    refetchInterval: Infinity,
    queryKey: ["livingStatus"],
    onSuccess: (data: LivingStatus[]) => {
      setLivingStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCar(),
    refetchInterval: Infinity,
    queryKey: ["car"],
    onSuccess: (data: Car[]) => {
      setCar(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getBodyArts(),
    refetchInterval: Infinity,
    queryKey: ["bodyArts"],
    onSuccess: (data: BodyArt[]) => {
      setBodyArts(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getStates(selectedCountry),
    queryKey: ["states", selectedCountry],
    onSuccess: (data: State[]) => {
      console.log(data);
      setStates(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEmploymentStatus(),
    queryKey: ["employmentStatus"],
    onSuccess: (data: EmploymentStatus[]) => {
      setEmploymentStatus(data);
    },
  });

  useQuery({
    refetchInterval: Infinity,
    queryFn: () => profileContentQuery.editOptions.getReligion(),
    queryKey: ["religion"],
    onSuccess: (data: Religion[]) => {
      setReligion(data);
    },
  });

  useEffect(() => {
    setIsLoading(currentUserLoading || isRefetching);
  }, [setIsLoading, currentUserLoading, isRefetching]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion
        type="single"
        collapsible={false}
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="px-5 py-1">
          <AccordionTrigger className="hover:no-underline">
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
