import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Education, Ethnicity, Religion } from "@/types/profile";
import BackgroundForm from "../profile/about/forms/backgroundForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

const BackgroundStep = () => {
  const [, i18n] = useTranslation();
  const { setEducations, setReligion, setEthnicities } = selectOptions();

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 3) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEducation(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["educations", i18n.language],
    onSuccess: (data: Education[]) => {
      setEducations(data);
    },
  });

  useQuery({
    refetchInterval: Infinity,
    queryFn: () => profileContentQuery.editOptions.getReligion(i18n.language),
    queryKey: ["religion", i18n.language],
    onSuccess: (data: Religion[]) => {
      setReligion(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEthnicity(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["ethnicities", i18n.language],
    onSuccess: (data: Ethnicity[]) => {
      setEthnicities(data);
    },
  });

  return (
    <div className="w-full sm:w-1/2">
      <BackgroundForm />
    </div>
  );
};

export default BackgroundStep;
