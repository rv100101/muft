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
  Ethnicity,
  Eye,
  FavoriteFood,
  Hair,
  HaveChildren,
  Income,
  Languages,
  LivingStatus,
  MaritalStatus,
  Nationality,
  Occupation,
  Pets,
  Smoke,
  State,
  WantChildren,
  Workout,
} from "@/types/profile";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { useLocation } from "wouter";
import { useUserStore } from "@/zustand/auth/user";
const AboutAccordion = ({ userId }: { userId: number }) => {
  const { data } = profileAboutContentStore();
  const setIsLoading = profileAboutContentStore((state) => state.setIsLoading);
  const setAboutData = profileAboutContentStore((state) => state.setData);
  const setEditModeFalse = profileAboutContentStore((state) =>
    state.setEditModeFalse
  );
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
    selectedCountryCode,
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
    queryFn: () => profileContentQuery.editOptions.getLanguages(),
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
  const user = useUserStore((state) => state.user);

  const {
    countries,
  } = selectOptions();

  const getCountryData = (name: string | null) => {
    if (name) {
      return countries.find((c) => c.country_name === name);
    }
    return null;
  };

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getStates(
        getCountryData(data ? data.country : null)?.country_code ?? "",
      ),
    queryKey: ["states", selectedCountryCode],
    onSuccess: (data: State[]) => {
      setStates(data);
    },
  });

  useEffect(() => {
    setIsLoading(isLoading || isRefetching);
  }, [isLoading, setIsLoading, isRefetching]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion
        type="single"
        collapsible={user?.profile_completed}
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
