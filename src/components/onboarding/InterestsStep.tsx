import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Interest } from "@/types/profile";
import InterestsForm from "../profile/about/forms/interestsForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

const InterestsStep = () => {
  const { setInterest } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 12) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getInterests(),
    refetchInterval: Infinity,
    queryKey: ["interests"],
    onSuccess: (data: Interest[]) => {
      setInterest(data);
    },
  });

  return (
    <div className="h-36 w-full sm:w-1/2">
      <InterestsForm />
    </div>
  );
};

export default InterestsStep;
