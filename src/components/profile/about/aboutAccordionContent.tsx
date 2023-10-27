import { useState } from "react";
import BasicInformationForm from "./forms/basicInformationForm";
import WorkEducationForm from "./forms/workEducationForm";
import DetailsForm from "./forms/detailsForm";
import LocationForm from "./forms/locationForm";
import { useBasicInfoStore } from "@/zustand/profile/about/useBasicInfoStore";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useWorkEducationStore } from "@/zustand/profile/about/useWorkEducationStore";
import { useUserStore } from "@/zustand/auth/user";
import axiosQuery from "@/queries/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Contact, Globe, User2 } from "lucide-react";
import { useLocationStore } from "@/zustand/profile/about/useLocationStore";

const AboutAccordionContent = () => {
  const { user } = useUserStore();

  const { formData: basicInfoFormData, setFormData: setBasicInfoFormData } =
    useBasicInfoStore();
  const { formData: workEducationFormData, setFormData: setWorkInfoFormData } =
    useWorkEducationStore();
  const { formData: detailsFormData, setFormData: setDetailsFormData } =
    useDetailsStore();

  const { formData: locationFormData, setFormData: setLocationFormData } =
    useLocationStore();

  const [activeTabs, setActiveTabs] = useState([
    false,
    true,
    false,
    false,
    false,
  ]);
  const toggleTab = (index: number) => {
    const newActiveTabs = activeTabs.map((_, i) => i === index);
    setActiveTabs(newActiveTabs);
  };

  // fetch initial data
  const fetchBasicInfoInitialData = async () => {
    try {
      const response1 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetBasicInfo",
        { member: user?.member_id }
      );
      const response2 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetBackground",
        { member: user?.member_id }
      );
      const response3 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetMaritalStatus",
        { member: user?.member_id }
      );
      const response = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetLanguages",
        { member: user?.member_id }
      );

      const { gender, nationality, date_of_birth, age } = response1.data;
      const { religion_name, ethnicity_name } = response2.data;
      const { marital_status_name } = response3.data;
      const { language_name } = response.data[0];
      const formattedDate = new Date(date_of_birth).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      setBasicInfoFormData({
        ...basicInfoFormData,
        gender: gender,
        nationality: nationality,
        birthInfo: formattedDate,
        age: age,
        religion: religion_name,
        ethnicity: ethnicity_name,
        // maritalStatus: { id: marital_status_id, name: marital_status_name },
        maritalStatus: marital_status_name,
        language: language_name,
      });

      return response1.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkEducationInitialData = async () => {
    try {
      const response1 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetBackground",
        { member: user?.member_id }
      );

      const response2 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetEmployment",
        { member: user?.member_id }
      );

      const { education_name } = response1.data;
      const { employment_status_name, occupation_title, income_range } =
        response2.data;

      setWorkInfoFormData({
        ...workEducationFormData,
        education: education_name,
        employmentStatus: employment_status_name,
        occupationTitle: occupation_title,
        income: income_range,
      });

      return response1.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDetailsInitialData = async () => {
    try {
      const response1 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetHeight",
        { member: user?.member_id }
      );

      const response2 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetWeight",
        { member: user?.member_id }
      );

      const response3 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetAppearance",
        { member: user?.member_id }
      );

      const response4 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetFavoriteFood",
        { member: user?.member_id }
      );

      const { height } = response1.data[0];

      const { weight } = response2.data[0];
      const { body_type_name } = response3.data;
      const { favorite_food_name } = response4.data[0];

      setDetailsFormData({
        ...detailsFormData,
        height: height,
        weight: weight,
        bodyType: body_type_name,
        favoriteFood: favorite_food_name,
      });

      return response1.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocationInitialData = async () => {
    try {
      const response = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/GetCountry",
        { member: user!.member_id }
      );

      const response2 = await axiosQuery.post(
        "https://muffinfunction.azurewebsites.net/api/Countries",
        { member: user!.member_id }
      );

      const { country_name } = response.data;
      const { region_name, country_code } = response2.data.find(
        ({ country_name }) => country_name == country_name
      );

      setLocationFormData({
        ...locationFormData,
        country: country_code,
        region: region_name,
      });

      return response2.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading: basicInfoDataLoading } = useQuery(
    ["basicInfoInitialData"],
    fetchBasicInfoInitialData
  );

  const { isLoading: workEducationDataLoading } = useQuery(
    ["workEducationInitialData"],
    fetchWorkEducationInitialData
  );

  const { isLoading: detailsDataLoading } = useQuery(
    ["detailsInitialData"],
    fetchDetailsInitialData
  );

  const { isLoading: locationDataLoading } = useQuery(
    ["locationInitialData"],
    fetchLocationInitialData
  );

  if (
    detailsDataLoading ||
    workEducationDataLoading ||
    basicInfoDataLoading ||
    locationDataLoading
  ) {
    // return <>Loading...</>;
    return (
      <div className="flex flex-row justify-start items-start space-x-4 w-full ml-2">
        <div className="flex-col space-y-2">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
        <div className="flex-col space-y-2">
          <Skeleton className="h-6 w-[480px]" />
          <Skeleton className="h-6 w-[460px]" />
          <Skeleton className="h-6 w-[440px]" />
          <Skeleton className="h-6 w-[430px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col mb-5">
      {/* sidebar */}
      <div className="flex flex-row justify-around lg:justify-start lg:w-1/3 w-full lg:block">
        {/* <div
          className={
            activeTabs[0]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(0)}
        >
          <p className="text-md hover:cursor-pointer select-none">Overview</p>
        </div> */}
        <div
          className={
            activeTabs[1]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(1)}
        >
          <p className="text-md hover:cursor-pointer  select-none lg:block hidden">
            Basic Information
          </p>
          <User2
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            activeTabs[2]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(2)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Work and Education
          </p>
          <Briefcase
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            activeTabs[3]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(3)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Details about you
          </p>
          <Contact
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
        <div
          className={
            activeTabs[4]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(4)}
        >
          <p className="text-md hover:cursor-pointer select-none lg:block hidden">
            Location
          </p>
          <Globe
            // color="#FF599B"
            size={20}
            className="hover:cursor-pointer lg:hidden"
          />
        </div>
      </div>
      <div className="flex flex-col lg:w-full">
        {/* basic info */}
        {activeTabs[1] && <BasicInformationForm />}

        {/* Work and Education */}
        {activeTabs[2] && <WorkEducationForm />}

        {/* Details */}
        {activeTabs[3] && <DetailsForm />}

        {/* Location */}
        {activeTabs[4] && <LocationForm />}
      </div>
      {/* content - Form*/}
      {/* overview */}
      {/* {activeTabs[0] && <OverviewForm />} */}
    </div>
  );
};

export default AboutAccordionContent;
