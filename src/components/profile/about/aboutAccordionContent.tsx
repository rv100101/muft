import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import LocationForm from "./forms/locationForm";
import {
  AlertCircle,
  BookHeart,
  BookOpen,
  Briefcase,
  Contact,
  Globe,
  HeartPulse,
  Languages,
  PawPrint,
  Ribbon,
  Smile,
  Sprout,
  User2,
  Utensils,
} from "lucide-react";
import ContentLoadingSkeleton from "./contentLoadingSkeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import useAboutErrorsStrore from "@/zustand/profile/about/useAboutErrorsStore";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import LanguagesForm from "./forms/languagesForm";
import BackgroundForm from "./forms/backgroundForm";
import AppearanceForm from "./forms/appearanceForm";
import LifestyleForm from "./forms/lifestyleForm";
import PetsForm from "./forms/petsForm";
import FavoriteFoodForm from "./forms/favoriteFoodForm";
import HealthForm from "./forms/healthForm";
import MaritalStatusForm from "./forms/maritalStatusForm";
import InterestsForm from "./forms/interestsForm";
import { aboutAccordionTabView } from "@/zustand/profile/about/aboutAccordionTabView";
import { useUpdateEffect } from "usehooks-ts";
import mapErrorsToSections from "@/lib/getFormErrorsIndex";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const AboutAccordionContent = () => {
  const [location] = useLocation();
  const {
    basicInfoHasErrors,
    detailsInfoHasErrors,
    locationHasErrors,
    workAndEducationHasErrors,
    additionalInfoHasErrors,
  } = useAboutErrorsStrore();
  const { profileData } = profileAboutContentStore();
  const { tabs, changeTab } = aboutAccordionTabView();
  const [errorTabs, setErrorTabs] = useState<number[]>([]);
  const {
    formState: { errors },
  } = useFormContext();

  useUpdateEffect(() => {
    const mappedErrors = mapErrorsToSections(errors);
    if (mappedErrors.length !== 0) {
      setErrorTabs(mappedErrors);
    }
  }, [mapErrorsToSections, errors]);

  useUpdateEffect(() => {
    changeTab(errorTabs[0] + 1);
  }, [errorTabs]);

  const isLoading = profileAboutContentStore((state) => state.isLoading);
  if (location.startsWith("/profile") && !profileData && isLoading) {
    return <ContentLoadingSkeleton />;
  }

  if (location.startsWith("/members") && isLoading) {
    return <ContentLoadingSkeleton />;
  }

  return (
    <div className="flex lg:flex-row h-full flex-col mb-5">
      <div className="grid grid-cols-6 h-full grid-rows-2 sm:flex sm:flex-row justify-around text-sm lg:justify-start lg:w-1/3 w-full lg:block">
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[1]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(1)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden ",
              basicInfoHasErrors && "text-red-500"
            )}
          >
            Basic Information{" "}
            {basicInfoHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <User2 size={20} className="hover:cursor-pointer lg:hidden" />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[2]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(2)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Location{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Globe
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[3]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(3)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Background{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <BookOpen
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[4]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(4)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Languages{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Languages
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[5]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(5)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Appearance{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Smile
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[6]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(6)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Lifestyle{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Sprout
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[7]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(7)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Pets{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <PawPrint
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[8]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(8)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Favorite Food{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Utensils
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[9]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(9)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              locationHasErrors && "text-red-500"
            )}
          >
            Health{" "}
            {locationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <HeartPulse
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[10]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(10)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              workAndEducationHasErrors && "text-red-500"
            )}
          >
            Marital Status{" "}
            {workAndEducationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Ribbon
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[11]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(11)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              detailsInfoHasErrors && "text-red-500"
            )}
          >
            Employment{" "}
            {detailsInfoHasErrors && (
              <span>
                <Briefcase className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Contact
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center sm:block",
            tabs[12]
              ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B] dark:bg-[#3b0117]"
              : "text-[#727272] py-2 px-2 my-2"
          )}
          onClick={() => changeTab(12)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              additionalInfoHasErrors && "text-red-500"
            )}
          >
            Interests{" "}
            {additionalInfoHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <BookHeart
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
      </div>
      <div className="flex h-full sm:h-max flex-col lg:w-full lg:mt-0 mt-5">
        {/* basic info */}
        {tabs[1] && <BasicInformationForm />}

        {/* Location */}
        {tabs[2] && <LocationForm />}

        {/* Background */}
        {tabs[3] && <BackgroundForm />}

        {/* Details */}
        {tabs[4] && <LanguagesForm />}

        {/* Appearance */}
        {tabs[5] && <AppearanceForm />}

        {/* Lifestyle */}
        {tabs[6] && <LifestyleForm />}

        {/* Pets */}
        {tabs[7] && <PetsForm />}

        {/* Favorite Foods */}
        {tabs[8] && <FavoriteFoodForm />}

        {/* Health */}
        {tabs[9] && <HealthForm />}

        {/* Marital status */}
        {tabs[10] && <MaritalStatusForm />}

        {/* Marital status */}
        {tabs[11] && <WorkEducationForm />}

        {/* Marital status */}
        {tabs[12] && <InterestsForm />}
      </div>
    </div>
  );
};

export default AboutAccordionContent;
