import {
  BookOpen,
  Briefcase,
  Heart,
  MapPin,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { ChangeEvent } from "react";

type OverviewFormProps = {
  locationText: string;
  EducationText: string;
  careerText: string;
  relationshipText: string;
  contactText: string;
  birthInfoText: string;
  languageText: string;
  isEditing: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDoubleClick: () => void;
  handleInputBlur: () => void;
};

const OverviewForm = ({
  locationText,
  EducationText,
  careerText,
  relationshipText,
  contactText,
  birthInfoText,
  languageText,
  isEditing,
  handleInputChange,
  handleDoubleClick,
  handleInputBlur,
}: OverviewFormProps) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        <div className="flex flex-row space-x-2">
          <MapPin color="#727272" size={20} className="hover:cursor-pointer" />
          <p className="text-[#727272]">United Arab Emirates</p>
        </div>
        <MoreHorizontal
          color="#727272"
          size={20}
          className="hover:cursor-pointer "
        />
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        <div className="flex flex-row space-x-2">
          <BookOpen
            color="#727272"
            size={20}
            className="hover:cursor-pointer"
          />
          <p className="text-[#727272]">Bachelors Degree</p>
        </div>
        <MoreHorizontal
          color="#727272"
          size={20}
          className="hover:cursor-pointer "
        />
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        <div className="flex flex-row space-x-2">
          <Briefcase
            color="#727272"
            size={20}
            className="hover:cursor-pointer"
          />
          <p className="text-[#727272]">Italian Model</p>
        </div>
        <MoreHorizontal
          color="#727272"
          size={20}
          className="hover:cursor-pointer "
        />
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {isEditing ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={relationshipText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="relationshipText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={handleDoubleClick}
          >
            <Heart
              color={
                relationshipText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                relationshipText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {relationshipText}
            </p>
          </div>
        )}
        {relationshipText !== "Add Relationship Status" && !isEditing && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      {/* <div className="flex flex-row justify-between w-full px-5">
        {isEditing ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={locationText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="locationText"
            />
          </div>
        ) : (
          <div
            className="flex flex-row space-x-2 hover:cursor-pointer"
            onDoubleClick={handleDoubleClick}
          >
            <MapPin
              color={
                locationText === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                locationText === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {locationText}
            </p>
          </div>
        )}
        {locationText !== "Add Relationship Status" && !isEditing && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div> */}
    </div>
  );
};

export default OverviewForm;
