import axiosQuery from "@/queries/axios";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, MapPin, MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";

type Country = {
  authorized: boolean;
  ip_address: string;
  country_code: string;
  country_name: string;
  region_name: string;
};

const LocationForm = () => {
  const [countryInfo, setCountryInfo] = useState([]);
  const {
    formData,
    setFormData,
    globalEditMode: editMode,
  } = useLocationStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    const { region_name } = countryInfo.find(
      ({ country_code }) => country_code == value
    );
    setFormData({ ...formData, country: value, region: region_name });
  };

  const fetchCountries = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Countries"
      // { member: 32 }
    );
    setCountryInfo(response.data);

    return response.data;
  };

  const { data: Countries, isLoading } = useQuery(
    ["Countries"],
    fetchCountries
  );

  return (
    <div className="flex flex-col w-full space-y-5 py-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={formData.country}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="country"
            >
              <option value="" disabled>
                Select Country
              </option>
              {Countries &&
                Countries.map((data: Country) => {
                  const { country_name, country_code } = data;
                  return (
                    <option value={country_code} key={country_code}>
                      {country_name}
                    </option>
                  );
                })}
            </select>
            {/* <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="country"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {formData.country ? formData.country : "Add country info"}
            </p>
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
              value={formData.region}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="state"
              readOnly
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {formData.region ? formData.region : "Add Region Info"}
            </p>
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
