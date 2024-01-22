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
import { useUpdateEffect } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const LocationForm = () => {
  const [t, i18n] = useTranslation();
  const setSelectedCountry = useSelectedCountryStore(
    (state) => state.setSelectedCountry
  );
  const { control, setValue, watch } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const countries = selectOptions((state) => state.countries);
  const states = selectOptions((state) => state.states);
  const setSelectedCountryCode = selectOptions(
    (state) => state.setSelectedCountryCode
  );

  const countryCode = watch("country");
  console.log(countryCode);

  // useUpdateEffect(() => {
  //   const region = getStateData(selectedState);
  //   console.log(region);
  //   if (region == undefined) {
  //     setError("region", {
  //       type: "custom",
  //       message: "Invalid State",
  //     });
  //   } else {
  //     clearErrors("region");
  //   }
  // }, [selectedState, states]);

  useUpdateEffect(() => {
    setValue("region", "");
  }, [countryCode]);

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  if ((isLoading && profileData == null) || isSaving) {
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
                      {t("memberDetails.country")}
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        const country = getCountryData(e);
                        console.log(country?.country_code);
                        setSelectedCountryCode(country!.country_code);
                        setSelectedCountry(country!.country_code);
                        setValue("region", "");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select country"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Map
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.country ? data!.country : "Add country info"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.country")}
              </p>
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
                      {t("memberDetails.state")}
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
                      <SelectContent
                        dir={i18n.language == 'ar' ? "rtl" : "ltr"}
                      >
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <MapPin
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />

            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.region ? data!.region : "Add Region Info"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.state")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationForm;
