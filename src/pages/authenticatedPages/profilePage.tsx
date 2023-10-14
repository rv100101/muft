import ProfileTopNav from "@/components/profile/profileTopNav";
import AuthenticatedLayout from "./layout";
import ProfileHeader from "@/components/profile/profileHeader";
import AboutAccordion from "@/components/profile/about/aboutAccordion";
import { PlusCircle } from "lucide-react";
import sampleGallery from "../../assets/profile/sample-gallery.png";
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
        {/* gallery */}
        <div className="h-full">
          <div className="flex flex-row justify-between p-5 border-b">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              Gallery
            </p>
            <div className="flex flex-row justify-between rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer">
              <PlusCircle
                color="White"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-white text-sm">Add Photos</p>
            </div>
          </div>
          {/* <div className="h-full">
            <img src={sampleGallery} alt="" />
          </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
