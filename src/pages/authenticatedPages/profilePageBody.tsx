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
import { useUserStore } from "@/zustand/auth/user";
import { useQueryClient } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
const ProfilePageBody = ({ userId }: { userId: string }) => {
  const { toggleEditMode } = profileAboutContentStore();
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const { data } = profileAboutContentStore();
  const { user } = useUserStore();
  const methods = useForm({
    defaultValues: emptyDefault,
    resolver: zodResolver(ProfileFormSchema),
  });

  const setIsSaving = profileAboutContentStore((state) => state.setIsSaving);

  const queryClient = useQueryClient();

  useEffect(
    () => {
      if (data && headerValues) {
        methods.reset({
          gender: data.gender,
          nationality: data.nationality,
          birthInfo: data.birthInfo,
          age: parseInt(data.age),
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
    },
    [data, headerValues],
  );

  const {educations, nationalities, ethnicities, maritalStatus, languages } =
    selectOptions();

  const getLanguage = (languageName: string) =>
    languages.find((language) => language.language_name === languageName);

  const getEthnicity = (ethnicityName: string) =>
    ethnicities.find((ethnicity) => ethnicity.ethnicity_name === ethnicityName);

  const getNationality = (nationalityName: string) =>
    nationalities.find((nationality) =>
      nationality.nationality === nationalityName
    );

  const getEducation = (name: string) =>
    educations.find((e) =>
      e.education_name === name
    );

  const getMaritalStatus = (maritalStatusName: string) =>
    maritalStatus.find((ms) => ms.marital_status_name === maritalStatusName);

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
      finalFormData = {
        ...finalFormData,
        language: language?.language_code,
        ethnicity: ethnicity?.ethnicity_id,
        nationality: nationality?.country_code,
        maritalStatus: maritalStatus?.marital_status_id,
        education: education?.education_id
      };
      console.log(finalFormData);
      await profileContentQuery.saveInformation(finalFormData, user!.member_id);
      queryClient.invalidateQueries({
        queryKey: ["profileHeader", "profileContent"],
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
            <GallerySection />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfilePageBody;
