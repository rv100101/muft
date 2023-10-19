import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import { useQuery } from "@tanstack/react-query";
import {
  Cake,
  CalendarClock,
  Cross,
  Flag,
  Ghost,
  Heart,
  Languages,
  MoreHorizontal,
  PlusCircle,
  Users,
} from "lucide-react";

// fetch select options
const fetchNationalities = async () => {
  const response = await axiosQuery.post(
    "https://muffinfunction.azurewebsites.net/api/Nationalities"
  );

  return response.data;
};

const fetchMaritalStatus = async () => {
  const response = await axiosQuery.post(
    "https://muffinfunction.azurewebsites.net/api/MaritalStatus"
  );
  return response.data;
};

const fetchLanguages = async () => {
  const response = await axiosQuery.post(
    "https://muffinfunction.azurewebsites.net/api/Languages",
    { member: 999 }
  );
  return response.data;
};

const fetchEthnicity = async () => {
  const response = await axiosQuery.post(
    "https://muffinfunction.azurewebsites.net/api/Ethnicity"
  );
  return response.data;
};

type Nationality = {
  authorized: boolean;
  ip_address: string;
  country_code: string;
  nationality: string;
};

type Ethnicity = {
  authorized: boolean;
  ip_address: string;
  ethnicity_id: number;
  ethnicity_name: string;
};

type MaritalStatus = {
  authorized: boolean;
  ip_address: string;
  marital_status_id: number;
  marital_status_name: string;
};

type Languages = {
  authorized: boolean;
  ip_address: string;
  language_code: string;
  language_name: string;
};

const BasicInformationForm = () => {
  const {
    formData,
    setFormData,
    globalEditMode: editMode,
  } = useBasicInfoStore();
  const { user } = useUserStore();

  // retrieve user data
  const fetchInitialData = async () => {
    try {
      const response1 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetBasicInfo",
        { member: user?.member_id }
      );
      const response2 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetBackground",
        { member: user?.member_id }
      );
      const response3 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetMaritalStatus",
        { member: user?.member_id }
      );
      const response = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetLanguages",
        { member: user?.member_id }
      );
      const { gender, nationality, date_of_birth, age } = response1.data;
      const { religion_name, ethnicity_name } = response2.data;
      const { marital_status_name } = response3.data;
      const { language_name } = response.data[0];

      setFormData({
        ...formData,
        gender: gender,
        nationality: nationality,
        birthInfo: date_of_birth,
        age: age,
        religion: religion_name,
        ethnicity: ethnicity_name,
        maritalStatus: marital_status_name,
        language: language_name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: nationalities } = useQuery(
    ["nationalities"],
    fetchNationalities
  );

  const { data: maritalStatus } = useQuery(
    ["maritalStatus"],
    fetchMaritalStatus
  );

  const { data: languages } = useQuery(["languages"], fetchLanguages);
  const { data: ethnicities } = useQuery(["ethnicity"], fetchEthnicity);
  const { isLoading: initialDataLoading } = useQuery(
    ["initialData"],
    fetchInitialData
  );

  if (initialDataLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={formData.gender}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="gender"
            >
              <option value="" disabled>
                Select gender
              </option>

              <option value="M">Male</option>
              <option value="X">Female</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Ghost color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">
              {formData.gender == "M" ? "Male" : "Female"}
            </p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={formData.nationality}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] w-1/2"
              name="nationality"
            >
              <option value="" disabled>
                Select Nationality
              </option>
              {nationalities.map((data: Nationality, index: number) => {
                const { nationality } = data;
                return (
                  <option value={nationality} key={index}>
                    {nationality}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Flag
              color={
                formData.nationality === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                formData.nationality === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {formData.nationality}
            </p>
          </div>
        )}
        {formData.nationality !== "Add Relationship Status" && !editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="date"
              value={formData.birthInfo}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="birthInfo"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cake
              color={
                formData.birthInfo === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                formData.birthInfo === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {formData.birthInfo}
            </p>
          </div>
        )}
        {formData.birthInfo !== "Add Relationship Status" && !editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.age}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="age"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <CalendarClock
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {parseInt(formData.age) > 1
                ? `${formData.age} years old`
                : `${formData.age} year old`}
            </p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.religion}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="religion"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cross color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.religion}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />

            <select
              // type="text"
              value={formData.ethnicity}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="ethnicity"
            >
              <option value="" disabled>
                Select Ethnicity
              </option>
              {ethnicities.map((data: Ethnicity) => {
                const { ethnicity_name, ethnicity_id } = data;
                return (
                  <option value={ethnicity_id} key={ethnicity_id}>
                    {ethnicity_name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Users color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.ethnicity}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={formData.maritalStatus}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="maritalStatus"
            >
              <option value="" disabled>
                Select marital Status
              </option>
              {maritalStatus.map((data: MaritalStatus) => {
                const { marital_status_name, marital_status_id } = data;
                return (
                  <option value={marital_status_id} key={marital_status_id}>
                    {marital_status_name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.maritalStatus}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-1/2">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={formData.language}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] w-1/2"
              name="language"
            >
              <option value="" disabled>
                Select Language
              </option>
              {languages.map((data: Languages, index: number) => {
                const { language_name } = data;
                return (
                  <option value={language_name} key={index}>
                    {language_name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Languages
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.language}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      {/*  */}
    </div>
  );
};

export default BasicInformationForm;
