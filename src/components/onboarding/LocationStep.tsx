import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Country, State } from "@/types/profile";
import { useUpdateEffect } from "usehooks-ts";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import useSelectedCountryStore from "@/zustand/profile/location/selectedCountry";
import LocationForm from "../profile/about/forms/locationForm";
const LocationStep = () => {

  const [, i18n] = useTranslation();
  const {
    setCountries, setStates, countries
  } = selectOptions();
  const { selectedCountry, setSelectedCountry } = useSelectedCountryStore();
  const { data: profileAboutContent } = profileAboutContentStore();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getCountries(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["countries", i18n.language],
    onSuccess: (data: Country[]) => {
      setCountries(data);
    },
  });

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getStates(
        selectedCountry ?? "", i18n.language
      ),
    // enabled: selectedCountry.length !== 0,
    queryKey: ["states", selectedCountry, i18n.language],
    onSuccess: (data: State[]) => {
      setStates(data);
    },
    refetchOnReconnect: "always",
  });

  useUpdateEffect(() => {
    if (countries.length !== 0 && profileAboutContent) {
      console.log(countries, profileAboutContent);
      if (profileAboutContent.country.length !== 0) {
        console.log(profileAboutContent);
        setSelectedCountry(profileAboutContent.country_code);
      }
    }
  }, [countries, profileAboutContent]);

  return (
    <div className="w-full sm:w-1/2"><LocationForm /></div>
  )
}

export default LocationStep
