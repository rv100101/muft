import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Map, MapPin, ArrowUpDown, CheckIcon } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/zustand/auth/user";
import useSelectedCountryStore from "@/zustand/profile/location/selectedCountry";
import { useUpdateEffect } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const LocationForm = () => {
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [statePopoverOpen, setStatePopoverOpen] = useState(false);
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
  useUpdateEffect(() => {
    setValue("region", "");
  }, [countryCode]);

  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  if (
    (isLoading && profileData == null && user?.profile_completed) ||
    isSaving
  ) {
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
    <div
      className={cn(
        "h-96 w-full",
        !user?.profile_completed && "h-full",
        !user?.profile_completed
          ? "sm:grid sm:grid-flow-row sm:grid-cols-2 gap-2 sm:gap-4"
          : "flex flex-col space-y-4"
      )}
    >
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
                    <Popover
                      open={countryPopoverOpen}
                      onOpenChange={(open) => setCountryPopoverOpen(open)}
                    >
                      <FormControl className="w-full">
                        <PopoverTrigger className="w-full" asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full font-normal justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? countries.find(
                                    (country) =>
                                      country.country_name === field.value
                                  )?.country_name
                                : i18n.language == "en"
                                ? "Select country"
                                : "يرجى الاختيار"}
                              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        className="w-full p-0 max-h-64"
                      >
                        <Command className="w-full max-h-64">
                          <CommandInput
                            placeholder={
                              i18n.language == "en"
                                ? "Select country"
                                : "يرجى الاختيار"
                            }
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup className="w-full max-h-64 overflow-auto">
                            {countries.map((country, index: number) => (
                              <CommandItem
                                className="w-full"
                                value={country.country_name}
                                key={index}
                                onSelect={() => {
                                  setCountryPopoverOpen(false);
                                  setValue("country", country.country_name, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  });
                                  const countryData = getCountryData(
                                    country.country_name
                                  );
                                  setSelectedCountryCode(
                                    countryData!.country_code
                                  );
                                  setSelectedCountry(countryData!.country_code);
                                  setValue("region", "");
                                }}
                              >
                                {country.country_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    country.country_name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* <Select
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
                        <SelectTrigger
                          dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        >
                          <SelectValue
                            placeholder={
                              i18n.language == "en"
                                ? "Select country"
                                : "يرجى الاختيار"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        className="h-44 w-min"
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
                    </Select> */}
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
                    <Popover
                      open={statePopoverOpen}
                      onOpenChange={(open) => setStatePopoverOpen(open)}
                    >
                      <FormControl className="w-full">
                        <PopoverTrigger className="w-full" asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full font-normal justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? states.find(
                                    (state) => state.state_name === field.value
                                  )?.state_name
                                : i18n.language == "en"
                                ? "Select state"
                                : "يرجى الاختيار"}
                              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        className="w-full p-0 max-h-64"
                      >
                        <Command className="w-full max-h-64">
                          <CommandInput
                            placeholder={
                              i18n.language == "en"
                                ? "Select state"
                                : "يرجى الاختيار"
                            }
                            className="h-9 w-full"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup className="w-full max-h-64 overflow-auto">
                            {states.map((state, index: number) => (
                              <CommandItem
                                className="w-full"
                                value={state.state_name}
                                key={index}
                                onSelect={() => {
                                  setCountryPopoverOpen(false);
                                  setValue("region", state.state_name, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  });
                                }}
                              >
                                {state.state_name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    state.state_name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        >
                          <SelectValue
                            placeholder={
                              i18n.language == "en"
                                ? "Select state"
                                : "يرجى الاختيار"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        className="min-h-min max-h-44 w-min"
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
                    </Select> */}
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
