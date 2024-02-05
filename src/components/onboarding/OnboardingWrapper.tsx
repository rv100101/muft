import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import BasicInformationStep from "./BasicInformationStep";
import { cn, convertJsonToConvertedObject } from "@/lib/utils";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { fieldNames } from "@/lib/formFieldKeys";
import { useCallback, useEffect, useState } from "react";
import LocationStep from "./LocationStep";
import BackgroundStep from "./BackgroundStep";
import LanguagesStep from "./LanguagesStep";
import AppearanceStep from "./AppearanceStep";
import LifestyleStep from "./LifestyleStep";
import PetsStep from "./PetsStep";
import FavoriteFoodStep from "./FavoriteFoodStep";
import HealthStep from "./HealthStep";
import MaritalStatusStep from "./MaritalStatusStep";
import EmploymentStatusStep from "./EmploymentStatusStep";
import InterestsStep from "./InterestsStep";
import profileAboutContentStore, {
  ProfileAbout,
} from "@/zustand/profile/profileAboutStore";
import { Loader2, LogOutIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import PreferredLanguageDialog from "../preferredLanguageDialog";
import logo from "@/assets/single-logo.png";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/zustand/auth/user";
import profileContentQuery, {
  ProfileContent,
} from "@/queries/profile/profileContent";
import { Skeleton } from "../ui/skeleton";

const OnboardingWrapper = () => {
  const {
    isLoading,
    setIsLoading,
    setData: setAboutData,
    setProfileData,
  } = profileAboutContentStore();
  const queryClient = useQueryClient();
  const signOut = useUserStore((state) => state.reset);
  const [t, i18n] = useTranslation();
  const { isSaving } = profileAboutContentStore();
  const {
    formState: { errors, dirtyFields, isValidating },
    trigger,
    getValues,
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const setStep = onboardingStore((state) => state.setStep);
  const [goNext, setGoNext] = useState(false);
  const [submit, setSubmit] = useState(false);
  const user = useUserStore((state) => state.user);

  // useEffect(() => {
  //   trigger(fieldNames[step - 1]);
  // }, [dirtyFields, i18n.language, step, trigger]);

  const { isLoading: currentUserLoading, isRefetching } = useQuery({
    queryKey: ["profileContent", user!.member_id, i18n.language],
    queryFn: async () => {
      const additionalInformation =
        await profileContentQuery.fetchAdditionalInformation(
          user!.member_id,
          i18n.language
        );
      const memberDetails = await profileContentQuery.fetchMemberDetails(
        user!.member_id,
        i18n.language
      );
      let jsonArray: string | null = null;
      if (typeof memberDetails == "string" && memberDetails.length !== 0) {
        const jsonArrayString = `[${memberDetails.replace(/}\s*{/g, "},{")}]`;
        jsonArray = JSON.parse(jsonArrayString);
      }
      const convertedDetails = convertJsonToConvertedObject(
        jsonArray == null ? memberDetails : jsonArray![0]
      );
      const details = {
        ...convertedDetails,
        ...additionalInformation,
      };

      return details;
    },
    onSuccess: (data: ProfileAbout) => {
      console.log(data);
      setAboutData(data);
      setProfileData(data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsLoading(currentUserLoading || isRefetching || isSaving);
  }, [currentUserLoading, isRefetching, isSaving, setIsLoading]);

  useEffect(() => {
    if (step > fieldNames.length) {
      setStep(fieldNames.length);
    }
  }, [step, setStep]);

  function checkKeysInErrorObject(
    keys: string[],
    errorObj: FieldErrors<FieldValues>
  ): boolean {
    for (const key of keys) {
      if (key in errorObj) {
        console.log(key);
        return false;
      }
    }
    return true;
  }

  function checkDirtyFields(
    keys: string[],
    errorObj: Record<string, boolean>
  ): boolean {
    for (const key of keys) {
      if (!(key in errorObj)) {
        return false;
      }
    }
    return true;
  }

  const handleSaveOnNext = async () => {
    const values = getValues();
    await profileContentQuery.saveOnboarding(
      values as ProfileContent,
      user!.member_id,
      step
    );
  };

  useEffect(() => {
    const getFields: () => string[] = () => {
      if (step >= fieldNames.length) {
        return fieldNames[fieldNames.length - 1];
      } else {
        return fieldNames[step - 1];
      }
    };
    const validateFields = getFields();
    const pass = checkKeysInErrorObject(validateFields, errors);
    const isDirty = checkDirtyFields(validateFields, dirtyFields);

    if (!isValidating && pass && isDirty && goNext) {
      setGoNext(false);
      handleSaveOnNext();
      setStep(step + 1);
    } else {
      setGoNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields, errors, goNext, isValidating, setStep, trigger]);

  const handleNext = useCallback(() => {
    const getFields: () => string[] = () => {
      if (step >= fieldNames.length) {
        return fieldNames[fieldNames.length - 1];
      } else {
        return fieldNames[step - 1];
      }
    };
    const validateFields = getFields();
    trigger(validateFields);
    setGoNext(true);
  }, [step, trigger]);

  return isSaving ? (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={logo} className="animate-bounce" alt="muffin-logo" />
      <SavingAnimationMessage step={1} />
    </div>
  ) : (
    <>
      <div
        className={cn(
          "my-2 text-lg flex-col px-8 w-full sm:w-1/2 items-center justify-center flex"
        )}
      >
        <div className="flex justify-between w-full mb-6">
          <PreferredLanguageDialog
            showTrigger={true}
            triggerTitle={i18n.language == "en" ? "العربية" : "English"}
            triggerVariant="default"
          />
          <Dialog>
            <DialogTrigger>
              <div
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
                className={cn(
                  "flex space-x-2 my-4 ml-3",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                {
                  <LogOutIcon
                    size={20}
                    className={cn(
                      "text-primary",
                      i18n.language == "ar" && "rotate-180"
                    )}
                  />
                }{" "}
                <p className="text-sm">{t("menu.signOut")}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="w-72 sm:max-w-md opacity-100">
              <DialogHeader>
                <DialogTitle>{t("signOut.confirmSignOut")}</DialogTitle>
              </DialogHeader>
              <DialogFooter className="sm:justify-start flex flex-col space-y-2 sm:space-y-0 pt-5">
                <Button
                  className="hover:bg-primary"
                  onClick={() => {
                    queryClient.invalidateQueries();
                    signOut();
                  }}
                >
                  {t("signOut.yes")}
                </Button>
                <DialogClose asChild>
                  <Button
                    className="text-white hover:bg-secondary "
                    type="button"
                    variant="secondary"
                  >
                    {t("signOut.no")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <StepHeader step={step} />
      </div>
      <div className="px-12 w-full flex justify-center">
        <Progress
          value={(step / 12) * 100}
          className={cn(
            "sm:w-1/2 mb-8 h-2",
            i18n.language == "ar" && "rotate-180"
          )}
        />
      </div>
      {isLoading ? (
        <div className="grid w-full sm:w-1/2 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <StepView step={step} />
      )}
      <hr className="h-4 w-full sm:w-1/2 mt-8" />
      <div
        className={cn(
          "w-full px-8 sm:w-1/2 flex justify-end",
          step !== 1 && "justify-between"
        )}
      >
        {step !== 1 && (
          <Button
            disabled={isSaving}
            type="button"
            className="hover:bg-[#FF599B]/90"
            onClick={() => {
              setStep(step - 1);
              setGoNext(false);
            }}
          >
            {t("onboarding.back")}
          </Button>
        )}
        {step !== 12 ? (
          <Button
            type="button"
            className="hover:bg-[#FF599B]/90"
            onClick={handleNext}
          >
            {t("onboarding.next")}
          </Button>
        ) : (
          <Button
            className=" hover:bg-[#FF599B]/90"
            disabled={isSaving}
            onClick={() => {
              setSubmit(true);
            }}
            type={submit ? "submit" : "button"}
          >
            Finish
            {isSaving && (
              <span>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </span>
            )}
          </Button>
        )}
      </div>
    </>
  );
};

const StepView = ({ step }: { step: number }) => {
  const forms = [
    <BasicInformationStep />,
    <LocationStep />,
    <BackgroundStep />,
    <LanguagesStep />,
    <AppearanceStep />,
    <LifestyleStep />,
    <PetsStep />,
    <FavoriteFoodStep />,
    <HealthStep />,
    <MaritalStatusStep />,
    <EmploymentStatusStep />,
    <InterestsStep />,
  ];
  if (step > forms.length) {
    return forms[forms.length - 1];
  }
  return forms[step - 1];
};

const StepHeader = ({ step }: { step: number }) => {
  const [t] = useTranslation();
  const headers = [
    <h1 className="font-semibold ">{t("onboarding.startWithBasics")} ✅</h1>,
    <h1 className="font-semibold">{t("onboarding.whereAreYouFrom")} 🗺️</h1>,
    <h1 className="font-semibold">{t("onboarding.tellBackground")} 🏫</h1>,
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
};

const SavingAnimationMessage = ({ step }: { step: number }) => {
  const headers = [
    <p className="font-semibold text-2xl">Saving your profile... 📋</p>,
  ];
  if (step > headers.length) {
    return headers[headers.length - 1];
  }
  return headers[step - 1];
};

export default OnboardingWrapper;
