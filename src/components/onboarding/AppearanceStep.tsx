import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Hair, Eye, BodyType, BodyArt } from "@/types/profile";
import AppearanceForm from "../profile/about/forms/appearanceForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Skeleton } from "../ui/skeleton";

const AppearanceStep = () => {
  const [, i18n] = useTranslation();
  const {
    setEyes,
    setHair,
    setBodyTypes,
    setBodyArts,
    eyes,
    hair,
    bodyArts,
    bodyTypes,
  } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 5) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

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
    queryFn: () => profileContentQuery.editOptions.getBodyArts(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["bodyArts", i18n.language],
    onSuccess: (data: BodyArt[]) => {
      setBodyArts(data);
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

  const { setIsLoading, isLoading } = profileAboutContentStore();

  useEffect(() => {
    setIsLoading(
      eyes.length == 0 ||
      hair.length == 0 ||
      bodyArts.length == 0 ||
      bodyTypes.length == 0
    );
  }, [
    bodyArts.length,
    bodyTypes.length,
    eyes.length,
    hair.length,
    setIsLoading,
  ]);

  return isLoading ? (
    <div className="grid w-full sm:w-3/4 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  ) : (
    <div className="w-full h-full sm:w-3/4">
      <AppearanceForm />
    </div>
  );
};

export default AppearanceStep;
