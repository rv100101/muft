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
    queryKey: ["profileContent", userId, i18n.language],
    queryFn: async () => {
      const additionalInformation =
        await profileContentQuery.fetchAdditionalInformation(
          userId,
          i18n.language
        );
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
      console.log(data);

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
    queryFn: () =>
      profileContentQuery.editOptions.getNationality(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["nationalities", i18n.language],
    onSuccess: (data: Nationality[]) => {
      setNationalities(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getLanguages(i18n.language, userId),
    refetchInterval: Infinity,
    queryKey: ["languages"],
    onSuccess: (data: Languages[]) => {
      setLanguages(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getInterests(
        userId.toString(),
        i18n.language
      ),
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
    queryFn: () =>
      profileContentQuery.editOptions.getMaritalStatus(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["maritalStatus", i18n.language],
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
    queryFn: () =>
      profileContentQuery.editOptions.getOccupations(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["occupations", i18n.language],
    onSuccess: (data: Occupation[]) => {
      setOccupations(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getIncomes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["incomes", i18n.language],
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
    queryFn: () => profileContentQuery.editOptions.getBodyTypes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["bodyTypes", i18n.language],
    onSuccess: (data: BodyType[]) => {
      setBodyTypes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCountries(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["countries", i18n.language],
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
    queryFn: () => profileContentQuery.editOptions.getHair(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["hair", i18n.language],
    onSuccess: (data: Hair[]) => {
      setHair(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEyes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["eyes", i18n.language],
    onSuccess: (data: Eye[]) => {
      setEyes(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getHaveChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["haveChildren", i18n.language],
    onSuccess: (data: HaveChildren[]) => {
      setHaveChildren(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getWantChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["wantChildren", i18n.language],
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
    queryFn: () => profileContentQuery.editOptions.getDisability(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["disability", i18n.language],
    onSuccess: (data: Disability[]) => {
      setDisability(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getPets(userId.toString(), i18n.language),
    refetchInterval: Infinity,
    queryKey: ["pets"],
    onSuccess: (data: Pets[]) => {
      setPets(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getDrink(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["drinks", i18n.language],
    onSuccess: (data: Drink[]) => {
      console.log("drink", data);
      setDrinks(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getSmoke(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["smokes", i18n.language],
    onSuccess: (data: Smoke[]) => {
      console.log("smoke", data);
      setSmoke(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getLivingStatus(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["livingStatus", i18n.language],
    onSuccess: (data: LivingStatus[]) => {
      setLivingStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCar(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["car", i18n.language],
    onSuccess: (data: Car[]) => {
      setCar(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getBodyArts(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["bodyArts", i18n.language],
    onSuccess: (data: BodyArt[]) => {
      setBodyArts(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getStates(
        selectedCountry ?? "",
        i18n.language
      ),
    // enabled: selectedCountry.length !== 0,
    queryKey: ["states", selectedCountry, i18n.language],
    onSuccess: (data: State[]) => {
      setStates(data);
    },
    refetchOnReconnect: "always",
    onError: (err) => {
      Sentry.captureException(err);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getEmploymentStatus(i18n.language),
    queryKey: ["employmentStatus", i18n.language],
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
