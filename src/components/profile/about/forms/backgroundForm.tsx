import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Church, GraduationCap, Users } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Education, Ethnicity, Religion } from "@/types/profile";
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
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const BackgroundForm = () => {
  const [t, i18n] = useTranslation();
  const { control } = useFormContext();
  const { data, editMode, isLoading } = profileAboutContentStore();

  const { educations, religion, ethnicities } = selectOptions();

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  console.log(
    (isLoading && profileData == null && user?.profile_completed) || isSaving
  );

  if ((isLoading && profileData == null && user?.profile_completed) || isSaving) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-96 w-full",
        !user?.profile_completed && "h-full",
        !user?.profile_completed ? "sm:grid sm:grid-flow-row sm:grid-cols-2 gap-2 sm:gap-4" : "flex flex-col space-y-4"
      )}
    >
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="education"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="education">
                      {t("memberDetails.education")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select education" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <GraduationCap
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.education ? data!.education : "Add education info"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.education")}
              </p>
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
                      {t("memberDetails.religion")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select religion" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Church
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.religion ? data?.religion : "Add Religion"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.religion")}
              </p>
            </div>
          </div>
        )}
      </div>{" "}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full ">
            <FormField
              name="ethnicity"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="ethnicity">
                      {t("memberDetails.ethnicity")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select ethnicity" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Users
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.ethnicity ? data?.ethnicity : "Add Ethnicity"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.ethnicity")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundForm;
