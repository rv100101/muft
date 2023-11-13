import AboutAccordion from "@/components/profile/about/aboutAccordion";
import GallerySection from "@/components/profile/gallery/gallerySection";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTopNav from "@/components/profile/profileTopNav";

const ProfilePageBody = () => {
  return (
    <div className="flex flex-col justify-start w-full h-full lg:w-1/2 border mx-auto overflow-y-auto no-scrollbar ">
      {/* header */}
      <ProfileTopNav />
      {/*  */}
      <ProfileHeader />
      {/* content */}
      <AboutAccordion />
      {/* gallery */}
      <GallerySection />
    </div>
  );
};

export default ProfilePageBody;
