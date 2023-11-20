import AboutAccordion from "@/components/profile/about/aboutAccordion";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTopNav from "@/components/profile/profileTopNav";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { FormProvider, useForm } from "react-hook-form";
const ProfilePageBody = ({ userId }: { userId: string }) => {
  const data = profileAboutContentStore((state) => state.data);
  console.log(data);
  
  const methods = useForm({
    defaultValues: {
      ...data
    },
  });
  console.log(methods);
  
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-start w-full h-full lg:w-1/2 border mx-auto overflow-y-auto no-scrollbar ">
      {/* header */}
      <ProfileTopNav />
      {/*  */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfileHeader userId={userId} />
          <AboutAccordion userId={parseInt(userId)} />
        </form>
      </FormProvider>
      {/* gallery */}
      {/* <GallerySection /> */}
    </div>
  );
};

export default ProfilePageBody;
