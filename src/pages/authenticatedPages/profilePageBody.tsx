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

const ProfilePageBody = ({ userId }: { userId: string }) => {
  const { toggleEditMode } = profileAboutContentStore();
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const { data } = profileAboutContentStore();
  const { user } = useUserStore();
  const methods = useForm({
    defaultValues: emptyDefault,
    resolver: zodResolver(ProfileFormSchema),
  });

  const setIsSaving  = profileAboutContentStore((state) =>
    state.setIsSaving
  );

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

  const onSubmit = async (formData: any) => {
    console.log(formData);
    if (!methods.formState.isDirty) {
      toggleEditMode();
      return;
    }
    setIsSaving(true);
    try {
      await profileContentQuery.saveInformation(formData, user!.member_id);
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
