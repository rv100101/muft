import {
  Briefcase,
  Heart,
  MapPin,
  MoreHorizontal,
  Phone,
  PlusCircle,
} from "lucide-react";

type DetailsFormProps = {
  detailsInputs: {
    appearance: string;
    health: string;
    lifestyle: string;
    interest: string;
    favoriteFood: string;
  };
  detailsEditModes: {
    appearance: boolean;
    health: boolean;
    lifestyle: boolean;
    interest: boolean;
    favoriteFood: boolean;
  };
  detailsHandleInputChange: (fieldName: string, value: string) => void;
};

const DetailsForm = ({
  detailsInputs,
  detailsEditModes,
  detailsHandleInputChange,
}: DetailsFormProps) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {detailsEditModes.appearance == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={detailsInputs.appearance}
              onChange={(e) =>
                detailsHandleInputChange("appearance", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="appearance"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color={
                detailsInputs.appearance === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                detailsInputs.appearance === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {detailsInputs.appearance}
            </p>
          </div>
        )}
        {detailsInputs.appearance !== "Add Relationship Status" &&
          !detailsEditModes.appearance && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {detailsEditModes.health ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={detailsInputs.health}
              onChange={(e) =>
                detailsHandleInputChange("health", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="health"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color={
                detailsInputs.health === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                detailsInputs.health === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {detailsInputs.health}
            </p>
          </div>
        )}
        {detailsInputs.health !== "Add Relationship Status" &&
          !detailsEditModes.health && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {detailsEditModes.lifestyle ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={detailsInputs.lifestyle}
              onChange={(e) =>
                detailsHandleInputChange("lifestyle", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="lifestyle"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart
              color={
                detailsInputs.lifestyle === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                detailsInputs.lifestyle === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {detailsInputs.lifestyle}
            </p>
          </div>
        )}
        {detailsInputs.lifestyle !== "Add Relationship Status" &&
          !detailsEditModes.lifestyle && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {detailsEditModes.interest ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={detailsInputs.interest}
              onChange={(e) =>
                detailsHandleInputChange("interest", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="interest"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Phone
              color={
                detailsInputs.interest === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                detailsInputs.interest === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {detailsInputs.interest}
            </p>
          </div>
        )}
        {detailsInputs.interest !== "Add Relationship Status" &&
          !detailsEditModes.interest && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {detailsEditModes.favoriteFood ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={detailsInputs.favoriteFood}
              onChange={(e) =>
                detailsHandleInputChange("favoriteFood", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="favoriteFood"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Phone
              color={
                detailsInputs.favoriteFood === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                detailsInputs.favoriteFood === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {detailsInputs.favoriteFood}
            </p>
          </div>
        )}
        {detailsInputs.favoriteFood !== "Add Relationship Status" &&
          !detailsEditModes.favoriteFood && (
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

export default DetailsForm;
