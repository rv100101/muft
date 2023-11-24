import { getImagePath, getImagePathGallery } from "@/lib/images";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import sampleGalleryImage from "../../../assets/profile/sample-gallery.png";

type Gallery = {
  authorized: boolean;
  ip_address: string;
  gallery_id: string;
  member_uuid: string;
  gallery_uuid: string;
};

const GallerySection = ({ userId }: { userId: number }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Result is a data URL
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };
  // gallery
  const fetchGallery = async () => {
    try {
      const response = await axiosQuery.post("/Gallery", {
        member: user?.member_id,
      });
<<<<<<< HEAD
=======

>>>>>>> f4325bee12eea5fae75341a68846d254a57bad1d
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: gallery,
    refetch,
  } = useQuery(["gallery", userId], fetchGallery);

  const handleUploadButtonClick = async () => {
    setIsUploading(true);
    if (selectedFile && user) {
      const base64String = selectedFile.split(",")[1]; // Extracting base64 string without data:image/jpeg;base64,
      const binaryString = atob(base64String);
      const arrayBuffer = new ArrayBuffer(binaryString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Create Blob from Uint8Array

      const formData = new FormData();
      formData.append("member", String(user.member_id));
      formData.append("photo", blob, "filename.jpg"); // Append the Blob object with a filename

      try {
        const response = await axiosQuery.post(
          "/UploadGalleryPhoto",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          setSelectedFile(null);
          setIsUploading(false);
          refetch();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected or user not available.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-5 border-b space-x-5">
        <p className="uppercase font-[500] text-[#727272] no-underline">
          Gallery
        </p>
        <div className="flex flex-row space-x-5">
          {/* Display the selected file name */}
          {selectedFile && (
            <div className="flex flex-row space-x-3 items-center w-1/2">
              <div className="truncate overflow-hidden">
                <p className="text-slate-400 mt-1 ">
                  {/* Selected File: {typeof selectedFile === 'string' ? 'Base64 String' : selectedFile.name} */}
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
              <div className="text-white">
                {isUploading ? (
                  <div className="flex flex-row text-xs items-center space-x-5 text-green">
                    Uploading
                    <div className="ml-5 w-5 h-5 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Upload"
                )}
              </div>
              {/* <p className="text-white">Upload</p> */}
            </div>
          )}
        </div>
      </div>
      {/* photos section */}
      <div className="grid grid-cols-3 gap-5 p-5 flex w-full">
<<<<<<< HEAD
        {gallery && gallery.length !== 0 &&
          gallery.map((pic: Gallery, index: number) => {
            const path = getImagePathGallery(
              pic.gallery_uuid,
              null,
              pic.member_uuid,
            );
=======
        {gallery &&
          gallery.length !== 0 &&
          gallery.map((pic: Gallery, index: number) => {
            const path = getImagePath(pic.gallery_uuid, null, pic.member_uuid);
>>>>>>> f4325bee12eea5fae75341a68846d254a57bad1d
            return (
              <img
                key={index} // Don't forget to add a unique key to each image
                src={path}
                alt="test"
                className="object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.src = sampleGalleryImage;
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GallerySection;
