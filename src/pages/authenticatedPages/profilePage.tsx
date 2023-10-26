import ProfileTopNav from "@/components/profile/profileTopNav";
import AuthenticatedLayout from "./layout";
import ProfileHeader from "@/components/profile/profileHeader";
import AboutAccordion from "@/components/profile/about/aboutAccordion";
import { PlusCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import { useUserStore } from "@/zustand/auth/user";
import axiosQuery from "@/queries/axios";
import { useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
import sampleGalleryImage from "../../assets/profile/sample-gallery.png";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useUserStore();
  const fileInputRef = useRef(null);

  const handleGalleryUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file && user) {
  //     const formData = new FormData();
  //     formData.append("photo", file); // 'photo' is the name of the field that your server expects
  //     formData.append("member", String(user.member_id)); // 'member' is another property being sent

  //     try {
  //       const response = await axiosQuery.post(
  //         "/UploadGalleryPhoto",
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the state with the selected file
      setSelectedFile(file);
    }
  };

  const handleUploadButtonClick = async () => {
    if (selectedFile && user) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("member", String(user.member_id));

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
    } else {
      console.error("No file selected or user not available.");
    }
  };

  // gallery
  const fetchGallery = async () => {
    try {
      const response = await axiosQuery.post("/Gallery", {
        member: user?.member_id,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data: gallery, isLoading } = useQuery(["gallery"], fetchGallery);

  if (isLoading) {
    return <></>;
  }
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
        <div className="h-full">
          <div className="flex flex-row justify-between p-5 border-b">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              Gallery
            </p>
            <div className="flex flex-row space-x-5">
              {/* Display the selected file name */}
              {selectedFile && (
                <div className="flex flex-row space-x-3 items-center">
                  <p className="text-slate-400 mt-1">
                    Selected File: {selectedFile.name}
                  </p>
                  <X
                    // color="White"
                    size={15}
                    className="hover:cursor-pointer"
                    onClick={() => setSelectedFile("")}
                  />
                </div>
              )}

              {/* Button to trigger the upload */}
              <div
                onClick={handleGalleryUpload}
                className="flex items-center rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
              >
                <PlusCircle
                  color="White"
                  size={20}
                  className="hover:cursor-pointer"
                />
                <div className="flex flex-col">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="invisible w-0 h-0"
                    ref={fileInputRef}
                  />
                  <p className="text-white text-sm">Add Photos</p>
                </div>
              </div>
              {selectedFile && (
                <div
                  onClick={handleUploadButtonClick}
                  className="flex items-center rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
                >
                  <p className="text-white">Upload</p>
                </div>
              )}
            </div>
          </div>
          {/* photos section */}
          <div className="flex lg:flex-row justify-start space-x-5 p-5 h-full lg:overflow-hidden overflow-scroll ">
            {gallery.map((pic) => {
              const path = getImagePath(
                pic.gallery_uuid,
                null,
                pic.member_uuid
              );

              return (
                <img
                  src={path}
                  alt="test"
                  width={200}
                  height={200}
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = sampleGalleryImage;
                  }}
                />
              );
            })}
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
