import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Briefcase,
  CheckIcon,
  ArrowUpDown,
  CircleDollarSign,
  User,
} from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

const WorkEducationForm = () => {
  const [t, i18n] = useTranslation();
  const { control, setValue } = useFormContext();
  const { data, editMode, isLoading } = profileAboutContentStore();
  const [occupationPopoverOpen, setOccupationPopoverOpen] = useState(false);

  const { incomes, occupations, employmentStatus } = selectOptions();

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  if (
    (isLoading && profileData == null && user?.profile_completed) ||
    isSaving
  ) {
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
          <div className="space-y-1  w-full items-center">
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
                        <SelectTrigger
                          dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        >
                          <SelectValue
                            placeholder={
                              i18n.language == "en"
                                ? "Select employment status"
                                : "يرجى الاختيار"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
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
              "flex flex-row space-x-2 ",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Briefcase
              color="#ff5c9d"
              size={30}
              className=" mt-2 mr-3"
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
          <div className="space-y-1  w-full items-center">
            <FormField
              name="occupationTitle"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel
                      className="text-primary"
                      htmlFor="occupationTitle"
                    >
                      {t("memberDetails.occupation")}
                    </FormLabel>
                    <Popover
                      open={occupationPopoverOpen}
                      onOpenChange={(open) => setOccupationPopoverOpen(open)}
                    >
                      <FormControl className="w-full">
                        <PopoverTrigger className="w-full" asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full font-normal justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? occupations.find(
                                  (occupation) =>
                                    occupation.occupation_title ===
                                    field.value
                                )?.occupation_title
                                : i18n.language == "en"
                                  ? "Select occupation"
                                  : "يرجى الاختيار"}
                              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        className="p-0 max-h-64"
                      >
                        <Command className="w-full max-h-64">
                          <CommandInput
                            placeholder={
                              i18n.language == "en"
                                ? "Select occupation"
                                : "يرجى الاختيار"
                            }
                            className="h-9 w-full"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup className="w-full max-h-64 overflow-auto">
                            {occupations.map((occupation, index: number) => (
                              <CommandItem
                                className="w-full"
                                value={occupation.occupation_title}
                                key={index}
                                onSelect={() => {
                                  setOccupationPopoverOpen(false);
                                  setValue(
                                    "occupationTitle",
                                    occupation.occupation_title,
                                    { shouldDirty: true, shouldTouch: true }
                                  );
                                }}
                              >
                                {occupation.occupation_title}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    occupation.occupation_title === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
              "flex flex-row space-x-2 ",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <User
              color="#ff5c9d"
              size={30}
              className=" mt-2 mr-3"
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
          <div className="space-y-1  w-full items-center">
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
                        <SelectTrigger
                          dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        >
                          <SelectValue
                            placeholder={
                              i18n.language == "en"
                                ? "Select income range"
                                : "يرجى الاختيار"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
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
              "flex flex-row space-x-2 ",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <CircleDollarSign
              color="#ff5c9d"
              size={30}
              className=" mt-2 mr-3"
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
