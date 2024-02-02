import { useTranslation } from "react-i18next";
import BasicInformationForm from "../profile/about/forms/basicInformationForm"
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Nationality } from "@/types/profile";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";


const BasicInformationStep = () => {
  const [, i18n] = useTranslation()
  const {
    trigger
  } = useFormContext();

  const {
    setNationalities
  } = selectOptions();

  const basicInfoValues = useWatch({ name: fieldNames[0] });
  const step = onboardingStore(state => state.step);

  useEffect(() => {
    if (step == 1) {
      trigger(fieldNames[0])
    }
  }, [basicInfoValues, trigger, step]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getNationality(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["nationalities", i18n.language],
    onSuccess: (data: Nationality[]) => {
      setNationalities(data);
    },
  });
  return (
    <div className="w-full sm:w-1/2">
      <BasicInformationForm />
    </div>
  )
}

export default BasicInformationStep
