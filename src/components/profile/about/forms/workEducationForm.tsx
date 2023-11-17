import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Briefcase, DollarSign, GraduationCap, User } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Education, Income, Occupation } from "@/types/profile";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WorkEducationForm = () => {
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
  };

  const { educations, incomes, occupations } = selectOptions();

  if (isLoading) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
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
              <Select // value={data?.gender}
               name="education">
                <SelectTrigger>
                  <SelectValue placeholder={educations[0]?.education_name} />
                </SelectTrigger>
                <SelectContent>
                  {educations &&
                    educations.map((data: Education) => {
                      const { education_name: education, education_id } = data;
                      return (
                        <SelectItem
                          value={education_id.toString()}
                          key={education_id}
                        >
                          {education}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
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
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center ">
              <Input
                type="text"
                value={data!.employmentStatus}
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg w-full py-3 px-5"
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
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <Select // value={data?.gender}
               name="occupations">
                <SelectTrigger>
                  <SelectValue placeholder={occupations[0]?.occupation_title} />
                </SelectTrigger>
                <SelectContent>
                  {occupations &&
                    occupations.map((data: Occupation) => {
                      const { occupation_title: occupation, occupation_id } =
                        data;

                      console.log(occupation);

                      return (
                        <SelectItem value={occupation} key={occupation_id}>
                          {occupation}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
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
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <Select name="incomes">
                <SelectTrigger>
                  <SelectValue placeholder={incomes[0]?.income_range} />
                </SelectTrigger>
                <SelectContent>
                  {incomes &&
                    incomes.map((data: Income) => {
                      const { income_range: income, income_id } = data;
                      return (
                        <SelectItem
                          value={income_id.toString()}
                          key={income_id}
                        >
                          {income}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
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
      </div>
    </div>
  );
};

export default WorkEducationForm;
