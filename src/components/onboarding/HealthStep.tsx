import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Workout, Disability } from "@/types/profile";
import HealthForm from "../profile/about/forms/healthForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

const HealthStep = () => {
  const [, i18n] = useTranslation();
  const { setWorkout, setDisability } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 9) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

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

  return (
    <div className="w-full sm:w-1/2">
      <HealthForm />
    </div>
  );
};

export default HealthStep;
