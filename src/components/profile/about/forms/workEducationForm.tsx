// import { Skeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axiosQuery from "@/queries/axios";
// import { useUserStore } from "@/zustand/auth/user";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  DollarSign,
  GraduationCap,
  MoreHorizontal,
  PlusCircle,
  User,
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
  // const { user } = useUserStore();

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

  // const fetchInitialData = async () => {
  //   try {
  //     const response1 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetBackground",
  //       { member: user?.member_id }
  //     );

  //     const response2 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetEmployment",
  //       { member: user?.member_id }
  //     );

  //     const { education_name } = response1.data;
  //     const { employment_status_name, occupation_title, income_range } =
  //       response2.data;

  //     setFormData({
  //       ...formData,
  //       education: education_name,
  //       employmentStatus: employment_status_name,
  //       occupationTitle: occupation_title,
  //       income: income_range,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { data: educations } = useQuery(["educations"], fetchEducations);
  const { data: occupations, isLoading: occupationsLoading } = useQuery(
    ["occupations"],
    fetchOccupations
  );
  const { data: incomes, isLoading: incomeLoading } = useQuery(
    ["incomes"],
    fetchIncomes
  );
  // const { isLoading: initialDataLoading } = useQuery(
  //   ["initialData"],
  //   fetchInitialData
  // );

  if (incomeLoading || occupationsLoading) {
    // return <>Loading...</>;
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
  // const { data: employmentStatus } = useQuery(
  //   ["employmentStatus"],
  //   fetchEmploymentStatus
  // );
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
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
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <GraduationCap
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {formData.education ? formData.education : "Add education info"}
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            {/* <select
              value={formData.employmentStatus}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
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
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
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
            <p className="text-[#727272]">
              {formData.employmentStatus
                ? formData.employmentStatus
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
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              value={formData.occupationTitle}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
              name="occupationTitle"
            >
              <option value="" disabled>
                Select Occupation
              </option>
              {occupations &&
                occupations.map((data: Occupation) => {
                  const { occupation_title: occupation, occupation_id } = data;
                  return (
                    <option value={occupation_id} key={occupation_id}>
                      {occupation}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <User color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">
              {formData.occupationTitle
                ? formData.occupationTitle
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
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              value={formData.income}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
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
            {/* <input
              type="text"
              value={formData.income}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
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
            <p className="text-[#727272]">
              {formData.income ? formData.income : "Add income range"}
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
