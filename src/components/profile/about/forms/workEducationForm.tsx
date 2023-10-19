import axiosQuery from "@/queries/axios";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Heart,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

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

// type EmploymentStatus = {
//   authorized: boolean;
//   ip_address: string;
//   employment_status_id: number;
//   employment_status_name: string;
// };

const WorkEducationForm = () => {
  const {
    formData,
    setFormData,
    globalEditMode: editMode,
  } = useWorkEducationStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // select options
  const fetchEducations = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Education"
    );

    return response.data;
  };

  const fetchOccupations = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Occupation"
    );

    return response.data;
  };

  // const fetchEmploymentStatus = async () => {
  //   const response = await axiosQuery.post(
  //     "https://muffinfunction.azurewebsites.net/api/EmploymentStatus"
  //   );

  //   return response.data;
  // };

  const fetchIncomes = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Income"
    );

    return response.data;
  };

  const { data: educations } = useQuery(["educations"], fetchEducations);
  const { data: occupations } = useQuery(["occupations"], fetchOccupations);
  const { data: incomes } = useQuery(["incomes"], fetchIncomes);
  // const { data: employmentStatus } = useQuery(
  //   ["employmentStatus"],
  //   fetchEmploymentStatus
  // );

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
              value={formData.education}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="education"
            >
              <option value="" disabled>
                Select Education Attainment
              </option>
              {educations.map((data: Education) => {
                const { education_name: education, education_id } = data;
                return (
                  <option value={education} key={education_id}>
                    {education}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <GraduationCap
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.education}</p>
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
            {/* <select
              value={formData.employmentStatus}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="employmentStatus"
            >
              <option value="" disabled>
                Select Employment Status
              </option>
              {employmentStatus.map((data: EmploymentStatus) => {
                const {
                  employment_status_name: employmentStatus,
                  employment_status_id,
                } = data;
                return (
                  <option value={employmentStatus} key={employment_status_id}>
                    {employmentStatus}
                  </option>
                );
              })}
            </select> */}
            <input
              type="text"
              value={formData.employmentStatus}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="employmentStatus"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.employmentStatus}</p>
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
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              value={formData.occupationTitle}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="occupationTitle"
            >
              <option value="" disabled>
                Select Occupation
              </option>
              {occupations.map((data: Occupation) => {
                const { occupation_title: occupation, occupation_id } = data;
                return (
                  <option value={occupation} key={occupation_id}>
                    {occupation}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.occupationTitle}</p>
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
              value={formData.income}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="income"
            >
              <option value="" disabled>
                Select Income Range
              </option>
              {incomes.map((data: Income) => {
                const { income_range: income, income_id } = data;
                return (
                  <option value={income} key={income_id}>
                    {income}
                  </option>
                );
              })}
            </select>
            {/* <input
              type="text"
              value={formData.income}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="income"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <DollarSign
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.income}</p>
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
