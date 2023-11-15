import { useState } from "react";
import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import DetailsForm from "./forms/detailsForm";
import LocationForm from "./forms/locationForm";
import { Briefcase, Contact, Globe, User2 } from "lucide-react";
import ContentLoadingSkeleton from "./contentLoadingSkeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";

const AboutAccordionContent = () => {

  const [activeTabs, setActiveTabs] = useState([
    false,
    true,
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
          className={activeTabs[1]
            ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
            : "text-[#727272] py-2 px-2 my-2"}
          onClick={() => toggleTab(1)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Basic Information
          </p>
          <User2
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={activeTabs[2]
            ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
            : "text-[#727272] py-2 px-2 my-2"}
          onClick={() => toggleTab(2)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Work and Education
          </p>
          <Briefcase
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={activeTabs[3]
            ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
            : "text-[#727272] py-2 px-2 my-2"}
          onClick={() => toggleTab(3)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Details about you
          </p>
          <Contact
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={activeTabs[4]
            ? "rounded-md bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B]"
            : "text-[#727272] py-2 px-2 my-2"}
          onClick={() => toggleTab(4)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Location
          </p>
          <Globe
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
      </div>
      <div className="flex flex-col lg:w-full">
        {/* basic info */}
        {activeTabs[1] && <BasicInformationForm />}

        {/* Work and Education */}
        {activeTabs[2] && <WorkEducationForm />}

        {/* Details */}
        {activeTabs[3] && <DetailsForm />}

        {/* Location */}
        {activeTabs[4] && <LocationForm />}
      </div>
      {/* content - Form*/}
      {/* overview */}
      {/* {activeTabs[0] && <OverviewForm />} */}
    </div>
  );
};

export default AboutAccordionContent;
