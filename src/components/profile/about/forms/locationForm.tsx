import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Map, MapPin } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Country, State } from "@/types/profile";
import { useUserStore } from "@/zustand/auth/user";
import useSelectedCountryStore from "@/zustand/profile/location/selectedCountry";

const LocationForm = () => {
  const setSelectedCountry = useSelectedCountryStore(
    (state) => state.setSelectedCountry
  );
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const countries = selectOptions((state) => state.countries);
  const states = selectOptions((state) => state.states);
  const setSelectedCountryCode = selectOptions(
    (state) => state.setSelectedCountryCode
  );

  const user = useUserStore((state) => state.user);

  if (isLoading) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
        </div>
      </div>
    );
  }

  const getCountryData = (name: string) =>
    countries.find((c) => c.country_name === name);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="country">
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        const country = getCountryData(e);
                        setSelectedCountryCode(country!.country_code);
                        setSelectedCountry(country!.country_code);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select country"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries &&
                          countries.map((data: Country, index: number) => {
                            return (
                              <SelectItem value={data.country_name} key={index}>
                                {data.country_name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
              control={control}
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Map
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.country ? data!.country : "Add country info"}
              </p>
              <p className="text-[#727272] text-xs">Country</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="region"
              render={({ field }) => {
                console.log(field);
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="region">
                      State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select state"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states &&
                          states.map((data: State, index: number) => {
                            return (
                              <SelectItem value={data.state_name} key={index}>
                                {data.state_name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
              control={control}
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />

            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.region ? data!.region : "Add Region Info"}
              </p>
              <p className="text-[#727272] text-xs">State</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationForm;
