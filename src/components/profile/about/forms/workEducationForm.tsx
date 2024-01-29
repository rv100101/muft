import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Briefcase, CircleDollarSign, User } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { EmploymentStatus, Income } from "@/types/profile";
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

const WorkEducationForm = () => {
  const [t, i18n] = useTranslation();
  const { control } = useFormContext();
  const { data, editMode, isLoading } = profileAboutContentStore();

  const { incomes, occupations, employmentStatus } = selectOptions();

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
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
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
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
                      {t("memberDetails.status")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select employment status" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                        className="min-h-min max-h-44 w-min"
                      >
                        {employmentStatus &&
                          employmentStatus.map(
                            (data: EmploymentStatus, index) => {
                              const { employment_status_name } = data;
                              return (
                                <SelectItem
                                  value={employment_status_name}
                                  key={index}
                                >
                                  {employment_status_name}
                                </SelectItem>
                              );
                            }
                          )}
                      </SelectContent>
                    </Select>
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
            <Briefcase
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.employmentStatus
                  ? data!.employmentStatus
                  : "Add Employment Status"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.status")}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="occupationTitle"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel
                      className="text-primary"
                      htmlFor="occupationTitle"
                    >
                      {t("memberDetails.occupation")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select occupation" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                        className="min-h-min max-h-44 w-min"
                      >
                        {occupations &&
                          [
                            ...new Set(
                              occupations.map((o) => o.occupation_title)
                            ),
                          ].map((title, index) => {
                            return (
                              <SelectItem value={title} key={index}>
                                {title}
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
            <User
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.occupationTitle
                  ? data!.occupationTitle
                  : "Add Job Title"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.occupation")}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="income"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="income">
                      {t("memberDetails.monthlyIncome")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select income range" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                        className="min-h-min max-h-44 w-min"
                      >
                        {incomes &&
                          incomes.map((data: Income, index) => {
                            const { income_range: income } = data;
                            return (
                              <SelectItem value={income} key={index}>
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
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <CircleDollarSign
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.income ? data!.income : "Add income range"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.monthlyIncome")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkEducationForm;
