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

const AppearanceStep = () => {
  const [, i18n] = useTranslation();
  const {
    setEyes, setHair, setBodyTypes, setBodyArts
  } = selectOptions();

  const {
    trigger, formState: { dirtyFields }
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 5) {
      trigger(Object.keys(dirtyFields))
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

  return (
    <div className="w-full h-full sm:w-1/2">
      <AppearanceForm />
    </div>
  )
}

export default AppearanceStep
