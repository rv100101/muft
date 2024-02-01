import onboardingStore from "@/zustand/profile/onboarding/onboardingStore"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import BasicInformationStep from "./BasicInformationStep"
import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form"
import { fieldNames } from "@/lib/formFieldKeys"
import { useCallback, useEffect, useState, } from "react"
import LocationStep from "./LocationStep"
import BackgroundStep from "./BackgroundStep"
import LanguagesStep from "./LanguagesStep"
import AppearanceStep from "./AppearanceStep"
import LifestyleStep from "./LifestyleStep"
import PetsStep from "./PetsStep"
import FavoriteFoodStep from "./FavoriteFoodStep"
import HealthStep from "./HealthStep"
import MaritalStatusStep from "./MaritalStatusStep"
import EmploymentStatusStep from "./EmploymentStatusStep"
import InterestsStep from "./InterestsStep"
import profileAboutContentStore from "@/zustand/profile/profileAboutStore"
import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import PreferredLanguageDialog from "../preferredLanguageDialog"

const OnboardingWrapper = () => {
  const [t, i18n] = useTranslation(); const { isSaving
  } = profileAboutContentStore();
  const {
    formState: { errors, dirtyFields, isValidating, }, trigger
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const setStep = onboardingStore(state => state.setStep);
  const [goNext, setGoNext] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (step > fieldNames.length) {
      setStep(fieldNames.length);
    }
  }, [step, setStep]);

  function checkKeysInErrorObject(keys: string[], errorObj: FieldErrors<FieldValues>): boolean {
    for (const key of keys) {
      if ((key in errorObj)) {
        console.log(key);
        return false;
      }
    }
    return true;
  }

  function checkDirtyFields(keys: string[], errorObj: Record<string, boolean>): boolean {
    for (const key of keys) {
      if (!(key in errorObj)) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const getFields: () => string[] = () => {
      if (step >= fieldNames.length) {
        return fieldNames[fieldNames.length - 1]
      } else {
        return fieldNames[step - 1]
      }
    }
    const validateFields = getFields();
    const pass = checkKeysInErrorObject(validateFields, errors);
    const isDirty = checkDirtyFields(validateFields, dirtyFields);

    console.log(dirtyFields);
    console.log(!isValidating, pass, isDirty, goNext);

    if (!isValidating && pass && isDirty && goNext) {
      setGoNext(false);
      setStep(step + 1);
    } else {
      setGoNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields, errors, goNext, isValidating, setStep, trigger])


  const handleNext = useCallback(() => {
    const getFields: () => string[] = () => {
      if (step >= fieldNames.length) {
        return fieldNames[fieldNames.length - 1]
      } else {
        return fieldNames[step - 1]
      }
    }
    const validateFields = getFields();
    console.log("FIELDS TO VALIDATE: ", validateFields);
    trigger(validateFields);
    setGoNext(true);
  }, [step, trigger]);

  return (
    <>
      <div className={cn("my-8 text-lg flex px-8 sm:w-1/2 items-center justify-between")}>
        <StepHeader step={step} />
        <PreferredLanguageDialog
          showTrigger={true}
          triggerTitle={i18n.language == "en" ? "العربية" : "English"}
          triggerVariant="default"
        />
      </div>
      <div className="px-12 w-full flex justify-center">
        <Progress value={(step / 12) * 100} className={cn("sm:w-1/2 mb-8 h-2", i18n.language == 'ar' && 'rotate-180')} />
      </div>
      <StepView step={step} />
      <hr className="h-4 w-full sm:w-1/2 mt-8" />
      <div className={cn("w-full px-8 sm:w-1/2 flex justify-end", step !== 1 && "justify-between")}>
        {
          step !== 1 && <Button
            disabled={isSaving}
            type="button" className="hover:bg-[#FF599B]/90" onClick={() => {
              setStep(step - 1)
              setGoNext(false);
            }}>{t("onboarding.back")}</Button>
        }
        {
          step !== 12 ? <Button type="button" className="hover:bg-[#FF599B]/90" onClick={handleNext} >{t("onboarding.next")}</Button>
            : <Button className=" hover:bg-[#FF599B]/90"
              disabled={isSaving}
              onClick={() => {
                setSubmit(true);
              }}
              type={submit ? "submit" : "button"}
            >Finish
              {isSaving && (
                <span>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </span>
              )}
            </Button>
        }
      </div >
    </>
  )
}

const StepView = ({ step }: { step: number }) => {
  const forms = [
    <BasicInformationStep />, <LocationStep />, <BackgroundStep />, <LanguagesStep />, <AppearanceStep />, <LifestyleStep />, <PetsStep />,
    <FavoriteFoodStep />, <HealthStep />, <MaritalStatusStep />, <EmploymentStatusStep />, <InterestsStep />
  ];
  if (step > forms.length) {
    return forms[forms.length - 1];
  }
  return forms[step - 1];
}

const StepHeader = ({ step }: { step: number }) => {
  const [t] = useTranslation();
  const headers = [
    <h1 className="font-semibold ">{t("onboarding.startWithBasics")} ✅</h1>,
    <h1 className="font-semibold">{t("onboarding.whereAreYouFrom")} 🗺️</h1>,
    <h1 className="font-semibold">{t("onboarding.tellBackground")}🏫</h1>,
    <h1 className="font-semibold">{t("memberDetails.languages")} 🦜</h1>,
    <h1 className="font-semibold">{t("memberDetails.appearance")} ✨</h1>,
    <h1 className="font-semibold">{t("memberDetails.lifestyle")} ☀️</h1>,
    <h1 className="font-semibold">{t("memberDetails.pets")} 🐹</h1>,
    <h1 className="font-semibold">{t("memberDetails.favoriteFood")} 🍲</h1>,
    <h1 className="font-semibold">{t("memberDetails.health")} 🌱</h1>,
    <h1 className="font-semibold">{t("memberDetails.maritalStatus")} 💍</h1>,
    <h1 className="font-semibold">{t("memberDetails.employment")} 💼</h1>,
    <h1 className="font-semibold">{t("memberDetails.interests")} 🎲</h1>,
  ];
  if (step > headers.length) {
    return headers[headers.length - 1];
  }
  return headers[step - 1];
}

export default OnboardingWrapper
