import { Skeleton } from "@/components/ui/skeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Briefcase,
  DollarSign,
  GraduationCap,
  MoreHorizontal,
  PlusCircle,
  User,
} from "lucide-react";
import { useState } from "react";

type Education = {
  authorized: boolean;
  ip_address: string;
  education_id: number;
  education_name: string;
};

type Occupation = {
  authorized: boolean;
  ip_address: string;
  occupation_id: number;
  occupation_title: string;
};

type Income = {
  authorized: boolean;
  ip_address: string;
  income_id: number;
  income_range: string;
};

const WorkEducationForm = () => {

  const isLoading = profileAboutContentStore(state => state.isLoading);
  const data = profileAboutContentStore(state => state.data);

  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
  };
  
  const [editMode] = useState(false)

  if (isLoading) {
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
      <div className="flex flex-row justify-between w-full px-5">
        {editMode == true
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <select
                // type="text"
                value={data!.education}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="education"
              >
                <option value="" disabled>
                  Select Education Attainment
                </option>
                {educations &&
                  educations.map((data: Education) => {
                    const { education_name: education, education_id } = data;
                    return (
                      <option value={education_id} key={education_id}>
                        {education}
                      </option>
                    );
                  })}
              </select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <GraduationCap
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.education ? data!.education : "Add education info"}
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
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
              <PlusCircle
                color="#FF599B"
                size={20}
                className="hover:cursor-pointer"
              />
              <input
                type="text"
                value={data!.employmentStatus}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="employmentStatus"
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Briefcase
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.employmentStatus
                  ? data!.employmentStatus
                  : "Add Employment Status"}
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
                value={data!.occupationTitle}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="occupationTitle"
              >
                <option value="" disabled>
                  Select Occupation
                </option>
                {occupations &&
                  occupations.map((data: Occupation) => {
                    const { occupation_title: occupation, occupation_id } =
                      data;
                    return (
                      <option value={occupation_id} key={occupation_id}>
                        {occupation}
                      </option>
                    );
                  })}
              </select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <User
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.occupationTitle
                  ? data!.occupationTitle
                  : "Add Job Title"}
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
                value={data!.income}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
                name="income"
              >
                <option value="" disabled>
                  Select Income Range
                </option>
                {incomes &&
                  incomes.map((data: Income) => {
                    const { income_range: income, income_id } = data;
                    return (
                      <option value={income_id} key={income_id}>
                        {income}
                      </option>
                    );
                  })}
              </select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <DollarSign
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.income ? data!.income : "Add income range"}
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

export default WorkEducationForm;
