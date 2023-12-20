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
const BasicInformationForm = () => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
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

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedDate = event.target.value;

  //   // Validate the selected date against the min and max dates
  //   if (selectedDate < minDate || selectedDate > maxDate) {
  //     // Reset the input value if the date is outside the allowed range
  //     event.target.value = '';
  //   }
  // };

  const { control } = useFormContext();
  const { nationalities } = selectOptions();
  const { data, editMode, isLoading, profileData } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);

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
    <div
      className={cn(
        "flex flex-col h-96  w-full space-y-4",
        !user?.profile_completed && "h-full"
      )}
    >
      {" "}
      {!editMode && (
        <>
          <div className="flex flex-row justify-between w-full px-5">
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Hash
                color="#ff569a"
                size={30}
                className="hover:cursor-pointer mt-2 mr-3"
              />
              <div className="flex flex-col justify-start space-y-1">
                <p className="font-bold text-base text-primary">
                  {user!.member_id}
                </p>
                <p className="text-[#727272] text-xs">User ID</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full px-5">
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <User2
                color="#ff569a"
                size={30}
                className="hover:cursor-pointer mt-2 mr-3"
              />
              <div className="flex flex-col justify-start space-y-1">
                <p className="font-bold text-base text-primary">
                  {data?.nickname}
                </p>
                <p className="text-[#727272] text-xs">Nickname</p>
              </div>
            </div>
          </div>
        </>
      )}
      {!user?.profile_completed && (
        <div className="flex flex-row justify-between w-full px-5">
          <div className="space-y-1 my-2 hover:cursor-pointer w-full items-center">
            <FormField
              name="nickname"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="nickname">
                      Nickname
                    </FormLabel>
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      value={field.value}
                      type="text"
                      placeholder="Enter Nickname"
                      className="outline-0 border rounded-lg w-full py-3 px-5"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="flex flex-col w-full">
            <FormField
              name="gender"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="gender">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        field.value && field.value.length > 1
                          ? field.value[0]
                          : field.value
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select gender"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"M"}>Male</SelectItem>
                        <SelectItem value={"F"}>Female</SelectItem>
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
            <Ghost
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data && data?.gender[0] == "M" ? "Male" : "Female"}
              </p>
              <p className="text-[#727272] text-xs">Gender</p>
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
                      Nationality
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select nationality"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Flag
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.nationality ? data?.nationality : "Add Nationality"}
              </p>
              <p className="text-[#727272] text-xs">Nationality</p>
            </div>
          </div>
        )}
      </div>
      {!editMode && (
        <div className="flex flex-row justify-between w-full px-5">
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Hourglass
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">{data?.age}y</p>
              <p className="text-[#727272] text-xs">Age</p>
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
                      Birthday
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
                <p className="text-[#727272] text-xs">Birthday</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
