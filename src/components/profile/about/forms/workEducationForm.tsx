import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Heart,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

type WorkEducationFormProps = {
  workEducationInputs: {
    educationText: string;
    employmentText: string;
    titleText: string;
    incomeText: string;
  };
  workEducationEditModes: {
    educationText: boolean;
    employmentText: boolean;
    titleText: boolean;
    incomeText: boolean;
  };
  workEducationHandleInputChange: (fieldName: string, value: string) => void;
};

const WorkEducationForm = ({
  workEducationInputs,
  workEducationEditModes,
  workEducationHandleInputChange,
}: WorkEducationFormProps) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {workEducationEditModes.educationText == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={workEducationInputs.educationText}
              onChange={(e) =>
                workEducationHandleInputChange("educationText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="educationText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <GraduationCap
              color={
                workEducationInputs.educationText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                workEducationInputs.educationText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {workEducationInputs.educationText}
            </p>
          </div>
        )}
        {workEducationInputs.educationText !== "Add Relationship Status" &&
          !workEducationEditModes.educationText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {workEducationEditModes.employmentText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={workEducationInputs.employmentText}
              onChange={(e) =>
                workEducationHandleInputChange("employmentText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="employmentText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color={
                workEducationInputs.employmentText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                workEducationInputs.employmentText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {workEducationInputs.employmentText}
            </p>
          </div>
        )}
        {workEducationInputs.employmentText !== "Add Relationship Status" &&
          !workEducationEditModes.employmentText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {workEducationEditModes.titleText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={workEducationInputs.titleText}
              onChange={(e) =>
                workEducationHandleInputChange("titleText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="titleText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart
              color={
                workEducationInputs.titleText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                workEducationInputs.titleText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {workEducationInputs.titleText}
            </p>
          </div>
        )}
        {workEducationInputs.titleText !== "Add Relationship Status" &&
          !workEducationEditModes.titleText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {workEducationEditModes.incomeText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={workEducationInputs.incomeText}
              onChange={(e) =>
                workEducationHandleInputChange("incomeText", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="incomeText"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <DollarSign
              color={
                workEducationInputs.incomeText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                workEducationInputs.incomeText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {workEducationInputs.incomeText}
            </p>
          </div>
        )}
        {workEducationInputs.incomeText !== "Add Relationship Status" &&
          !workEducationEditModes.incomeText && (
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

export default WorkEducationForm;
