import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Briefcase, MapPin } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LocationForm = () => {
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);

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
              <FormField
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="country">
                        Country 
                      </FormLabel>
                      <Input
                        placeholder="Enter country"
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="outline-0 border rounded-lg w-full py-3 px-5"
                        name="country"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
              <FormField
                name="region"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="region">
                        Region/State
                      </FormLabel>
                      <Input
                        placeholder="Enter state"
                        type="text"
                        defaultValue={field.value}
                        onChange={field.onChange}
                        className="outline-0 border border rounded-lg w-full py-3 px-5"
                        name="region"
                        readOnly
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
