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

const AboutAccordionContent = () => {
  const { user } = useUserStore();

  const { formData: basicInfoFormData, setFormData: setBasicInfoFormData } =
    useBasicInfoStore();
  const { formData: workEducationFormData, setFormData: setWorkInfoFormData } =
    useWorkEducationStore();
  const { formData: detailsFormData, setFormData: setDetailsFormData } =
    useDetailsStore();

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

      setBasicInfoFormData({
        ...basicInfoFormData,
        gender: gender,
        nationality: nationality,
        birthInfo: date_of_birth,
        age: age,
        religion: religion_name,
        ethnicity: ethnicity_name,
        // maritalStatus: { id: marital_status_id, name: marital_status_name },
        maritalStatus: marital_status_name,
        language: language_name,
      });
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

  if (detailsDataLoading || workEducationDataLoading || basicInfoDataLoading) {
    // return <>Loading...</>;
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[400px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row mb-5">
      {/* sidebar */}
      <div className="flex flex-col w-1/3">
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
          <p className="text-md hover:cursor-pointer  select-none">
            Basic Information
          </p>
        </div>
        <div
          className={
            activeTabs[2]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(2)}
        >
          <p className="text-md hover:cursor-pointer select-none">
            Work and Education
          </p>
        </div>
        <div
          className={
            activeTabs[3]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(3)}
        >
          <p className="text-md hover:cursor-pointer select-none">
            Details about you
          </p>
        </div>
        <div
          className={
            activeTabs[4]
              ? "rounded-full bg-[#FFDEEB] py-2 px-2 my-2 text-[#FF599B] transition ease-in-out  delay-150"
              : "text-[#727272] py-2 px-2 my-2"
          }
          onClick={() => toggleTab(4)}
        >
          <p className="text-md hover:cursor-pointer select-none">Location</p>
        </div>
      </div>
      {/* content - Form*/}
      {/* overview */}
      {/* {activeTabs[0] && <OverviewForm />} */}

      {/* basic info */}
      {activeTabs[1] && <BasicInformationForm />}

      {/* Work and Education */}
      {activeTabs[2] && <WorkEducationForm />}

      {/* Details */}
      {activeTabs[3] && <DetailsForm />}

      {/* Location */}
      {activeTabs[4] && <LocationForm />}
    </div>
  );
};

export default AboutAccordionContent;
