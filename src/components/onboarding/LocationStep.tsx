import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Country, State } from "@/types/profile";
import { useUpdateEffect } from "usehooks-ts";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import useSelectedCountryStore from "@/zustand/profile/location/selectedCountry";
import LocationForm from "../profile/about/forms/locationForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import { Skeleton } from "../ui/skeleton";

const LocationStep = () => {
  const [, i18n] = useTranslation();
  const { setCountries, setStates, countries, states } = selectOptions();
  const { selectedCountry, setSelectedCountry } = useSelectedCountryStore();
  const { data: profileAboutContent } = profileAboutContentStore();

  const {
    trigger,
    formState: { dirtyFields },
    getValues,
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 2) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
      const region = getValues("region");
      if (region.length !== 0) {
        trigger("region");
      }
    }
  }, [values, step, trigger, dirtyFields, getValues]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCountries(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["countries", i18n.language],
    onSuccess: (data: Country[]) => {
      setCountries(data);
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
  });

  useUpdateEffect(() => {
    if (countries.length !== 0 && profileAboutContent) {
      if (profileAboutContent.country.length !== 0) {
        setSelectedCountry(profileAboutContent.country_code);
      }
    }
  }, [countries, profileAboutContent]);

  const { setIsLoading, isLoading } = profileAboutContentStore();

  useEffect(() => {
    setIsLoading(
      countries.length == 0 ||
      (profileAboutContent?.region !== "" && states.length == 0)
    );
  }, [
    states.length,
    setIsLoading,
    countries.length,
    profileAboutContent?.region,
  ]);

  return isLoading ? (
    <div className="grid w-full sm:w-3/4 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  ) : (
    <div className="w-full sm:w-3/4">
      <LocationForm />
    </div>
  );
};

export default LocationStep;
