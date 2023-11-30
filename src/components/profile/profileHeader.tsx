import { useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { ProfileHeader as ProfileHeaderType } from "@/types/profileHeader";
import ProfileHeaderSkeleton from "./profileHeaderSkeleton";
import { Button } from "../ui/button";
import { CameraIcon, Loader2, MessageCircleIcon, Pencil } from "lucide-react";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import profileQuery from "@/queries/profile/profileHeader";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ActivateAccount from "@/pages/authenticatedPages/accountActivationPage";
import uploadQueries from "@/queries/uploading";
import { toast } from "../ui/use-toast";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { Link } from "wouter";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation,
  );
  const [showCamera, setShowCamera] = useState(false);
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const setHeaderValues = profileHeaderStore((state) => state.setHeaderValues);
  const fetchInitialData = async () =>
    await profileQuery.getProfileHeader(parseInt(userId));
  const user = useUserStore((state) => state.user);
  const toggleEditMode = profileAboutContentStore(
    (state) => state.toggleEditMode
  );
  const { formState } = useFormContext();
  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const isEditing = profileAboutContentStore((state) => state.editMode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { isLoading, isRefetching } = useQuery({
    queryKey: ["profileHeader", userId],
    queryFn: fetchInitialData,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    onSuccess: (data: ProfileHeaderType | null) => {
      if (data) {
        setHeaderValues(data);
      }
    },
  });

  const getConversationUuid = async () => {
    try {
      const res: {
        data: {
          recipient_id: number;
          conversation_id: number;
          gallery_uuid: string;
          gender: string;
          recipient_uuid: string;
          recipient_nickname: string;
          conversation_uuid: string;
        };
      } = await messagingQuery.getConversation(
        user!.member_id,
        parseInt(userId),
      );

      setSelectedConversation(
        user!.member_id,
        res.data.conversation_id,
        headerValues.gallery_uuid,
        res.data.gender,
        headerValues.member_uuid,
        headerValues.nickname!,
        res.data.conversation_uuid,
      );

      return res.data.conversation_uuid;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot create new conversation",
      });
      return null;
    }
  };

  useEffect(() => {
    getConversationUuid();
  }, [userId]);

  if (isLoading || isRefetching) {
    return <ProfileHeaderSkeleton />;
  }

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

  const handleProfilePhotoUpload = async () => {
    try {
      setIsUploading(true);
      const res = await uploadQueries.uploadProfilePicture(
        selectedFile!,
        user!.member_id,
      );
      console.log(res);
      setHeaderValues({
        ...headerValues,
        gallery_uuid: res.data[0].gallery_uuid,
      });
      toast({
        title: "Photo successfully updated",
        variant: "success",
      });
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <ActivateAccount />
      </DialogContent>
      <div className="items-start p-5 border-b w-full">
        <div className="flex justify-start items-start space-x-2">
          {
            <div className="flex flex-col justify-center items-center space-y-2">
              <Button
                variant={"ghost"}
                disabled={!isEditing || isUploading}
                type="button"
                onMouseOver={() => {
                  if (isEditing) setShowCamera(true);
                }}
                onMouseOut={() => {
                  if (isEditing) setShowCamera(false);
                }}
                className="relative disabled:opacity-100 h-full w-40 bg-transparent py-0 px-0"
                onClick={handleGalleryUpload}
              >
                {showCamera && <CameraIcon className="absolute" fill="pink" />}
                {isUploading &&
                  <Loader2 className="absolute animate-spin text-primary" />}
                <img
                  className={`select-none object-cover h-32 w-32 overflow-clip border-4 border-primary rounded-full`}
                  src={selectedFile ? selectedFile : getImagePath(
                    headerValues.gallery_uuid,
                    headerValues.gender,
                    headerValues.member_uuid?.toString(),
                  )}
                  alt="no image selected"
                />
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  className="invisible w-0 h-0"
                  ref={fileInputRef}
                />
              </Button>
              {isEditing && selectedFile && (
                <Button
                  disabled={isUploading}
                  onClick={handleProfilePhotoUpload}
                  type="button"
                  className="hover:bg-[#FF8AB3]/95 w-36 text-xs"
                >
                  Update Photo
                </Button>
              )}
            </div>
          }
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="w-42">
                {!isEditing && (
                  <div
                    className={`flex flex-row space-x-5 ${
                      !user!.is_active ? "pt-5 pl-3" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-[#171717] text-lg ">
                        {headerValues.nickname}
                      </p>
                      {!isEditing && (
                        <p
                          className={`text-[#727272] text-sm ${
                            !user!.is_active ? "pl-3" : ""
                          }`}
                        >
                          @{`${headerValues.nickname?.toLowerCase()}`}
                        </p>
                      )}
                    </div>
                    {userId !== user!.member_id.toString() && (
                      <Button
                        type="button"
                        className="text-xs border-primary hover:bg-primary px-2 py-1"
                      >
                        <Link className="flex" href="/messages">
                          <p className="flex">
                            Chat
                            <span>
                              <MessageCircleIcon className="h-4" />
                            </span>
                          </p>
                        </Link>
                      </Button>
                    )}
                    {!user!.is_active && (
                      <DialogTrigger>
                        <button
                          type="button"
                          className="rounded-full bg-green-300 px-4 py-2 text-xs text-green-600 border hover:text-white hover:bg-green-500"
                        >
                          Activate Account
                        </button>
                      </DialogTrigger>
                    )}
                  </div>
                )}
                {isEditing && (
                  <FormField
                    name="nickname"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-primary">
                            Nickname
                          </FormLabel>
                          <Input
                            placeholder="Enter nickname"
                            type="text"
                            defaultValue={field.value}
                            onChange={field.onChange}
                            className="outline-0 border border rounded-lg w-full py-3 px-5"
                            name="nickname"
                          />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}
              </div>
              {userId === user!.member_id.toString() && (
                <>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={
                          !formState.isDirty
                            ? () => {}
                            : () => {
                                // if (isEditing && !formState.isValid) {
                                //   toast({
                                //     variant: "destructive",
                                //     title: "Cannot save your profile",
                                //     description:
                                //       "Please make sure all the required fields are satisfied.",
                                //     duration: 4000,
                                //   });
                                // }
                              }
                        }
                        disabled={isSaving}
                        type={"submit"}
                        className={cn(
                          "text-xs rounded-2xl h-max",
                          "hover:bg-green-400/80 bg-green-400"
                        )}
                      >
                        <p>Save</p>
                      </Button>
                      <Button
                        type={"button"}
                        onClick={() => toggleEditMode()}
                        className={cn(
                          "text-xs rounded-2xl h-max",
                          "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80"
                        )}
                      >
                        <p>Cancel</p>
                      </Button>
                    </div>
                  )}
                  {!isEditing && (
                    <Button
                      type={"button"}
                      onClick={() => {
                        if (!isEditing) {
                          toggleEditMode();
                        }
                      }}
                      className={cn(
                        "text-xs rounded-2xl h-max",
                        "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80"
                      )}
                    >
                      <>
                        <Pencil className="h-4 mr-2" />
                        <span>Edit Profile</span>
                      </>
                    </Button>
                  )}
                </>
              )}
            </div>
            {!isEditing && user!.is_active && (
              <div className="h-full hidden lg:block">
                <div className="pt-5 flex w-full justify-start items-start flex-wrap text-xs space-x-2">
                  {headerValues.height && (
                    <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] p-2 mb-2">
                      {`${headerValues.height} cm`}
                    </p>
                  )}
                  {headerValues.gender && (
                    <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                      {headerValues.gender == "F" && "Female"}
                      {headerValues.gender == "M" && "Male"}
                    </p>
                  )}
                  {headerValues.maritalStatus && (
                    <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                      {headerValues.maritalStatus}
                    </p>
                  )}
                  {headerValues.country_name && (
                    <p className="rounded-full w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                      {headerValues.country_name}
                    </p>
                  )}
                  {headerValues.occupation_title && (
                    <p className="rounded-full w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                      {headerValues.occupation_title}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileHeader;
