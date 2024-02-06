import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Occupation, Income, EmploymentStatus } from "@/types/profile";
import WorkEducationForm from "../profile/about/forms/workEducationForm";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Skeleton } from "../ui/skeleton";

const EmploymentStatusStep = () => {
  const [, i18n] = useTranslation();
  const {
    setOccupations,
    setIncomes,
    setEmploymentStatus,
    occupations,
    incomes,
    employmentStatus,
  } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 11) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

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
    queryFn: () =>
      profileContentQuery.editOptions.getEmploymentStatus(i18n.language),
    queryKey: ["employmentStatus", i18n.language],
    onSuccess: (data: EmploymentStatus[]) => {
      setEmploymentStatus(data);
    },
  });

  const { setIsLoading, isLoading } = profileAboutContentStore();

  useEffect(() => {
    setIsLoading(
      employmentStatus.length == 0 ||
        occupations.length == 0 ||
        incomes.length == 0
    );
  }, [
    employmentStatus.length,
    incomes.length,
    occupations.length,
    setIsLoading,
  ]);

  return isLoading ? (
    <div className="grid w-full sm:w-1/2 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  ) : (
    <div className="w-full sm:w-1/2">
      <WorkEducationForm />
    </div>
  );
};

export default EmploymentStatusStep;
