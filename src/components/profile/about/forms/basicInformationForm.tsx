import { Skeleton } from "@/components/ui/skeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Cake,
  CalendarClock,
  Flag,
  Ghost,
  Heart,
  Languages,
  MoreHorizontal,
  PlusCircle,
  Users,
} from "lucide-react";
import { useState } from "react";

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
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
  };
  const [editMode] = useState(false);
  const isLoading = profileAboutContentStore(state => state.isLoading);
  const data = profileAboutContentStore(state => state.data);
  console.log(isLoading)
  if (
    isLoading
  ) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[400px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-5 py-5">
      <div className="flex text-sm flex-row justify-between w-full px-5">
        {editMode == true
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <select
                value={data!.gender}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="gender"
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="M">Male</option>
                <option value="X">Female</option>
              </select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Ghost
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.gender == "M" ? "Male" : "Female"}
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
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <select
                // type="text"
                value={data!.nationality}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="nationality"
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                {nationalities.map((data: Nationality, index: number) => {
                  const { nationality, country_code } = data;
                  return (
                    <option value={country_code} key={index}>
                      {nationality}
                    </option>
                  );
                })}
              </select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Flag
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.nationality
                  ? data!.nationality
                  : "Add Nationality"}
              </p>
            </div>
          )}
        {data!.nationality !== "Add Relationship Status" && !editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <input
                type="date"
                value={data!.birthInfo}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="birthInfo"
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Cake
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.birthInfo ? data!.birthInfo : "Add Birthday"}
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

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5 hidden">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <input
                type="text"
                value={data!.age}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="age"
                readOnly
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <CalendarClock
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {parseInt(data!.age) > 1
                  ? `${data!.age} years old`
                  : `${data!.age} year old`}
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

      {
        /* <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={data!.religion}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="religion"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cross color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{data!.religion}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div> */
      }

      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />

              <select
                // type="text"
                value={data!.ethnicity}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Users
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.ethnicity ? data!.ethnicity : "Add Ethnicity"}
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
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <select
                // type="text"
                value={data!.maritalStatus}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Heart
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.maritalStatus
                  ? data!.maritalStatus
                  : "Add Marital Status"}
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
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <select
                // type="text"
                value={data!.language}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Languages
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.language ? data!.language : "Add Language"}
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

      {/*  */}
    </div>
  );
};

export default BasicInformationForm;
