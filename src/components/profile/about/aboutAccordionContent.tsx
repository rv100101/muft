import { useState } from "react";
import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import DetailsForm from "./forms/detailsForm";
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
import AdditionalInformatinForm from "./forms/additionalInformationForm";
import useAboutErrorsStrore from "@/zustand/profile/about/useAboutErrorsStore";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

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
  const [activeTabs, setActiveTabs] = useState([
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleTab = (index: number) => {
    const newActiveTabs = activeTabs.map((_, i) => i === index);
    setActiveTabs(newActiveTabs);
  };
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  if (location.startsWith("/profile") && !profileData && isLoading) {
    return <ContentLoadingSkeleton />;
  }

  if (location.startsWith("/members") && isLoading) {
    return <ContentLoadingSkeleton />;
  }

  return (
    <div className="flex lg:flex-row flex-col mb-5">
      <div className="grid grid-cols-6 grid-rows-2 sm:flex sm:flex-row justify-around text-sm lg:justify-start lg:w-1/3 w-full lg:block">
        <div
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[1]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(1)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
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
          <User2
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[2]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(2)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[3]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(3)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[4]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(4)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[5]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(5)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[6]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(6)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[7]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(7)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[8]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(8)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[9]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(9)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[10]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(10)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[11]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(11)}
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
          className={
            cn('flex justify-center items-center sm:block',
              activeTabs[12]
                ? "rounded-md bg-[#FFDEEB]  py-2 px-2 my-2 text-[#FF599B]"
                : "text-[#727272] py-2 px-2 my-2"
            )
          }
          onClick={() => toggleTab(12)}
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
      <div className="flex h-max flex-col lg:w-full lg:mt-0 mt-5">
        {/* basic info */}
        {activeTabs[1] && <BasicInformationForm />}

        {/* Location */}
        {activeTabs[2] && <LocationForm />}

        {/* Work and Education */}
        {activeTabs[2] && <WorkEducationForm />}

        {/* Details */}
        {activeTabs[3] && <DetailsForm />}

        {/* Addition Information */}
        {activeTabs[5] && <AdditionalInformatinForm />}
      </div>
    </div>
  );
};

export default AboutAccordionContent;
