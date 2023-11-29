import { getImagePathGallery } from "@/lib/images";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Trash2Icon, X } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import sampleGalleryImage from "../../../assets/profile/sample-gallery.png";
import ImageViewer from "react-simple-image-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "@/components/ui/button";
import DeleteDialog from "./deleteDialog";
import uploadQueries from "@/queries/uploading";
import { toast } from "@/components/ui/use-toast";

type Gallery = {
  authorized: boolean;
  ip_address: string;
  gallery_id: string;
  member_uuid: string;
  gallery_uuid: string;
};

const GallerySection = ({ userId }: { userId: string }) => {
  const [hoveredPictureIndex, setHoveredPictureIndex] = useState<number | null>(
    null,
  );
  const [selectedPictureId, setSelectedPictureId] = useState<string | null>(
    null,
  );
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { user } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleGalleryUpload = () => {
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data,
    refetch,
  } = useQuery({
    queryFn: fetchGallery,
    queryKey: ["gallery", userId],
  });

  useEffect(
    () => {
      setGallery(data);
    },
    [data],
  );

  const handleUploadButtonClick = async () => {
    setIsUploading(true);
    if (selectedFile && user) {
      const base64String = selectedFile.split(",")[1];
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
          },
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
  const queryClient = useQueryClient();
  const deletePhoto = useMutation({
    mutationFn: async () =>
      await uploadQueries.deleteGalleryPhoto(selectedPictureId!),
    onSuccess: () => {
      toast({
        title: "Photo successfuly deleted",
        variant: "success",
      });
      setSelectedPictureId(null);
      queryClient.invalidateQueries({
        queryKey: ["gallery"],
      });
    },
    onError: () => {
      console.log("Failed");
      toast({
        title: "Something went wrong!",
        description: "Cannot delete photo",
        variant: "destructive",
      });
    },
  });

  const handleDeletePhoto = async () => {
    if (selectedPictureId !== null) {
      deletePhoto.mutate();
    }
  };

  console.log(gallery);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full underline-0"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="px-5 py-1">
        <AccordionTrigger className="flex space-x-5 hover:no-underline">
          <div className="flex items-center space-x-5">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              Gallery
            </p>
            {selectedFile && (
              <div className="flex flex-row space-x-3 items-center w-1/2">
                <div className="truncate overflow-hidden">
                  <p className="text-slate-400 mt-1 ">
                    {/* Selected File: {typeof selectedFile === 'string' ? 'Base64 String' : selectedFile.name} */}
                  </p>
                </div>
                <X
                  size={15}
                  className="hover:cursor-pointer"
                  onClick={() => setSelectedFile(null)}
                />
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <div className="flex w-full justify-end">
            <DeleteDialog
              handleDelete={handleDeletePhoto}
              open={selectedPictureId !== null}
              setSelectedPictureIdNull={() => {
                setSelectedPictureId(null);
              }}
              isDeleting={deletePhoto.isLoading}
            />
            {parseInt(userId) === user!.member_id &&
              (
                <div
                  onClick={handleGalleryUpload}
                  className="flex w-max items-center rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
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
                  <p className="text-white text-sm">Add Photo</p>
                </div>
              )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center p-5 space-x-5">
              <div className="flex flex-row w-full space-x-5">
                {selectedFile && (
                  <div
                    onClick={handleUploadButtonClick}
                    className="flex items-center rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
                  >
                    <div className="text-white">
                      {isUploading
                        ? (
                          <div className="flex flex-row text-xs items-center space-x-5 text-green">
                            Uploading
                            <div className="ml-5 w-5 h-5 border-t-4 border-pink-500 border-solid rounded-full animate-spin">
                            </div>
                          </div>
                        )
                        : (
                          "Upload"
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 flex w-full">
              {gallery && gallery.length !== 0 &&
                gallery.map((pic: Gallery, index: number) => {
                  const path = getImagePathGallery(
                    pic.gallery_uuid,
                    null,
                    pic.member_uuid,
                  );
                  return (
                    <div
                      key={index}
                      onMouseOver={() => {
                        setHoveredPictureIndex(index);
                      }}
                      onMouseOut={() => {
                        setHoveredPictureIndex(null);
                      }}
                      className="border hover:cursor-pointer relative flex items-center justify-center"
                    >
                      <img
                        onClick={() => {
                          openImageViewer(index);
                        }}
                        key={index} // Don't forget to add a unique key to each image
                        src={path}
                        alt="test"
                        className="object-cover"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>,
                        ) => {
                          const imgElement = e.target as HTMLImageElement;
                          imgElement.src = sampleGalleryImage;
                        }}
                      />
                      {parseInt(userId) === user!.member_id &&
                        hoveredPictureIndex !== null &&
                        hoveredPictureIndex == index && (
                        <Button
                          variant={"ghost"}
                          className="
                     absolute right-2 top-1 w-12"
                          onClick={() => {
                            setSelectedPictureId(pic.gallery_id);
                          }}
                        >
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      )}
                    </div>
                  );
                })}
            </div>
            {gallery && gallery.length == 0 && (
              <div className="flex w-full items-center h-full justify-center">
                <p className="font-semibold text-lg">No photos</p>
              </div>
            )}
          </div>
          {isViewerOpen && gallery && gallery.length !== 0 && (
            <ImageViewer
              src={gallery.map((pic: {
                member_uuid: string;
                gallery_uuid: string;
              }) =>
                `https://muffin0.blob.core.windows.net/photos/${pic.member_uuid}/${pic.gallery_uuid}.jpg`
              )}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GallerySection;
