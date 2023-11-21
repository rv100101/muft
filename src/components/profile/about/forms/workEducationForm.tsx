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
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const WorkEducationForm = () => {
  const { control } = useFormContext();
  const { data, editMode, isLoading } = profileAboutContentStore();

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

  console.log(educations);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode == true
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="education"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="education">
                        Education
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select education"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {educations &&
                            educations.map((data: Education, index) => {
                              const {
                                education_name: education,
                              } = data;
                              return (
                                <SelectItem
                                  value={education}
                                  key={index}
                                >
                                  {education}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="employmentStatus"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="employmentStatus"
                      >
                        Employment Status
                      </FormLabel>
                      <Input
                        placeholder="Enter employment status"
                        defaultValue={field.value}
                        onChange={field.onChange}
                        className="outline-0 border border rounded-lg w-full py-3 px-5"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="occupationTitle"
                render={({ field }) => {
                  console.log(field);
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="occupationTitle"
                      >
                        Occupation
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select occupation"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occupations &&
                            occupations.map((data: Occupation, index) => {
                              const {
                                occupation_title: occupation,
                                occupation_id
                              } = data;
                              return (
                                <SelectItem
                                  value={occupation}
                                  key={index}
                                >
                                  {occupation}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="income"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="income"
                      >
                        Income Range
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select Income Range"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {incomes &&
                            incomes.map((data: Income, index) => {
                              const { income_range: income } = data;
                              return (
                                <SelectItem
                                  value={income}
                                  key={index}
                                >
                                  {income}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
