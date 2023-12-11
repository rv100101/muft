import { getImagePathGallery } from "@/lib/images";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle, Trash2Icon } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import sampleGalleryImage from "../../../assets/profile/sample-gallery.png";
import NoContent from "@/assets/gallery/no-gallery.png";

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
    null
  );
  const [selectedPictureId, setSelectedPictureId] = useState<string | null>(
    null
  );
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading] = useState(false);
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

  const { data } = useQuery({
    queryFn: fetchGallery,
    queryKey: ["gallery", userId],
  });

  useEffect(() => {
    setGallery(data);
  }, [data]);

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

  const uploadPhoto = useMutation({
    mutationFn: async () =>
      await uploadQueries.uploadGalleryPhoto(selectedFile!, user!.member_id),
    onSuccess: () => {
      toast({
        title: "Photo successfuly uploaded",
        variant: "success",
      });
      setSelectedFile(null);
      queryClient.invalidateQueries({
        queryKey: ["gallery"],
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong!",
        description: "Cannot upload photo",
        variant: "destructive",
      });
    },
  });

  const handleDeletePhoto = () => {
    if (selectedPictureId !== null) {
      deletePhoto.mutate();
    }
  };

  const handleUploadPhoto = () => {
    if (selectedFile !== null) {
      uploadPhoto.mutate();
    }
  };

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
            {parseInt(userId) === user!.member_id && selectedFile == null && (
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
            {selectedFile !== null && (
              <Button
                type="button"
                variant={"outline"}
                className="border-primary"
                onClick={() => {
                  setSelectedFile(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center p-5 space-x-5">
              {selectedFile && (
                <div className="flex flex-col space-y-2 items-center justify-center w-full space-x-5">
                  <img src={selectedFile} />
                  <div
                    onClick={handleUploadPhoto}
                    className="flex items-center rounded-full bg-[#fe599b] px-3 py-2 space-x-2 hover:cursor-pointer"
                  >
                    <div className="text-white">
                      {isUploading ? (
                        <div className="flex flex-row text-xs items-center space-x-5 text-green">
                          Uploading
                          <div className="ml-5 w-5 h-5 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          className="h-4"
                          disabled={uploadPhoto.isLoading}
                        >
                          <p>Upload</p>
                          <span>
                            {uploadPhoto.isLoading && (
                              <Loader2 className="ml-2 w-min h-min animate-spin" />
                            )}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 flex w-full">
              {gallery &&
                gallery.length !== 0 &&
                gallery.map((pic: Gallery, index: number) => {
                  const path = getImagePathGallery(
                    pic.gallery_uuid,
                    null,
                    pic.member_uuid
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
                          e: React.SyntheticEvent<HTMLImageElement, Event>
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
                <img src={NoContent} className="p-5 mb-20" width={400} />
                {/* <p className="font-semibold text-lg">No photos</p> */}
              </div>
            )}
          </div>
          {isViewerOpen && gallery && gallery.length !== 0 && (
            <ImageViewer
              src={gallery.map(
                (pic: { member_uuid: string; gallery_uuid: string }) =>
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
