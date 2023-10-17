import { Pen, Save, XCircle } from "lucide-react";
import profileImg from "../../assets/profile/sample-profile.png";
import { useState } from "react";
import { useOverviewStore } from "@/zustand/profile/about/useOverviewStore";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";

const ProfileHeader = () => {
  const { handleEditProfileToggle: toggleOverviewFields } = useOverviewStore();
  const { handleEditProfileToggle: toggleBasicInfoFields } =
    useBasicInfoStore();
  const { handleEditProfileToggle: toggleWorkEducationFields } =
    useWorkEducationStore();

  const { handleEditProfileToggle: toggleDetailsFields } = useDetailsStore();
  const { handleEditProfileToggle: toggleLocationFields } = useLocationStore();
  const [showSave, setShowSave] = useState(false);
  const handleEditToggle = () => {
    setShowSave((prev) => !prev);
    toggleOverviewFields();
    toggleBasicInfoFields();
    toggleWorkEducationFields();
    toggleDetailsFields();
    toggleLocationFields();
  };
  return (
    <div className="flex flex-row w-full justify-between items-start p-5 border-b">
      <div className="flex flex-row space-x-5 ">
        <div className="rounded-full h-28 w-28 border-4 border-[#ff5c9d]">
          <img
            className="rounded-full object-cover h-full w-full"
            src={profileImg}
            // width={100}
            // height={50}
            alt="profile photo"
          />
        </div>
        {/* another div here */}
        <div className="flex flex-col">
          <p className="font-semibold text-[#171717] text-lg">Shanaz, 32</p>
          <p className="text-[#727272] text-sm">@us23452</p>
          {/* badges */}
          <div className="flex flex-row w-full">
            <div className="pt-5 flex flex-row space-x-2">
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                5'7"
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Libra
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                UAE
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Single
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Model
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* options here */}
      <div className="flex flex-row justify-center w-1/3 space-x-4">
        {showSave ? (
          <div
            className="flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 bg-[#E8ECEF] py-2"
            onClick={() => handleEditToggle()}
          >
            <XCircle
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
          </div>
        ) : (
          <div
            className="flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 bg-[#E8ECEF] py-2"
            onClick={() => handleEditToggle()}
          >
            <Pen color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">Edit</p>
          </div>
        )}

        {showSave && (
          <div
            className="flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 bg-green-400 py-2"
            onClick={() => setShowSave(true)}
          >
            <Save color="white" size={20} className="hover:cursor-pointer" />
            <p className="text-white">Save</p>
          </div>
        )}

        {/* <Copy color="#727272" size={20} className="mt-2 hover:cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
