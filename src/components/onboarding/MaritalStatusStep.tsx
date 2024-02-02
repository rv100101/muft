import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { MaritalStatus, HaveChildren, WantChildren } from "@/types/profile";
import MaritalStatusForm from "../profile/about/forms/maritalStatusForm";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";


const MaritalStatusStep = () => {
  const [, i18n] = useTranslation();
  const {
    setMaritalStatus, setHaveChildren, setWantChildren
  } = selectOptions();

  const {
    trigger, formState: { dirtyFields }
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 10) {
      trigger(Object.keys(dirtyFields))
    }
  }, [values, step, trigger, dirtyFields]);


  useQuery({
    queryFn: () => profileContentQuery.editOptions.getMaritalStatus(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["maritalStatus", i18n.language],
    onSuccess: (data: MaritalStatus[]) => {
      setMaritalStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHaveChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["haveChildren", i18n.language],
    onSuccess: (data: HaveChildren[]) => {
      setHaveChildren(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWantChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["wantChildren", i18n.language],
    onSuccess: (data: WantChildren[]) => {
      setWantChildren(data);
    },
  });

  return (
    <div className="w-full sm:w-1/2">
      <MaritalStatusForm />
    </div>
  )
}

export default MaritalStatusStep
