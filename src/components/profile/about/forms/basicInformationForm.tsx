import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ethnicity,
  Languages,
  MaritalStatus,
  Nationality,
} from "@/types/profile";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Cake,
  Flag,
  Ghost,
  Heart,
  Languages as LanguagesIcon,
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
const BasicInformationForm = () => {
  const { control } = useFormContext();
  const { nationalities, ethnicities, maritalStatus, languages } =
    selectOptions();
  const { data, editMode, isLoading } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);
  if (
    isLoading
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
    <div className="flex h-full flex-col space-y-4 w-full">
      <div className="text-sm justify-between w-full px-5">
        {!user?.profile_completed && (
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
                      className="outline-0 border border rounded-lg w-full py-3 px-5"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        )}
        {editMode || !user?.profile_completed
          ? (
            <div className="flex flex-col space-y-1">
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select gender"}
                            />
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Ghost
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.gender == "M" ? "Male" : "Female"}
              </p>
            </div>
          )}
      </div>
      <div className="flex flex-row justify-between h-max w-full px-5">
        {editMode || !user?.profile_completed
          ? (
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
                            <SelectValue
                              placeholder={"Select nationality"}
                            />
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
                            },
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Flag
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.nationality ? data?.nationality : "Add Nationality"}
              </p>
            </div>
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="religion"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="religion">
                        Religion
                      </FormLabel>
                      <Input
                        placeholder="Enter Religion"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        type="text"
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
              <Cake
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.birthInfo ? data?.birthInfo : "Add Birthday"}
              </p>
            </div>
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="birthInfo"
                render={({ field }) => {
                  console.log(field.value);
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="birthInfo">
                        Birthday
                      </FormLabel>
                      <Input
                        defaultValue={field.value !== ""
                          ? moment(field.value).format(
                            "YYYY-MM-DD",
                          )
                          : ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        type="date"
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
              <Cake
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.birthInfo ? data?.birthInfo : "Add Birthday"}
              </p>
            </div>
          )}
      </div>

      {/* add new */}
      {
        /* <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="age"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="age">
                        Age
                      </FormLabel>
                      <Input
                        onChange={(e) => {
                          if (
                            e.target.value !== "" &&
                            typeof parseInt(e.target.value) === "number"
                          ) {
                            field.onChange(parseInt(e.target.value));
                          }
                        }}
                        type="number"
                        placeholder="Enter age"
                        defaultValue={field.value}
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
              <CalendarClock
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {parseInt(
                    data?.age ??
                      "0",
                  ) > 1
                  ? `${data?.age} years old`
                  : `${data?.age} year old`}
              </p>
            </div>
          )}
      </div> */
      }
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
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
                            <SelectValue
                              placeholder={"Select ethnicity"}
                            />
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Users
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.ethnicity ? data?.ethnicity : "Add Ethnicity"}
              </p>
            </div>
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="maritalStatus"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="maritalStatus"
                      >
                        Marital Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select marital status"}
                            />
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
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Heart
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.maritalStatus
                  ? data?.maritalStatus
                  : "Add Marital Status"}
              </p>
            </div>
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="language"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="language"
                      >
                        Language
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Select language"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-min">
                          {languages.map((data: Languages, index: number) => {
                            const { language_name } = data;
                            return (
                              <SelectItem value={language_name} key={index}>
                                {language_name}
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
              <LanguagesIcon
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data?.language ? data?.language : "Add Language"}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
