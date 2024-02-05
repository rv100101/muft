import LanguagesForm from "../profile/about/forms/languagesForm";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Languages } from "@/types/profile";
import { useUserStore } from "@/zustand/auth/user";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

const LanguagesStep = () => {
  const [, i18n] = useTranslation();
  const { setLanguages } = selectOptions();

  const user = useUserStore((state) => state.user);

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 4) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getLanguages(
        i18n.language,
        user!.member_id
      ),
    queryKey: ["languages"],
    onSuccess: (data: Languages[]) => {
      console.log(data);
      setLanguages(data);
    },
  });

  return (
    <div className="h-36 w-full sm:w-1/2">
      <LanguagesForm />
    </div>
  );
};

export default LanguagesStep;
