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
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import removeExistingData from "@/lib/removeExistingData";

const OnboardingWrapper = () => {
  const {
    isLoading,
    setIsLoading,
    setData: setAboutData,
    data,
    setProfileData,
  } = profileAboutContentStore();
  const {
    educations,
    employmentStatus,
    incomes,
    occupations,
    nationalities,
    ethnicities,
    maritalStatus,
    bodyTypes,
    religion,
    countries,
    states,
    bodyArts,
    car,
    disability,
    drink,
    eyes,
    hair,
    haveChildren,
    wantChildren,
    livingStatus,
    smoke,
    workout,
  } = selectOptions();

  const getEthnicity = (ethnicityName: string) =>
    ethnicities.find((ethnicity) => ethnicity.ethnicity_name === ethnicityName);

  const getNationality = (nationalityName: string) =>
    nationalities.find(
      (nationality) => nationality.nationality === nationalityName
    );

  const getEducation = (name: string) =>
    educations.find((e) => e.education_name === name);

  const getOccupation = (name: string) =>
    occupations.find((e) => e.occupation_title === name);

  const getMaritalStatus = (maritalStatusName: string) =>
    maritalStatus.find((ms) => ms.marital_status_name === maritalStatusName);

  const getIncome = (name: string) =>
    incomes.find((income) => income.income_range === name);

  const getBodyType = (name: string) =>
    bodyTypes.find((bt) => bt.body === name);

  const getCountryData = (name: string) =>
    countries.find((c) => c.country_name === name);

  const getStateData = (name: string) =>
    states.find((s) => s.state_name === name);

  const getBodyArtsData = (name: string) =>
    bodyArts.find((s) => s.body === name);

  const getCarData = (name: string) => car.find((s) => s.car_name === name);

  const getDrinkData = (name: string) =>
    drink.find((s) => s.drink_name === name);

  const getDisabilityData = (name: string) =>
    disability.find((s) => s.disability_name === name);

  const getEyesData = (name: string) => eyes.find((s) => s.eyes_name === name);

  const getHairData = (name: string) => hair.find((s) => s.hair_name === name);

  const getHaveChildrenData = (name: string) =>
    haveChildren.find((s) => s.have_children_name === name);

  const getWantChildrenData = (name: string) =>
    wantChildren.find((s) => s.want_children_name === name);

  const getLivingStatusData = (name: string) =>
    livingStatus.find((s) => s.living_status === name);

  const getSmokeData = (name: string) =>
    smoke.find((s) => s.smoke_name === name);

  const getWorkoutData = (name: string) =>
    workout.find((s) => s.workout_name === name);

  const getReligion = (name: string) =>
    religion.find((s) => s.religion_name === name);

  const getEmploymentStatus = (name: string) =>
    employmentStatus.find((s) => s.employment_status_name === name);
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

  const { isLoading: currentUserLoading } = useQuery({
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
      setAboutData(data);
      setProfileData(data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (step == 1) {
      setIsLoading(currentUserLoading || isSaving);
    }
  }, [currentUserLoading, isSaving, setIsLoading, nationalities, step]);

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
    const formData = getValues();
    let finalFormData = { ...formData };
    const ethnicity = getEthnicity(formData.ethnicity);
    const nationality = getNationality(formData.nationality);
    const maritalStatus = getMaritalStatus(formData.maritalStatus);
    const education = getEducation(formData.education);
    const occupation = getOccupation(formData.occupationTitle);
    const income = getIncome(formData.income);
    const bodyType = getBodyType(formData.bodyType);
    const country = getCountryData(formData.country);
    const bodyArts = getBodyArtsData(formData.bodyArt);
    const car = getCarData(formData.car);
    const drink = getDrinkData(formData.drinking);
    const eyes = getEyesData(formData.eyes);
    const hair = getHairData(formData.hair);
    const haveChildren = getHaveChildrenData(formData.haveChildren);
    const wantChildren = getWantChildrenData(formData.wantChildren);
    const livingStatus = getLivingStatusData(formData.livingStatus);
    const smoke = getSmokeData(formData.smoking);
    const workout = getWorkoutData(formData.workout);
    const religion = getReligion(formData.religion);
    const disability = getDisabilityData(formData.disability);
    const employmentStatus = getEmploymentStatus(formData.employmentStatus);
    const region = getStateData(formData.region);
    const finalLanguages = removeExistingData(
      formData.language,
      data?.language ?? [],
      "language_name"
    );
    const finalFavoriteFood = removeExistingData(
      formData.favoriteFood,
      data?.favoriteFood ?? [],
      "favorite_food_name"
    );
    const finalPets = removeExistingData(
      formData.pets,
      data?.pets ?? [],
      "pet_name"
    );
    const finalInterests = removeExistingData(
      formData.interest,
      data?.interest ?? [],
      "interest_name"
    );
    finalFormData = {
      ...finalFormData,
      gender: formData.gender[0],
      language: finalLanguages,
      favoriteFood: finalFavoriteFood,
      pets: finalPets,
      interest: finalInterests,
      ethnicity: ethnicity?.ethnicity_id,
      nationality: nationality?.country_code,
      maritalStatus: maritalStatus?.marital_status_id,
      education: education?.education_id,
      occupationTitle: occupation?.occupation_id,
      income: income?.income_id,
      bodyType: bodyType?.body_type_id,
      country: country?.country_code,
      region: region?.state_id,
      bodyArt: bodyArts?.body_art_id,
      car: car?.car_id,
      drinking: drink?.drink_id,
      eyes: eyes?.eyes_id,
      hair: hair?.hair_id,
      haveChildren: haveChildren?.have_children_id,
      wantChildren: wantChildren?.want_children_id,
      livingStatus: livingStatus?.living_status_id,
      smoking: smoke?.smoke_id,
      workout: workout?.workout_id,
      disability: disability?.disability_id,
      religion: religion?.religion_id,
      employmentStatus: employmentStatus?.employment_status_id,
    };
    console.log(finalFormData);
    await profileContentQuery.saveOnboarding(
      finalFormData as ProfileContent,
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
    console.log(!isValidating, pass, isDirty, goNext);
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
      <StepView step={step} />
      <hr className="h-4 w-full sm:w-1/2 mt-8" />
      <div
        className={cn(
          "w-full px-8 sm:w-1/2 flex justify-end",
          step !== 1 && "justify-between"
        )}
      >
        {step !== 1 && (
          <Button
            disabled={isSaving || isLoading}
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
            disabled={isLoading}
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
            {t("onboarding.finish")}
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
