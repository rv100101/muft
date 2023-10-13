import ProfileTopNav from "@/components/profile/profileTopNav";
import AuthenticatedLayout from "./layout";
import ProfileHeader from "@/components/profile/profileHeader";
import AboutAccordion from "@/components/profile/about/aboutAccordion";

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <div className="flex flex-col justify-start h-full w-1/2 border mx-auto">
        {/* header */}
        <ProfileTopNav />
        {/*  */}
        <ProfileHeader />
        {/* content */}
        <AboutAccordion />
      </div>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
