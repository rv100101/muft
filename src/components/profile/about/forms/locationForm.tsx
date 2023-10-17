import { Briefcase, MapPin, MoreHorizontal, PlusCircle } from "lucide-react";

type LocationFormProps = {
  locationInputs: {
    country: string;
    state: string;
  };
  locationEditModes: {
    country: boolean;
    state: boolean;
  };
  locationHandleInputChange: (fieldName: string, value: string) => void;
};

const LocationForm = ({
  locationInputs,
  locationEditModes,
  locationHandleInputChange,
}: LocationFormProps) => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {locationEditModes.country == true ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={locationInputs.country}
              onChange={(e) =>
                locationHandleInputChange("country", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="country"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color={
                locationInputs.country === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                locationInputs.country === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {locationInputs.country}
            </p>
          </div>
        )}
        {locationInputs.country !== "Add Relationship Status" &&
          !locationEditModes.country && (
            <MoreHorizontal
              color="#727272"
              size={20}
              className="hover:cursor-pointer "
            />
          )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {locationEditModes.state ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={locationInputs.state}
              onChange={(e) =>
                locationHandleInputChange("state", e.target.value)
              }
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="state"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color={
                locationInputs.state === "Add Relationship Status"
                  ? "#FF599B"
                  : "#727272"
              }
              size={20}
              className="hover:cursor-pointer"
            />
            <p
              className={
                locationInputs.state === "Add Relationship Status"
                  ? "text-[#FF599B]"
                  : "text-[#727272]"
              }
            >
              {locationInputs.state}
            </p>
          </div>
        )}
        {locationInputs.state !== "Add Relationship Status" &&
          !locationEditModes.state && (
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

export default LocationForm;
