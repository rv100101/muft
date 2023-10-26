import ProfileTopNav from "@/components/profile/profileTopNav";
import AuthenticatedLayout from "./layout";
import ProfileHeader from "@/components/profile/profileHeader";
import AboutAccordion from "@/components/profile/about/aboutAccordion";

import GallerySection from "@/components/profile/gallery/gallerySection";

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <div className="flex flex-col justify-start h-full lg:w-1/2 border mx-auto overflow-y-auto no-scrollbar ">
        {/* header */}
        <ProfileTopNav />
        {/*  */}
        <ProfileHeader />
        {/* content */}
        <AboutAccordion />
        {/* gallery */}
        <GallerySection />
      </div>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
