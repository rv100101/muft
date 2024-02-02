import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { } from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import { } from "@/components/ui/select";
import { useUserStore } from "@/zustand/auth/user";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { Disability, Workout } from "@/types/profile";
import { Accessibility, Dumbbell } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const HealthForm = () => {
  const [t, i18n] = useTranslation();
  const { control } = useFormContext();
  const { workout, disability } = selectOptions();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
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
              name="workout"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="weight">
                      {t("memberDetails.workout")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Do you workout?" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workout &&
                          workout.map((data: Workout) => {
                            return (
                              <SelectItem
                                value={data.workout_name}
                                key={data.workout_id}
                              >
                                {data.workout_name}
                              </SelectItem>
                            );
                          })}
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
            <Dumbbell
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.workout ? `${data!.workout}` : "Add Workout"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.workout")}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="disability"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="disability">
                      {t("memberDetails.disability")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                        >
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Do you have a disability?" : "يرجى الاختيار"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                        className="min-h-min max-h-44 w-min"
                      >
                        {disability &&
                          disability.map((data: Disability) => {
                            return (
                              <SelectItem
                                value={data.disability_name}
                                key={data.disability_id}
                              >
                                {data.disability_name}
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
            <Accessibility
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.disability ? data!.disability : "Add Disability"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.disability")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthForm;
