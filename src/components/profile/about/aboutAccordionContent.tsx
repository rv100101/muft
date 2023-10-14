import { useState } from "react";
import OverviewForm from "./overview/overviewForm";
import { useOverviewStore } from "@/zustand/profile/about/useOverviewStore";

const AboutAccordionContent = () => {
  const { handleInputChange, inputs, editModes, setEditMode } =
    useOverviewStore();
  const [activeTabs, setActiveTabs] = useState([
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
      {activeTabs[0] && (
        <OverviewForm
          inputs={inputs}
          editModes={editModes}
          setEditMode={setEditMode}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default AboutAccordionContent;
