import onboardingStore from "@/zustand/profile/onboarding/onboardingStore"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import BasicInformationStep from "./BasicInformationStep"
import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form"
import { basicInfoFields, locationFields } from "@/lib/formFieldKeys"
import { useCallback } from "react"
import LocationStep from "./LocationStep"

const OnboardingWrapper = () => {
  const {
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  const step = onboardingStore(state => state.step);
  const setStep = onboardingStore(state => state.setStep);

  function checkKeysInErrorObject(keys: string[], errorObj: FieldErrors<FieldValues>): boolean {
    for (const key of keys) {
      if ((key in errorObj)) {
        console.log(key);
        return false;
      }
    }
    return true;
  }


  const handleNext = useCallback(() => {
    const getFields: () => string[] = () => {
      if (step == 1) {
        return basicInfoFields;
      }
      if (step == 2) {
        return locationFields;
      }
      return [];
    }

    if (Object.keys(errors).length == 0) {
      return;
    }
    const validateFields = getFields();

    const pass = checkKeysInErrorObject(validateFields, errors);
    if (pass) {
      setStep(step + 1);
    }
  }, [errors, setStep, step]);

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
      <div className={cn("w-full sm:w-1/2 flex justify-end", step !== 1 && "justify-between")}>
        {
          step !== 1 && <Button type="button" className="hover:bg-[#FF599B]/90" onClick={() => setStep(step - 1)}>Back</Button>
        }
        {
          step !== 12 ? <Button className="hover:bg-[#FF599B]/90" onClick={handleNext} >Next</Button>
            : <Button className="hover:bg-[#FF599B]/90" onClick={() => { }} >Save</Button>
        }
      </div >
    </>
  )
}

const StepView = ({ step }: { step: number }) => {
  if (step == 1) {
    return <BasicInformationStep />
  }
  if (step == 2) {
    return <LocationStep />
  }
  return <></>
}

const StepHeader = ({ step }: { step: number }) => {
  if (step == 1) {
    return <h1 className="font-semibold ">Let's start with the basics ✅</h1>
  }
  if (step == 2) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 3) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 4) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 5) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 6) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 7) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 8) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 9) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 10) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 11) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  if (step == 12) {
    return <h1 className="font-semibold">Where are you from? 🗺️</h1>
  }
  return <></>
}

export default OnboardingWrapper
