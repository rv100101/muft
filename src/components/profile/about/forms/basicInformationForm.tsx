import {
  Cake,
  CalendarClock,
  Cross,
  Flag,
  Ghost,
  Heart,
  Languages,
  MoreHorizontal,
  PlusCircle,
  Users,
} from "lucide-react";

type BasicInfoFormProps = {
  basicInfoInputs: {
    genderText: string;
    nationalityText: string;
    birthInfoText: string;
    ageText: string;
    religionText: string;
    ethnicityText: string;
    maritalStatusText: string;
    languageText: string;
  };
  basicInfoEditModes: {
    genderText: boolean;
    nationalityText: boolean;
    birthInfoText: boolean;
    ageText: boolean;
    religionText: boolean;
    ethnicityText: boolean;
    maritalStatusText: boolean;
    languageText: boolean;
  };
  basicInfoHandleInputChange: (fieldName: string, value: string) => void;
};

const BasicInformationForm = ({
  basicInfoInputs,
  basicInfoEditModes,
  basicInfoHandleInputChange,
}: BasicInfoFormProps) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.genderText == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.genderText}
              onChange={(e) =>
                basicInfoHandleInputChange("genderText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="genderText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Ghost
              color={
                basicInfoInputs.genderText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.genderText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.genderText}
            </p>
          </div>
        )}
        {basicInfoInputs.genderText !== "Add Relationship Status" &&
          !basicInfoEditModes.genderText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.nationalityText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.nationalityText}
              onChange={(e) =>
                basicInfoHandleInputChange("nationalityText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="nationalityText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Flag
              color={
                basicInfoInputs.nationalityText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.nationalityText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.nationalityText}
            </p>
          </div>
        )}
        {basicInfoInputs.nationalityText !== "Add Relationship Status" &&
          !basicInfoEditModes.nationalityText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.birthInfoText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.birthInfoText}
              onChange={(e) =>
                basicInfoHandleInputChange("birthInfoText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="birthInfoText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cake
              color={
                basicInfoInputs.birthInfoText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.birthInfoText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.birthInfoText}
            </p>
          </div>
        )}
        {basicInfoInputs.birthInfoText !== "Add Relationship Status" &&
          !basicInfoEditModes.birthInfoText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.ageText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.ageText}
              onChange={(e) =>
                basicInfoHandleInputChange("ageText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="ageText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <CalendarClock
              color={
                basicInfoInputs.ageText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.ageText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.ageText}
            </p>
          </div>
        )}
        {basicInfoInputs.ageText !== "Add Relationship Status" &&
          !basicInfoEditModes.ageText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.religionText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.religionText}
              onChange={(e) =>
                basicInfoHandleInputChange("religionText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="religionText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cross
              color={
                basicInfoInputs.religionText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.religionText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.religionText}
            </p>
          </div>
        )}
        {basicInfoInputs.religionText !== "Add Relationship Status" &&
          !basicInfoEditModes.religionText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.ethnicityText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.ethnicityText}
              onChange={(e) =>
                basicInfoHandleInputChange("ethnicityText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="ethnicityText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Users
              color={
                basicInfoInputs.ethnicityText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.ethnicityText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.ethnicityText}
            </p>
          </div>
        )}
        {basicInfoInputs.ethnicityText !== "Add Relationship Status" &&
          !basicInfoEditModes.ethnicityText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.maritalStatusText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.maritalStatusText}
              onChange={(e) =>
                basicInfoHandleInputChange("maritalStatusText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="maritalStatusText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart
              color={
                basicInfoInputs.maritalStatusText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.maritalStatusText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.maritalStatusText}
            </p>
          </div>
        )}
        {basicInfoInputs.maritalStatusText !== "Add Relationship Status" &&
          !basicInfoEditModes.maritalStatusText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {basicInfoEditModes.languageText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={basicInfoInputs.languageText}
              onChange={(e) =>
                basicInfoHandleInputChange("languageText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="languageText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Languages
              color={
                basicInfoInputs.languageText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                basicInfoInputs.languageText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {basicInfoInputs.languageText}
            </p>
          </div>
        )}
        {basicInfoInputs.languageText !== "Add Relationship Status" &&
          !basicInfoEditModes.languageText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      {/*  */}
    </div>
  );
};

export default BasicInformationForm;
