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

const LifestyleStep = () => {
  const [, i18n] = useTranslation();
  const {
    setDrinks, setSmoke, setLivingStatus, setCar
  } = selectOptions();

  const {
    trigger, formState: { dirtyFields }
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 6) {
      trigger(Object.keys(dirtyFields))
    }
  }, [values, step, trigger, dirtyFields]);

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
    queryFn: () => profileContentQuery.editOptions.getLivingStatus(i18n.language),
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

  return (
    <div className="w-full sm:w-1/2">
      <LifestyleForm />
    </div>
  )
}

export default LifestyleStep
