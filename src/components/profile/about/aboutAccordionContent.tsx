import { useState } from "react";
import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import DetailsForm from "./forms/detailsForm";
import LocationForm from "./forms/locationForm";
import {
  AlertCircle,
  Briefcase,
  Contact,
  Globe,
  Package,
  User2,
} from "lucide-react";
import ContentLoadingSkeleton from "./contentLoadingSkeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import AdditionalInformatinForm from "./forms/additionalInformationForm";
import useAboutErrorsStrore from "@/zustand/profile/about/useAboutErrorsStore";
import { cn } from "@/lib/utils";

const AboutAccordionContent = () => {
  const {
    basicInfoHasErrors,
    detailsInfoHasErrors,
    locationHasErrors,
    workAndEducationHasErrors,
    additionalInfoHasErrors,
  } = useAboutErrorsStrore();

  const [activeTabs, setActiveTabs] = useState([
    false,
    true,
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
  if (isLoading) {
    return <ContentLoadingSkeleton />;
  }
  return (
    <div className="flex lg:flex-row flex-col mb-5">
      <div className="flex flex-row justify-around text-sm lg:justify-start lg:w-1/3 w-full lg:block">
        <div
          className={
            activeTabs[1]
              ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
              : "text-[#727272] py-2 px-2 my-2"
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
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            activeTabs[2]
              ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(2)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              workAndEducationHasErrors && "text-red-500"
            )}
          >
            Work and Education{" "}
            {workAndEducationHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Briefcase
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            activeTabs[3]
              ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(3)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              detailsInfoHasErrors && "text-red-500"
            )}
          >
            Details about you{" "}
            {detailsInfoHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
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
            activeTabs[4]
              ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(4)}
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
            activeTabs[5]
              ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(5)}
        >
          <p
            className={cn(
              "text-md hover:cursor-pointer select-none lg:block hidden",
              additionalInfoHasErrors && "text-red-500"
            )}
          >
            Additional Information{" "}
            {additionalInfoHasErrors && (
              <span>
                <AlertCircle className="h-4 inline-flex text-red-500" />
              </span>
            )}
          </p>
          <Package
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
      </div>
      <div className="flex h-max flex-col lg:w-full lg:mt-0 mt-5">
        {/* basic info */}
        {activeTabs[1] && <BasicInformationForm />}

        {/* Work and Education */}
        {activeTabs[2] && <WorkEducationForm />}

        {/* Details */}
        {activeTabs[3] && <DetailsForm />}

        {/* Location */}
        {activeTabs[4] && <LocationForm />}

        {/* Addition Information */}
        {activeTabs[5] && <AdditionalInformatinForm />}
      </div>
    </div>
  );
};

export default AboutAccordionContent;
