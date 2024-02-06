import { useTranslation } from "react-i18next";
import BasicInformationForm from "../profile/about/forms/basicInformationForm";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Nationality } from "@/types/profile";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Skeleton } from "../ui/skeleton";

const BasicInformationStep = () => {
  const [, i18n] = useTranslation();

  const { setNationalities, nationalities } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();
  const step = onboardingStore((state) => state.step);
  const fields = fieldNames[step - 1];
  const values = useWatch({ name: fields });
  useEffect(() => {
    if (step == 1) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, trigger, step, fields, dirtyFields]);

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getNationality(i18n.language),
    queryKey: ["nationalities", i18n.language],
    onSuccess: (data: Nationality[]) => {
      setNationalities(data);
    },
  });

  const { setIsLoading, isLoading } = profileAboutContentStore();
  useEffect(() => {
    setIsLoading(nationalities.length == 0);
  }, [nationalities, setIsLoading]);

  return isLoading ? (
    <div className="grid w-full sm:w-1/2 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  ) : (
    <div className="w-full sm:w-1/2">
      <BasicInformationForm />
    </div>
  );
};

export default BasicInformationStep;
