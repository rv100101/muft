import ProfileTopNav from "@/components/profile/profileTopNav";
import AuthenticatedLayout from "./layout";
import ProfileHeader from "@/components/profile/profileHeader";
import AboutAccordion from "@/components/profile/about/aboutAccordion";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { useUserStore } from "@/zustand/auth/user";
import axiosQuery from "@/queries/axios";

const ProfilePage = () => {
  const { user } = useUserStore();
  const fileInputRef = useRef(null);

  const handleGalleryUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const formData = new FormData();
      formData.append("photo", file); // 'photo' is the name of the field that your server expects
      formData.append("member", String(user.member_id)); // 'member' is another property being sent
      console.log(
        "🚀 ~ file: profilePage.tsx:26 ~ handleFileChange ~ formData:",
        formData
      );

      try {
        const response = await axiosQuery.post(
          "/UploadGalleryPhoto",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // gallery
  // const fetchGallery = async () => {
  //   try {
  //     const response = await axiosQuery.post("/Gallery", {
  //       member: user?.member_id,
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const { data: gallery, isLoading } = useQuery(["gallery"], fetchGallery);

  // if (isLoading) {
  //   return <>Loading...</>;
  // }
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
            <div
              onClick={handleGalleryUpload}
              className="flex flex-row justify-between rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
            >
              <PlusCircle
                color="White"
                size={20}
                className="hover:cursor-pointer"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="invisible w-0 h-0"
                ref={fileInputRef}
              />
              <p className="text-white text-sm">Add Photos</p>
            </div>
          </div>
          {/* photos section */}
          {/* <div>
            {gallery.map((pic) => {
              const path = getImagePath(
                pic.gallery_uuid,
                null,
                pic.member_uuid
              );

              return <img src={path} alt="" />;
            })}
          </div> */}

          {/* <div className="h-full">
            <img src={sampleGallery} alt="" />
          </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
