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

const OnboardingWrapper = () => {
  const {
    isSaving
  } = profileAboutContentStore();
  const {
    formState: { errors, dirtyFields, isValidating, }, trigger
  } = useFormContext();

  const step = onboardingStore(state => state.step);
  const setStep = onboardingStore(state => state.setStep);
  const setIsFinished = onboardingStore(state => state.setIsFinished);
  const [goNext, setGoNext] = useState(false);

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
      return fieldNames[step - 1]
    }
    const validateFields = getFields();
    const pass = checkKeysInErrorObject(validateFields, errors);
    const isDirty = checkDirtyFields(validateFields, dirtyFields);
    if (!isValidating && pass && isDirty && goNext) {
      console.log('adding next: ', step);
      setGoNext(false);
      setStep(step + 1);
    } else {
      setGoNext(false);
    }
  }, [dirtyFields, errors, goNext, isValidating, setStep, step, trigger])


  const handleNext = useCallback(() => {
    const getFields: () => string[] = () => {
      return fieldNames[step - 1]
    }
    const validateFields = getFields();
    trigger(validateFields);
    setGoNext(true);
  }, [step, trigger]);

  console.log(step);

  return (
    <>
      <div className="my-8 text-lg">
        <StepHeader step={step} />
      </div>
      <div className="px-12 w-full flex justify-center">
        <Progress value={(step / 12) * 100} className="sm:w-1/2 mb-8 h-2" />
      </div>
      <StepView step={step} />
      <hr className="h-4 w-full sm:w-1/2 mt-8" />
      <div className={cn("w-full px-8 sm:w-1/2 flex justify-end", step !== 1 && "justify-between")}>
        {
          step !== 1 && <Button
            disabled={isSaving}
            type="button" className="hover:bg-[#FF599B]/90" onClick={() => {
              setStep(step - 1)
              setIsFinished(false);
              setGoNext(false);
            }}>Back</Button>
        }
        {
          step !== 12 ? <Button type="button" className="hover:bg-[#FF599B]/90" onClick={handleNext} >Next</Button>
            : <Button className=" hover:bg-[#FF599B]/90"
              disabled={isSaving}
              onClick={() => {
                setIsFinished(true);
              }}
              type="submit" >Finish
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
    return forms[-1];
  }
  return forms[step - 1];
}

const StepHeader = ({ step }: { step: number }) => {
  const headers = [
    <h1 className="font-semibold ">Let's start with the basics ✅</h1>,
    <h1 className="font-semibold">Where are you from? 🗺️</h1>,
    <h1 className="font-semibold">Tell us your background 🏫</h1>,
    <h1 className="font-semibold">Language 🦜</h1>,
    <h1 className="font-semibold">Appearance ✨</h1>,
    <h1 className="font-semibold">Lifestyle ☀️</h1>,
    <h1 className="font-semibold">Pets 🐹</h1>,
    <h1 className="font-semibold">Favorite Foods 🍲</h1>,
    <h1 className="font-semibold">Health 🌱</h1>,
    <h1 className="font-semibold">Marital Status 💍</h1>,
    <h1 className="font-semibold">Employment 💼</h1>,
    <h1 className="font-semibold">Interests 🎲</h1>,
  ];
  if (step > headers.length) {
    return headers[-1];
  }
  return headers[step - 1];
}

export default OnboardingWrapper
