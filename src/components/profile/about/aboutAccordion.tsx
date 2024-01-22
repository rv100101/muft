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
import * as Sentry from "@sentry/react";
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
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
const AboutAccordion = ({ userId }: { userId: number }) => {
  const [t, i18n] = useTranslation();
  const [location] = useLocation();
  const preferredLanguage = usePreferredLanguageStore(
    (state) => state.preferred
  );
  const { selectedCountry, setSelectedCountry } = useSelectedCountryStore();
  const { data: profileAboutContent, isSaving } = profileAboutContentStore();
  // const user = useUserStore((state) => state.user);
  const {
    setIsLoading,
    setData: setAboutData,
    setEditModeFalse,
    setProfileData,
    profileData,
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
    countries,
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

  useEffectOnce(() => {
    setEditModeFalse();
  });

  useEffectOnce(() => {
    if (location.startsWith("/profile") && profileData) {
      setAboutData(profileData);
    }
  });

  const { isLoading: currentUserLoading, isRefetching } = useQuery({
    queryKey: ["profileContent", userId, preferredLanguage],
    queryFn: async () => {
      const additionalInformation =
        await profileContentQuery.fetchAdditionalInformation(userId);
      const memberDetails = await profileContentQuery.fetchMemberDetails(
        userId,
        preferredLanguage ?? "en"
      );
      let jsonArray: string | null = null;
      if (typeof memberDetails == "string" && memberDetails.length !== 0) {
        const jsonArrayString = `[${memberDetails.replace(/}\s*{/g, "},{")}]`;
        jsonArray = JSON.parse(jsonArrayString);
      }
      const convertedDetails = convertJsonToConvertedObject(
        jsonArray == null ? memberDetails : jsonArray![0]
      );
      const details = {
        ...convertedDetails,
        ...additionalInformation,
      };

      return details;
    },
    onSuccess: (data: ProfileAbout) => {
      setAboutData(data);
      if (location.startsWith("/profile")) {
        setProfileData(data);
      }
    },
    onError: (err) => {
      Sentry.captureException(err);
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
    queryFn: () => profileContentQuery.editOptions.getEthnicity(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["ethnicities", i18n.language],
    onSuccess: (data: Ethnicity[]) => {
      setEthnicities(data);
    },
    onError: (err) => {
      Sentry.captureException(err);
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
    queryFn: () => profileContentQuery.editOptions.getEducation(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["educations", i18n.language],
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

  useUpdateEffect(() => {
    if (countries.length !== 0 && profileAboutContent) {
      console.log(countries, profileAboutContent);
      if (profileAboutContent.country.length !== 0) {
        console.log(profileAboutContent);
        setSelectedCountry(profileAboutContent.country_code);
        // countries.filter(

        //   (c) => c.country_name == profileAboutContent!.country
        // )[0].country_code
      }
    }
  }, [countries, profileAboutContent]);

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
    queryFn: () =>
      profileContentQuery.editOptions.getStates(
        profileAboutContent?.country_code ?? ""
      ),
    // enabled: selectedCountry.length !== 0,
    queryKey: ["states", selectedCountry],
    onSuccess: (data: State[]) => {
      setStates(data);
    },
    refetchOnReconnect: "always",
    onError: (err) => {
      Sentry.captureException(err);
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
    queryFn: () => profileContentQuery.editOptions.getReligion(i18n.language),
    queryKey: ["religion", i18n.language],
    onSuccess: (data: Religion[]) => {
      setReligion(data);
    },
  });

  useEffect(() => {
    setIsLoading(currentUserLoading || isRefetching || isSaving);
  }, [setIsLoading, currentUserLoading, isRefetching, isSaving]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion
        type="single"
        collapsible={false}
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="px-5 py-1 border-0">
          <AccordionTrigger className="hover:no-underline">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              {t("memberDetails.about")}
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
