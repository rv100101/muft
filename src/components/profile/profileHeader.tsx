import { Pen, Save, XCircle } from "lucide-react";
import profileImg from "../../assets/profile/sample-profile.png";
import { useState } from "react";
import { useOverviewStore } from "@/zustand/profile/about/useOverviewStore";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";
import { useUserStore } from "@/zustand/auth/user";
import axiosQuery from "@/queries/axios";

const ProfileHeader = () => {
  const { user } = useUserStore();
  const { member_id } = user;
  const { handleEditProfileToggle: toggleOverviewFields } = useOverviewStore();
  const { setEditMode: toggleBasicInfoFields, formData: basicInfoFormData } =
    useBasicInfoStore();
  const {
    setEditMode: toggleWorkEducationFields,
    formData: WorkEduInfoFormData,
  } = useWorkEducationStore();

  const { setEditMode: toggleDetailsFields, formData: DetailsFormData } =
    useDetailsStore();
  const { setEditMode: toggleLocationFields } = useLocationStore();
  const [showSave, setShowSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleEditToggle = () => {
    setShowSave((prev) => !prev);
    toggleOverviewFields();
    toggleBasicInfoFields();
    toggleWorkEducationFields();
    toggleDetailsFields();
    toggleLocationFields();
  };

  const BasicInfoSubmit = async () => {
    // const { toast } = useToast();
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveGender",
          { gender: basicInfoFormData.gender, member: member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveNationality",
          { nationality: basicInfoFormData.nationality, member: member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveBirthday",
          { birthday: basicInfoFormData.birthInfo, member: member_id }
        ),

        // axiosQuery.post(
        //   "https://muffinfunction.azurewebsites.net/api/SaveReligion",
        //   { religion: basicInfoFormData.religion, member: member_id }
        // ),

        // axiosQuery.post(
        //   "https://muffinfunction.azurewebsites.net/api/SaveEthnicity",
        //   { ethnicity: basicInfoFormData.ethnicity, member: member_id }
        // ),

        // axiosQuery.post(
        //   "https://muffinfunction.azurewebsites.net/api/SaveMaritalStatus",
        //   { marital_status: basicInfoFormData.maritalStatus, member: member_id }
        // ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveLanguage",
          { language: basicInfoFormData.language, member: member_id }
        ),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const WorkEducationSubmit = async () => {
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveEducation",
          { education: WorkEduInfoFormData.education, member: member_id }
        ),
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveOccupation",
          { occupation: WorkEduInfoFormData.occupationTitle, member: member_id }
        ),
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveIncome",
          { income: WorkEduInfoFormData.income, member: member_id }
        ),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const DetailsSubmit = async () => {
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveHeight",
          { height: DetailsFormData.height, member: member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveWeight",
          { weight: DetailsFormData.weight, member: member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveBodyType",
          { body_type: DetailsFormData.bodyType, member: member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveFavoriteFood",
          { favorite_food: DetailsFormData.favoriteFood, member: member_id }
        ),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSave = async () => {
    try {
      setIsSaving(true);
      // basic info
      await BasicInfoSubmit();
      // work and education
      await WorkEducationSubmit();
      // Details
      await DetailsSubmit();

      setIsSaving(false);
      toggleBasicInfoFields();
      setShowSave(false);
    } catch (err) {
      console.log(err);
    }

    // if (user) submitForm(user ? user.member_id : 0);
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
            className={`flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 ${
              isSaving ? "bg-green-600" : "bg-green-400"
            } py-2`}
            onClick={() => onSave()}
          >
            <Save color="white" size={20} className="hover:cursor-pointer" />
            <p className="text-white">{isSaving ? "Saving..." : "Save"}</p>
          </div>
        )}

        {/* <Copy color="#727272" size={20} className="mt-2 hover:cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
