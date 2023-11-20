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
  CalendarClock,
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

const BasicInformationForm = () => {
  const { control } = useFormContext();
  const { nationalities, ethnicities, maritalStatus, languages } =
    selectOptions();
  const { data, editMode, isLoading } = profileAboutContentStore();

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
    <div className="flex flex-col space-y-4 h-max w-full justify-center items-center">
      <div className="text-sm space-y-1 justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-col space-y-1">
              <FormField
                name="gender"
                render={({ field }) => (
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
                )}
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
        {editMode
          ? (
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-primary" htmlFor="gender">
                Nationality
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={"Select nationality"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((data: Nationality, index: number) => {
                    const { nationality, country_code } = data;
                    return (
                      <option value={country_code} key={index}>
                        {nationality}
                      </option>
                    );
                  })}
                </SelectContent>
              </Select>
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
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="birthInfo">
                Birthday
              </label>
              <Input
                type="date"
                autoFocus
                className="outline-0 border border rounded-lg w-full py-3 px-5"
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
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="age">Age</label>
              <Input
                placeholder="Enter age"
                type="text"
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 border border rounded-lg w-full py-3 px-5"
                name="age"
                readOnly
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="ethnicity">
                Ethnicity
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={"Select ethnicity"}
                  />
                </SelectTrigger>
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
              );
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
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="maritalStatus">
                Marital Status
              </label>
              <Select name="maritalStatus">
                <SelectTrigger>
                  <SelectValue
                    placeholder={maritalStatus[0]?.marital_status_name}
                  />
                </SelectTrigger>
                <SelectContent>
                  {maritalStatus.map((data: MaritalStatus) => {
                    const { marital_status_name, marital_status_id } = data;
                    return (
                      <SelectItem
                        value={marital_status_id.toString()}
                        key={marital_status_id}
                      >
                        {marital_status_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="languages">
                Languages
              </label>
              <Select name="languages">
                <SelectTrigger>
                  <SelectValue
                    placeholder={languages[0]?.language_name}
                  />
                </SelectTrigger>
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
