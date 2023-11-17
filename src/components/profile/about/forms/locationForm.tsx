import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Briefcase, MapPin } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Input } from "@/components/ui/input";

const LocationForm = () => {
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
  };
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
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="country">Country</label>
              <Input
                placeholder="Enter country"
                type="text"
                value={""}
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 border rounded-lg w-full py-3 px-5"
                name="country"
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <MapPin
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.country ? data!.country : "Add country info"}
              </p>
            </div>
          )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <label className="text-primary" htmlFor="state">State/Region</label>
              <Input
                placeholder="Enter state"
                type="text"
                value={""}
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg w-full py-3 px-5"
                name="state"
                readOnly
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Briefcase
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.region ? data!.region : "Add Region Info"}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default LocationForm;
