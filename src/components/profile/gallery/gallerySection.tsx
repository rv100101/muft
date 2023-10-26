import { getImagePath } from "@/lib/images";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import sampleGalleryImage from "../../../assets/profile/sample-gallery.png";

const GallerySection = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useUserStore();
  const fileInputRef = useRef(null);

  const handleGalleryUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the state with the selected file
      setSelectedFile(file);
    }
  };

  const handleUploadButtonClick = async (e) => {
    if (selectedFile && user) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // const base64String = reader.result.split(",")[1]; // Extracting base64 string without data:image/jpeg;base64,
        const formData = new FormData();
        formData.append("member", String(user.member_id));
        formData.append("photo", reader.result); // Sending the base64 string instead of a File object

        try {
          const response = await axiosQuery.post(
            "/UploadGalleryPhoto",
            formData,
            {
              headers: { "Content-Type": "application/json" }, // Adjust the content type if needed
            }
          );
          if (response.status === 200) {
            setSelectedFile(null);
          }
          console.log(response);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      reader.readAsDataURL(selectedFile); // Read the selected file as a data URL
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
    <div className="h-full">
      <div className="flex flex-row justify-between items-center p-5 border-b space-x-5">
        <p className="uppercase font-[500] text-[#727272] no-underline">
          Gallery
        </p>
        <div className="flex flex-row space-x-5">
          {/* Display the selected file name */}
          {selectedFile && (
            <div className="flex flex-row space-x-3 items-center w-1/2">
              <div className="truncate overflow-hidden">
                <p className="text-slate-400 mt-1 ">
                  Selected File: {selectedFile.name}
                </p>
              </div>
              <X
                // color="White"
                size={15}
                className="hover:cursor-pointer"
                onClick={() => setSelectedFile(null)}
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
      <div className="grid grid-cols-3 gap-5 p-5 h-full lg:overflow-hidden overflow-scroll">
        {gallery.map((pic) => {
          const path = getImagePath(pic.gallery_uuid, null, pic.member_uuid);

          return (
            <img
              key={pic.id} // Don't forget to add a unique key to each image
              src={path}
              alt="test"
              className="object-cover"
              onError={(e) => {
                e.target.src = sampleGalleryImage;
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GallerySection;
