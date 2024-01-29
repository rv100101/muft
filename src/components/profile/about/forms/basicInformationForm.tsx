import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Nationality } from "@/types/profile";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Cake, Flag, Ghost, Hash, Hourglass, User2 } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Input } from "@/components/ui/input";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import moment from "moment-with-locales-es6";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import { useEffectOnce } from "usehooks-ts";
import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
const BasicInformationForm = () => {
  const [t, i18n] = useTranslation();
  const [location] = useLocation();
  const parts = location.split("/");
  const userId = parts[parts.length - 1];
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const user = useUserStore(state => state.user);
  const isSaving = profileAboutContentStore((state) => state.isSaving);
  useEffectOnce(() => {
    const currentDate = new Date();
    const minYear = currentDate.getFullYear() - 80;
    const maxYear = currentDate.getFullYear() - 18;

    // Format the minimum and maximum dates as "YYYY-MM-DD"
    const formattedMinDate = `${minYear}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedMaxDate = `${maxYear}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    setMinDate(formattedMinDate);
    setMaxDate(formattedMaxDate);
  });

  const { control } = useFormContext();
  const { nationalities } = selectOptions();
  const { data, editMode, isLoading, profileData } = profileAboutContentStore();

  const getGender: (value: string) => string = (value: string) => {
    console.log(value);
    if (value == t('memberDetails.male') || value == 'M') {
      console.log('return M');
      return 'M'
    }
    else if (value == t('memberDetails.female') || value == 'F') {
      console.log('return F');
      return 'F'
    }
    else { return '' }
  }

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
        !user?.profile_completed ? "grid grid-flow-row grid-cols-2 gap-2 sm:gap-4" : "flex flex-col space-y-4"
      )}
    >
      {" "}
      {!editMode && user?.profile_completed && (
        <>
          <div className="flex flex-row justify-between w-full px-5">
            <div
              className={cn(
                "flex flex-row space-x-2 hover:cursor-pointer",
                i18n.language == "ar" && "space-x-reverse"
              )}
            >
              <Hash
                color="#ff569a"
                size={30}
                className="hover:cursor-pointer mt-2 mr-3"
              />
              <div className="flex flex-col justify-start space-y-1">
                <p className="font-bold text-base text-primary">{userId}</p>
                <p className="text-[#727272] text-xs">
                  {t("memberDetails.memberID")}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="flex flex-row justify-between w-full">
            <div className="space-y-1  hover:cursor-pointer w-full items-center">
              <FormField
                name="nickname"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="nickname">
                        {t("memberDetails.nickname")}
                      </FormLabel>
                      <Input
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        value={field.value}
                        type="text"
                        placeholder="Enter Nickname"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <User2
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.nickname}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.nickname")}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className={cn("w-full flex flex-col")}>
            <FormField
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="gender">
                      {t("memberDetails.gender")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        getGender(field.value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={i18n.language == 'en' ? "Select gender" : "يرجى الاختيار"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir={i18n.language == 'ar' ? "rtl" : "ltr"}>
                        <SelectItem value={"M"}>
                          {t("memberDetails.male")}
                        </SelectItem>
                        <SelectItem value={"F"}>
                          {t("memberDetails.female")}
                        </SelectItem>
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
            <Ghost
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              {
                i18n.language !== 'ar' &&
                <p className="font-bold text-base text-primary">
                  {data && data?.gender[0] == "M" ? "Male" : "Female"}
                </p>
              }
              {
                i18n.language === 'ar' &&
                <p className="font-bold text-base text-primary">
                  {data && i18n.language === 'ar' ? data?.gender : "Male"}
                </p>
              }
              <p className="text-[#727272] text-xs">
                {t("memberDetails.gender")}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between h-max w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="flex flex-col space-y-1 w-full">
            <FormField
              name="nationality"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="nationality">
                      {t("memberDetails.nationality")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={i18n.language == 'en' ? "Select nationality" : "يرجى الاختيار"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
                        {nationalities.map(
                          (data: Nationality, index: number) => {
                            const { nationality } = data;
                            return (
                              <SelectItem value={nationality} key={index}>
                                {nationality}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>{" "}
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
            <Flag
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.nationality ? data?.nationality : "Add Nationality"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.nationality")}
              </p>
            </div>
          </div>
        )}
      </div>
      {!editMode && user?.profile_completed && (
        <div className="flex flex-row justify-between w-full px-5">
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Hourglass
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">{data?.age}{" "}{t("memberDetails.years")}</p>
              <p className="text-[#727272] text-xs">{t("memberDetails.age")}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="birthInfo"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="birthInfo">
                      {t("memberDetails.birthDay")}
                    </FormLabel>
                    <Input
                      min={minDate}
                      max={maxDate}
                      defaultValue={
                        field.value !== ""
                          ? moment(field.value).format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      type="date"
                      placeholder="dd MMM yyyy"
                      className="outline-0 border rounded-lg w-full py-3 px-5"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        ) : (
          editMode && (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Cake
                color="#ff569a"
                size={30}
                className="hover:cursor-pointer mt-2 mr-3"
              />
              <div className="flex flex-col justify-start space-y-1">
                <p className="font-bold text-base text-primary">
                  {data?.birthInfo
                    ? moment(data?.birthInfo).format("DD MMM yyyy")
                    : "Add Birthday"}
                </p>
                <p className="text-[#727272] text-xs">{t("memberDetails.birthDay")}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
