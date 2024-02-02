import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Pets } from "@/types/profile";
import PetsForm from "../profile/about/forms/petsForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

const PetsStep = () => {
  const {
    setPets
  } = selectOptions();

  const {
    trigger, formState: { dirtyFields }
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 7) {
      trigger(Object.keys(dirtyFields))
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getPets(),
    refetchInterval: Infinity,
    queryKey: ["pets"],
    onSuccess: (data: Pets[]) => {
      setPets(data);
    },
  });

  return (
    <div className="h-36 w-full sm:w-1/2">
      <PetsForm />
    </div>
  )
}

export default PetsStep;
