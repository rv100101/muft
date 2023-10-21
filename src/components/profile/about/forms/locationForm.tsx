import { useLocationStore } from "@/zustand/profile/about/useLocationStore";
import { Briefcase, MapPin, MoreHorizontal, PlusCircle } from "lucide-react";

const LocationForm = () => {
  const {
    formData,
    setFormData,
    globalEditMode: editMode,
  } = useLocationStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
              name="country"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.country}</p>
          </div>
        )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg w-3/4 py-3 px-5"
              name="state"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.state}</p>
          </div>
        )}
        {!editMode && (
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
