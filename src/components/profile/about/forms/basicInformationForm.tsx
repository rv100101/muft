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

const BasicInformationForm = () => {
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
  };
  const { nationalities, ethnicities, maritalStatus, languages } =
    selectOptions();
  const { editMode, isLoading } = profileAboutContentStore();
  const data = profileAboutContentStore((state) => state.data);

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
            <>
              <label className="text-primary" htmlFor="gender">Gender</label>
              <Select name="gender">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent id="gender">
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
            </>
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
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="nationality">Nationality</label>
              <Select // value={data?.gender}
               name="nationalities">
                <SelectTrigger>
                  <SelectValue placeholder={nationalities[0]?.nationality} />
                </SelectTrigger>
                <SelectContent className="h-72">
                  {nationalities.map((data: Nationality, index: number) => {
                    const { nationality, country_code } = data;
                    return (
                      <SelectItem value={country_code} key={index}>
                        {nationality}
                      </SelectItem>
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
              <label className="text-primary" htmlFor="birthInfo">Birthday</label>
              <Input
                name="birthInfo"
                type="date"
                value={data?.birthInfo}
                onChange={() => handleInputChange()}
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
                value={data?.age}
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
              <label className="text-primary" htmlFor="ethnicities">Ethnicity</label>
              <Select name="ethnicities">
                <SelectTrigger>
                  <SelectValue placeholder={ethnicities[0]?.ethnicity_name} />
                </SelectTrigger>
                <SelectContent>
                  {ethnicities.map((data: Ethnicity) => {
                    const { ethnicity_name, ethnicity_id } = data;
                    return (
                      <SelectItem
                        value={ethnicity_id.toString()}
                        key={ethnicity_id}
                      >
                        {ethnicity_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
              <label className="text-primary" htmlFor="maritalStatus">Marital Status</label>
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
              <label className="text-primary" htmlFor="languages">Languages</label>
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
