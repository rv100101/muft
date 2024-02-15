import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Drink, Smoke, LivingStatus, Car } from "@/types/profile";
import LifestyleForm from "../profile/about/forms/lifestyleForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Skeleton } from "../ui/skeleton";

const LifestyleStep = () => {
  const [, i18n] = useTranslation();
  const {
    setDrinks,
    setSmoke,
    setLivingStatus,
    setCar,
    drink,
    smoke,
    livingStatus,
    car,
  } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 6) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getDrink(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["drinks", i18n.language],
    onSuccess: (data: Drink[]) => {
      setDrinks(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getSmoke(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["smokes", i18n.language],
    onSuccess: (data: Smoke[]) => {
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

  const { setIsLoading, isLoading } = profileAboutContentStore();

  useEffect(() => {
    setIsLoading(
      drink.length == 0 ||
      livingStatus.length == 0 ||
      car.length == 0 ||
      smoke.length == 0
    );
  }, [
    car.length,
    drink.length,
    livingStatus.length,
    setIsLoading,
    smoke.length,
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
      <LifestyleForm />
    </div>
  );
};

export default LifestyleStep;
