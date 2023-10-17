import { useState } from "react";
import OverviewForm from "./forms/overviewForm";
import { useOverviewStore } from "@/zustand/profile/about/useOverviewStore";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import DetailsForm from "./forms/detailsForm";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import LocationForm from "./forms/locationForm";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";

const AboutAccordionContent = () => {
  const { overviewHandleInputChange, overviewInputs, overviewEditModes } =
    useOverviewStore();

  const { basicInfoEditModes, basicInfoInputs, basicInfoHandleInputChange } =
    useBasicInfoStore();
  const {
    workEducationEditModes,
    workEducationHandleInputChange,
    workEducationInputs,
  } = useWorkEducationStore();

  const { detailsInputs, detailsEditModes, detailsHandleInputChange } =
    useDetailsStore();

  const { locationInputs, locationEditModes, locationHandleInputChange } =
    useLocationStore();

  const [activeTabs, setActiveTabs] = useState([
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

  return (
    <div className="flex flex-row mb-5">
      {/* sidebar */}
      <div className="flex flex-col w-1/3">
        <div
          className={
            activeTabs[0]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(0)}
        >
          <p className="text-md hover:cursor-pointer select-none">Overview</p>
        </div>
        <div
          className={
            activeTabs[1]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(1)}
        >
          <p className="text-md hover:cursor-pointer  select-none">
            Basic Information
          </p>
        </div>
        <div
          className={
            activeTabs[2]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(2)}
        >
          <p className="text-md hover:cursor-pointer select-none">
            Work and Education
          </p>
        </div>
        <div
          className={
            activeTabs[3]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(3)}
        >
          <p className="text-md hover:cursor-pointer select-none">
            Details about you
          </p>
        </div>
        <div
          className={
            activeTabs[4]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(4)}
        >
          <p className="text-md hover:cursor-pointer select-none">Location</p>
        </div>
      </div>
      {/* content - Form*/}
      {/* overview */}
      {activeTabs[0] && (
        <OverviewForm
          overviewInputs={overviewInputs}
          overviewEditModes={overviewEditModes}
          overviewHandleInputChange={overviewHandleInputChange}
        />
      )}

      {/* basic info */}
      {activeTabs[1] && (
        <BasicInformationForm
          basicInfoInputs={basicInfoInputs}
          basicInfoEditModes={basicInfoEditModes}
          basicInfoHandleInputChange={basicInfoHandleInputChange}
        />
      )}

      {/* Work and Education */}
      {activeTabs[2] && (
        <WorkEducationForm
          workEducationInputs={workEducationInputs}
          workEducationEditModes={workEducationEditModes}
          workEducationHandleInputChange={workEducationHandleInputChange}
        />
      )}

      {/* Details */}
      {activeTabs[3] && (
        <DetailsForm
          detailsInputs={detailsInputs}
          detailsEditModes={detailsEditModes}
          detailsHandleInputChange={detailsHandleInputChange}
        />
      )}

      {/* Location */}
      {activeTabs[4] && (
        <LocationForm
          locationInputs={locationInputs}
          locationEditModes={locationEditModes}
          locationHandleInputChange={locationHandleInputChange}
        />
      )}
    </div>
  );
};

export default AboutAccordionContent;
