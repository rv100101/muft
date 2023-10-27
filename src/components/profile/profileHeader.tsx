import { Camera, Pen, Save, XCircle } from "lucide-react";
import profileImg from "../../assets/profile/sample-user-profile.jpg";
import { useEffect, useRef, useState } from "react";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";
import { useUserStore } from "@/zustand/auth/user";
import axiosQuery from "@/queries/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { useProfileHeaderStore } from "@/zustand/profile/about/useProfileHeader";

const ProfileHeader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const user = useUserStore((state) => state.user);
  const {
    globalEditMode: editMode,
    setEditMode: toggleProfileFields,
    formData: profileFormData,
    setFormData,
  } = useProfileHeaderStore();
  const {
    setEditMode: toggleBasicInfoFields,
    formData: basicInfoFormData,
    globalEditMode: basicInfoEditMode,
  } = useBasicInfoStore();
  const {
    setEditMode: toggleWorkEducationFields,
    formData: WorkEduInfoFormData,
  } = useWorkEducationStore();

  const { setEditMode: toggleDetailsFields, formData: DetailsFormData } =
    useDetailsStore();

  const { setEditMode: toggleLocationFields, formData: locationFormData } =
    useLocationStore();

  const handleProfileUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Extracting base64 string without data:image/jpeg;base64,

      setSelectedFile(base64String);
      // setFormData({ ...profileFormData, profilePhoto: reader.result });
      // setFormData({ ...profileFormData, selectedProfilePhoto: base64String });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...profileFormData, selectedProfilePhoto: "" });
    }
  };

  const [showSave, setShowSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleEditToggle = () => {
    setShowSave((prev) => !prev);
    toggleBasicInfoFields();
    toggleWorkEducationFields();
    toggleDetailsFields();
    toggleLocationFields();
    toggleProfileFields();
  };

  // submit methods
  const BasicInfoSubmit = async () => {
    // const { toast } = useToast();
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveGender",
          { gender: basicInfoFormData.gender, member: user!.member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveNationality",
          {
            nationality: basicInfoFormData.nationality,
            member: user!.member_id,
          }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveBirthday",
          { birthday: basicInfoFormData.birthInfo, member: user!.member_id }
        ),

        // axiosQuery.post(
        //   "https://muffinfunction.azurewebsites.net/api/SaveReligion",
        //   { religion: basicInfoFormData.religion, member: user!.member_id }
        // ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveEthnicity",
          { ethnicity: basicInfoFormData.ethnicity, member: user!.member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveMaritalStatus",
          {
            marital_status: basicInfoFormData.maritalStatus,
            member: user!.member_id,
          }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveLanguage",
          { language: basicInfoFormData.language, member: user!.member_id }
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
          { education: WorkEduInfoFormData.education, member: user!.member_id }
        ),
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveOccupation",
          {
            occupation: WorkEduInfoFormData.occupationTitle,
            member: user!.member_id,
          }
        ),
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveIncome",
          { income: WorkEduInfoFormData.income, member: user!.member_id }
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
          { height: DetailsFormData.height, member: user!.member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveWeight",
          { weight: DetailsFormData.weight, member: user!.member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveBodyType",
          { body_type: DetailsFormData.bodyType, member: user!.member_id }
        ),

        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveFavoriteFood",
          {
            favorite_food: DetailsFormData.favoriteFood,
            member: user!.member_id,
          }
        ),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const locationSubmit = async () => {
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveCountry",
          { country: locationFormData.country, member: user!.member_id }
        ),

        // add profile image here
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const ProfileSubmit = async () => {
    try {
      await Promise.all([
        axiosQuery.post(
          "https://muffinfunction.azurewebsites.net/api/SaveNickname",
          { nickname: profileFormData.nickname, member: user!.member_id }
        ),

        // add profile image here
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  //

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...profileFormData, [name]: value });
  };

  const onSave = async () => {
    try {
      setIsSaving(true);
      // profile header
      await ProfileSubmit();

      // basic info
      if (basicInfoEditMode) {
        await BasicInfoSubmit();
      }
      // work and education
      await WorkEducationSubmit();
      // Details
      await DetailsSubmit();
      // Location
      await locationSubmit();

      setIsSaving(false);
      toggleBasicInfoFields();
      toggleWorkEducationFields();
      toggleDetailsFields();
      toggleLocationFields();
      toggleProfileFields();
      setShowSave(false);
    } catch (err) {
      console.log(err);
    }

    // if (user) submitForm(user ? user.user!.member_id : 0);
  };

  const fetchIntitialData = async () => {
    try {
      const response1 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetNickname",
        { member: user!.member_id }
      );

      // const response2 = await axiosQuery.post(
      //   "https://muffinfunction.azurewebsites.net/api/GetProfilePhoto",
      //   { member: user!.member_id }
      // );
      const { nickname } = response1.data[0];

      // const { gallery_uuid, member_uuid } = response2.data[0];
      // if(gallery_uuid && member_uuid){
      //   const path = getImagePath(gallery_uuid, null, member_uuid);

      // }
      setFormData({
        ...profileFormData,
        nickname: nickname,
        // profilePhotoURL: path,
      });
      return nickname;
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading } = useQuery(["nickname"], fetchIntitialData);

  useEffect(() => {
    toggleBasicInfoFields(false);
    toggleWorkEducationFields(false);
    toggleDetailsFields(false);
    toggleLocationFields(false);
    toggleLocationFields(false);
    toggleProfileFields(false);
    setShowSave(false);
  }, [
    toggleBasicInfoFields,
    toggleDetailsFields,
    toggleWorkEducationFields,
    toggleLocationFields,
    toggleProfileFields,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-start space-x-4 w-full ml-5 mt-10 bg-red">
        <div className="flex flex-row space-x-5">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex flex-col space-y-2 ">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-[375px]" />
            <Skeleton className="h-6 w-[350px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full justify-between items-start p-5 border-b select-none">
      <div className="flex flex-row space-x-5 ">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={editMode ? handleProfileUpload : () => {}}
          className="rounded-full h-28 w-28 border-4 border-[#ff5c9d] relative overflow-hidden"
        >
          <img
            className={`user-drag-none rounded-full object-cover h-full w-full transition-all duration-300 filter ${
              isHover && editMode ? "brightness-50 cursor-pointer" : ""
            }`}
            src={
              selectedFile
                ? `data:image/png;base64, ${selectedFile}`
                : profileImg
            }
            alt="no image selected"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="invisible w-0 h-0"
            ref={fileInputRef}
          />
          <Camera
            color="#e8ecef"
            size={50}
            className={`absolute hover:cursor-pointer ${
              !editMode ? "hidden" : ""
            } bottom-[30px] left-[30px] z-20`}
          />
        </div>

        {/* another div here */}
        <div className="flex flex-col">
          {editMode ? (
            <input
              type="string"
              value={profileFormData.nickname}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="placeholder:text-[#FF599B] placeholder:text-sm outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-2 px-3 lg:my-5 mt-5"
              name="nickname"
              placeholder="enter nickname"
            />
          ) : (
            <p className="font-semibold text-[#171717] text-lg">
              {profileFormData.nickname}
            </p>
          )}

          {!editMode && <p className="text-[#727272] text-sm">@us23452</p>}
          {/* mobile save and edit */}
          <div
            className={`flex flex-row justify-center w-1/3 space-x-4 lg:hidden pt-5 ml-5 ${
              showSave ? "ml-12" : ""
            }`}
          >
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
                <Pen
                  color="#727272"
                  size={20}
                  className="hover:cursor-pointer"
                />
                {/* <p className="text-[#727272]">Edit</p> */}
              </div>
            )}

            {showSave && (
              <div
                className={`flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 ${
                  isSaving ? "bg-green-600" : "bg-green-400"
                } py-2`}
                onClick={() => onSave()}
              >
                <Save
                  color="white"
                  size={20}
                  className="hover:cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* badges */}
          <div className="flex flex-row w-full hidden lg:block">
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
      {/* edit save desktop */}
      <div className="flex flex-row justify-center w-1/3 space-x-4 hidden lg:flex">
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
            className={`mr-3 flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 ${
              isSaving ? "bg-green-600" : "bg-green-400"
            } py-2`}
            onClick={() => onSave()}
          >
            {!isSaving && (
              <Save color="white" size={20} className="hover:cursor-pointer" />
            )}
            <div className="text-white">
              {isSaving ? (
                <div className="flex flex-row text-xs items-center space-x-5 text-green">
                  Saving
                  <div className="ml-5 w-5 h-5 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                </div>
              ) : (
                "Save"
              )}
            </div>
          </div>
        )}

        {/* <Copy color="#727272" size={20} className="mt-2 hover:cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
