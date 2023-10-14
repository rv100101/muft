import {
  BookOpen,
  Briefcase,
  Cake,
  Heart,
  Languages,
  MapPin,
  MoreHorizontal,
  Phone,
  PlusCircle,
} from "lucide-react";
import { OverviewStore } from "@/zustand/profile/about/useOverviewStore";

const OverviewForm = ({
  inputs,
  editModes,
  setEditMode,
  handleInputChange,
}: OverviewStore) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editModes.locationText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.locationText}
              onChange={(e) =>
                handleInputChange("locationText", e.target.value)
              }
              onBlur={() => setEditMode("locationText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="locationText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("locationText", true)}
          >
            <MapPin
              color={
                inputs.locationText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.locationText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.locationText}
            </p>
          </div>
        )}
        {inputs.locationText !== "Add Relationship Status" &&
          !editModes.locationText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editModes.educationText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.educationText}
              onChange={(e) =>
                handleInputChange("educationText", e.target.value)
              }
              onBlur={() => setEditMode("educationText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="educationText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("educationText", true)}
          >
            <BookOpen
              color={
                inputs.educationText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.educationText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.educationText}
            </p>
          </div>
        )}
        {inputs.educationText !== "Add Relationship Status" &&
          !editModes.educationText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editModes.careerText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.careerText}
              onChange={(e) => handleInputChange("careerText", e.target.value)}
              onBlur={() => setEditMode("careerText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="careerText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("careerText", true)}
          >
            <Briefcase
              color={
                inputs.careerText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.careerText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.careerText}
            </p>
          </div>
        )}
        {inputs.careerText !== "Add Relationship Status" &&
          !editModes.careerText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editModes.relationshipText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.relationshipText}
              onChange={(e) =>
                handleInputChange("relationshipText", e.target.value)
              }
              onBlur={() => setEditMode("relationshipText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="relationshipText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("relationshipText", true)}
          >
            <Heart
              color={
                inputs.relationshipText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.relationshipText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.relationshipText}
            </p>
          </div>
        )}
        {inputs.relationshipText !== "Add Relationship Status" &&
          !editModes.relationshipText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editModes.contactText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.contactText}
              onChange={(e) => handleInputChange("contactText", e.target.value)}
              onBlur={() => setEditMode("contactText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="contactText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("contactText", true)}
          >
            <Phone
              color={
                inputs.contactText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.contactText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.contactText}
            </p>
          </div>
        )}
        {inputs.contactText !== "Add Relationship Status" &&
          !editModes.contactText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editModes.birthInfoText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.birthInfoText}
              onChange={(e) =>
                handleInputChange("birthInfoText", e.target.value)
              }
              onBlur={() => setEditMode("birthInfoText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="birthInfoText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("birthInfoText", true)}
          >
            <Cake
              color={
                inputs.birthInfoText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.birthInfoText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.birthInfoText}
            </p>
          </div>
        )}
        {inputs.birthInfoText !== "Add Relationship Status" &&
          !editModes.birthInfoText && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editModes.languageText ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={inputs.languageText}
              onChange={(e) =>
                handleInputChange("languageText", e.target.value)
              }
              onBlur={() => setEditMode("languageText", false)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="languageText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={() => setEditMode("languageText", true)}
          >
            <Languages
              color={
                inputs.languageText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                inputs.languageText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {inputs.languageText}
            </p>
          </div>
        )}
        {inputs.languageText !== "Add Relationship Status" &&
          !editModes.languageText && (
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

export default OverviewForm;
