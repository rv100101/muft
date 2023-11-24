import AboutAccordion from "@/components/profile/about/aboutAccordion";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTopNav from "@/components/profile/profileTopNav";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { emptyDefault, ProfileFormSchema } from "@/lib/profileZodSchema";
import { useEffect } from "react";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import GallerySection from "@/components/profile/gallery/gallerySection";
import profileContentQuery from "@/queries/profile/profileContent";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { useUserStore } from "@/zustand/auth/user";
import { useQueryClient } from "@tanstack/react-query";
const ProfilePageBody = ({ userId }: { userId: string }) => {
  const { toggleEditMode } = profileAboutContentStore();
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const { data } = profileAboutContentStore();
  const {setIsSaving} = profileAboutContentStore();
  const {user} = useUserStore();
  const queryClient = useQueryClient();
  const methods = useForm({
    defaultValues: emptyDefault,
    resolver: zodResolver(ProfileFormSchema),
  });

  useEffect(() => {
    if (data && headerValues) {
      methods.reset({
        gender: data.gender,
        nationality: data.nationality,
        birthInfo: data.birthInfo,
        ethnicity: data.ethnicity,
        maritalStatus: data.maritalStatus,
        language: data.language,
        education: data.education,
        employmentStatus: data.employmentStatus,
        occupationTitle: data.occupationTitle,
        income: data.income,
        height: data.height,
        weight: data.weight,
        bodyType: data.bodyType,
        favoriteFood: data.favoriteFood,
        country: data.country,
        region: data.region,
        nickname: headerValues?.nickname ?? "",
      });
    }
  }, [data, headerValues, methods]);
  
  const {
    educations,
    incomes,
    occupations,
    nationalities,
    ethnicities,
    maritalStatus,
    languages,
    bodyTypes,
    favoriteFoods,
    countries,
    states,
  } = selectOptions();

  const getLanguage = (languageName: string) =>
    languages.find((language) => language.language_name === languageName);

  const getEthnicity = (ethnicityName: string) =>
    ethnicities.find((ethnicity) => ethnicity.ethnicity_name === ethnicityName);

  const getNationality = (nationalityName: string) =>
    nationalities.find((nationality) =>
      nationality.nationality === nationalityName
    );

  const getEducation = (name: string) =>
    educations.find((e) => e.education_name === name);

  const getOccupation = (name: string) =>
    occupations.find((e) => e.occupation_title === name);

  const getMaritalStatus = (maritalStatusName: string) =>
    maritalStatus.find((ms) => ms.marital_status_name === maritalStatusName);

  const getIncome = (name: string) =>
    incomes.find((income) => income.income_range === name);

  const getBodyType = (name: string) =>
    bodyTypes.find((bt) => bt.body === name);

  const getFavoriteFoods = (name: string) =>
    favoriteFoods.find((ff) => ff.favorite_food_name === name);

  const getCountryData = (name: string) =>
    countries.find((c) => c.country_name === name);

  const getStateData = (name: string) =>
    states.find((s) => s.state_name === name);

  const onSubmit = async (formData: any) => {
    console.log(formData);
    if (!methods.formState.isDirty) {
      toggleEditMode();
      return;
    }
    setIsSaving(true);
    let finalFormData = { ...formData };
    try {
      const language = getLanguage(formData.language);
      const ethnicity = getEthnicity(formData.ethnicity);
      const nationality = getNationality(formData.nationality);
      const maritalStatus = getMaritalStatus(formData.maritalStatus);
      const education = getEducation(formData.education);
      const occupation = getOccupation(formData.occupation_title);
      const income = getIncome(formData.income_range);
      const bodyType = getBodyType(formData.bodyType);
      const favoriteFood = getFavoriteFoods(formData.favoriteFood);
      const country = getCountryData(formData.country);
      const region = getStateData(formData.region);
      finalFormData = {
        ...finalFormData,
        language: language?.language_code,
        ethnicity: ethnicity?.ethnicity_id,
        nationality: nationality?.country_code,
        maritalStatus: maritalStatus?.marital_status_id,
        education: education?.education_id,
        occupationTitle: occupation?.occupation_id,
        income: income?.income_id,
        bodyType: bodyType?.body_type_id,
        favoriteFood: favoriteFood?.favorite_food_id,
        country: country?.country_code,
        region: region?.state_id,
      };
      await profileContentQuery.saveInformation(finalFormData, user!.member_id);
      queryClient.invalidateQueries({
        queryKey: ["profileHeader"],
      });
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
    toggleEditMode();
  };

  return (
    <div className="flex h-full flex-col justify-start w-full lg:w-3/4 border mx-auto">
      <ProfileTopNav />
      <div className="h-full overflow-y-scroll flex flex-col">
        <FormProvider {...methods}>
          <div className="flex flex-col">
            <form
              className="flex flex-col"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <ProfileHeader userId={userId} />
              <AboutAccordion userId={parseInt(userId)} />
            </form>
            <GallerySection userId={userId} />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfilePageBody;
