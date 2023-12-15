import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ethnicity,
  MaritalStatus,
  Nationality,
  Religion,
} from "@/types/profile";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Cake,
  Church,
  Flag,
  Ghost,
  Languages as LanguagesIcon,
  Ribbon,
  Users,
} from "lucide-react";
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
import LanguageField from "./languageField";
const BasicInformationForm = () => {
  const { control } = useFormContext();
  const { nationalities, ethnicities, maritalStatus, religion } =
    selectOptions();
  const { data, editMode, isLoading } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);

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
    <div
      className={cn(
        "flex flex-col h-96 overflow-y-scroll no-scrollbar w-full space-y-4",
        !user?.profile_completed && "h-full"
      )}
    >
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
      </div>
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cake
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.birthInfo
                  ? moment(data?.birthInfo).format("LL")
                  : "Add Birthday"}
              </p>
              <p className="text-[#727272] text-xs">Birthday</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex h-full flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <LanguageField />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <LanguagesIcon
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {[
                  ...new Set(data?.language.map((lang) => lang.language_name)),
                ].join(", ") ?? "Add languages"}
              </p>
              <p className="text-[#727272] text-xs">Language</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
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
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="maritalStatus"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="maritalStatus">
                      Marital Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select marital status"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatus.map((data: MaritalStatus) => {
                          const { marital_status_name, marital_status_id } =
                            data;
                          return (
                            <SelectItem
                              value={marital_status_name}
                              key={marital_status_id}
                            >
                              {marital_status_name}
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
            <Ribbon
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.maritalStatus
                  ? data?.maritalStatus
                  : "Add Marital Status"}
              </p>
              <p className="text-[#727272] text-xs">Status</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
