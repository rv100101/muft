
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Church, GraduationCap, Users } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Education, Ethnicity, Religion, } from "@/types/profile";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
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
import { useUserStore } from "@/zustand/auth/user";

const BackgroundForm = () => {
  const { control } = useFormContext();
  const { data, editMode, isLoading } = profileAboutContentStore();

  const { educations, religion, ethnicities } = selectOptions();

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore(state => state.profileData);
  if ((isLoading && profileData == null) || isSaving) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="education"
              render={({ field }) => {
                console.log(field);
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
                          <SelectValue placeholder={"Select education"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educations &&
                          educations.map((data: Education, index) => {
                            const { education_name: education } = data;
                            return (
                              <SelectItem value={education} key={index}>
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <GraduationCap
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.education ? data!.education : "Add education info"}
              </p>
              <p className="text-[#727272] text-xs">Educational Attainment</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="religion"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="religion">
                      Religion
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select religion"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {religion.map((data: Religion, index: number) => {
                          const { religion_name } = data;
                          return (
                            <SelectItem value={religion_name} key={index}>
                              {religion_name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>{" "}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Church
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.religion ? data?.religion : "Add Religion"}
              </p>
              <p className="text-[#727272] text-xs">Religion</p>
            </div>
          </div>
        )}
      </div> <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="ethnicity"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="ethnicity">
                      Ethnicity
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select ethnicity"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ethnicities.map((data: Ethnicity) => {
                          const { ethnicity_name, ethnicity_id } = data;
                          return (
                            <SelectItem
                              value={ethnicity_name}
                              key={ethnicity_id}
                            >
                              {ethnicity_name}
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Users
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.ethnicity ? data?.ethnicity : "Add Ethnicity"}
              </p>
              <p className="text-[#727272] text-xs">Ethnicity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundForm;
