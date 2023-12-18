import { useMutation, useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { ProfileHeader as ProfileHeaderType } from "@/types/profileHeader";
import ProfileHeaderSkeleton from "./profileHeaderSkeleton";
import { Button } from "../ui/button";
import {
  CameraIcon,
  Flag,
  FolderEdit,
  Heart,
  Loader2,
  MessageCircleIcon,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import profileQuery from "@/queries/profile/profileHeader";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import uploadQueries from "@/queries/uploading";
import { toast } from "../ui/use-toast";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { Link, useLocation } from "wouter";
import { useUserAvatar } from "@/zustand/auth/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import deleteMultiselectValuesStore from "@/zustand/profile/about/deleteMultiselectValues";
import { useEffectOnce } from "usehooks-ts";
import axiosQuery from "@/queries/axios";
import useHomepageViewStore from "@/zustand/home/homepageView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const [reportReason, setReportReason] = useState("");
  const [reportProcessing, setReportProcessing] = useState(false);

  const isLiked = useHomepageViewStore((state) => state.isLiked);
  const isFavored = useHomepageViewStore((state) => state.isFavored);
  const toggleIsFavored = useHomepageViewStore(
    (state) => state.toggleIsFavored
  );
  const toggleIsLiked = useHomepageViewStore((state) => state.toggleIsLiked);

  const [likeTriggered, toggleLikeIcon] = useState(false);
  const [favoriteTriggered, toggleFavoriteIcon] = useState(false);
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      toggleLikeIcon((prev) => !prev);
      toggleIsLiked();

      const res = await axiosQuery.post("/Like", {
        member: member,
        liked: liked,
      });
      return res.data;
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({
      member,
      favored,
    }: {
      member: number;
      favored: number;
    }) => {
      toggleFavoriteIcon((prev) => !prev);
      toggleIsFavored();

      const res = await axiosQuery.post("/Favorite", {
        member: member,
        favored: favored,
      });
      return res.data;
    },
  });
  const [location] = useLocation();
  const resetMultiselectDeletedItems = deleteMultiselectValuesStore(
    (state) => state.reset
  );
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation
  );
  const selectedConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const [showCamera, setShowCamera] = useState(false);
  const {
    headerValues,
    setHeaderValues,
    profileHeaderValues,
    setProfileHeaderValues,
  } = profileHeaderStore();

  const fetchInitialData = async () =>
    await profileQuery.getProfileHeader(parseInt(userId));

  const user = useUserStore((state) => state.user);
  const toggleEditMode = profileAboutContentStore(
    (state) => state.toggleEditMode
  );
  const setSelectedHistoryMemberId = useLatestConversationStore(
    (state) => state.setSelectedHistoryMemberId
  );
  const { formState } = useFormContext();
  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const isEditing = profileAboutContentStore((state) => state.editMode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const setAvatar = useUserAvatar((state) => state.setAvatar);

  useEffect(() => {
    return () => {
      setSelectedHistoryMemberId(null);
    };
  }, [setSelectedHistoryMemberId]);

  useEffectOnce(() => {
    if (
      location.startsWith("/profile") &&
      user!.member_id.toString() == userId &&
      profileHeaderValues !== null
    ) {
      setHeaderValues(profileHeaderValues);
    }
  });

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["profileHeader", userId],
    queryFn: fetchInitialData,
    refetchOnWindowFocus: false,
    onSuccess: (data: ProfileHeaderType | null) => {
      if (data) {
        if (location.startsWith("/members")) {
          setHeaderValues(data);
        }
        if (location.startsWith("/profile")) {
          setProfileHeaderValues(data);
          setHeaderValues(data);
        }
      }
    },
  });

  const getConversationUuid = useCallback(async () => {
    if (location.startsWith("/profile")) {
      return;
    }
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
        parseInt(userId)
      );
      setSelectedConversation(
        user!.member_id,
        res.data.conversation_id,
        headerValues!.gallery_uuid,
        headerValues!.gender!,
        res.data.recipient_uuid,
        res.data.recipient_nickname!,
        res.data.conversation_uuid
      );
      return res.data.conversation_uuid;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot create new conversation",
      });
      return null;
    }
  }, [headerValues, location, setSelectedConversation, user, userId]);

  useEffect(() => {
    if (headerValues) {
      getConversationUuid();
    }
    setSelectedHistoryMemberId(parseInt(userId));
  }, [userId, headerValues, setSelectedHistoryMemberId, getConversationUuid]);

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
        user!.member_id
      );
      setHeaderValues({
        ...headerValues!,
        gallery_uuid: res.data[0].gallery_uuid,
      });
      setProfileHeaderValues({
        ...profileHeaderValues!,
        gallery_uuid: res.data[0].gallery_uuid,
      });
      setAvatar(res.data[0].gallery_uuid);
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

  const handleReportSubmit = async (reported: number) => {
    try {
      console.log(reported);
      setReportProcessing(true);
      const res = await axiosQuery.post("/ReportAbuse", {
        member: user!.member_id,
        reported: reported,
        reason: reportReason,
      });

      // setReportProcessing(false);
      toast({
        title: "Reported",
        description: "Changes might take awhile to take effect.",
        // variant: "success",
      });

      if (res.data) {
        setReportProcessing(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (
    location.startsWith("/profile") &&
    profileHeaderValues == null &&
    (isLoading || isRefetching)
  ) {
    return <ProfileHeaderSkeleton />;
  }

  if (location.startsWith("/members") && (isLoading || isRefetching)) {
    return <ProfileHeaderSkeleton />;
  }

  // console.log("🎈: ", isFavored);
  // console.log("🎃: ", isLiked);
  // console.log("---------------");
  // console.log("🧨: ", favoriteTriggered);
  // console.log("🎑: ", likeTriggered);
  console.log("profile header vals: ", headerValues);
  return (
    <div className="items-start p-5 border-b w-full">
      <div className="flex justify-start items-start space-x-2">
        {
          <div className="flex flex-col justify-center items-center space-y-2">
            {
              <>
                {!isEditing && (
                  <Dialog>
                    <DialogTrigger>
                      <img
                        className={`select-none object-cover h-32 w-32 overflow-clip border-4 border-primary rounded-full`}
                        src={
                          selectedFile
                            ? selectedFile
                            : getImagePath(
                                headerValues!.gallery_uuid,
                                headerValues!.gender,
                                headerValues!.member_uuid?.toString()
                              )
                        }
                        alt="no image selected"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <img
                        className={`h-full w-full`}
                        src={
                          selectedFile
                            ? selectedFile
                            : getImagePath(
                                headerValues!.gallery_uuid,
                                headerValues!.gender,
                                headerValues!.member_uuid?.toString()
                              )
                        }
                        alt="no image selected"
                      />
                    </DialogContent>
                  </Dialog>
                )}
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
                  {isEditing && (
                    <img
                      className={`select-none object-cover h-32 w-32 overflow-clip border-4 border-primary rounded-full`}
                      src={
                        selectedFile
                          ? selectedFile
                          : getImagePath(
                              headerValues!.gallery_uuid,
                              headerValues!.gender,
                              headerValues!.member_uuid?.toString()
                            )
                      }
                      alt="no image selected"
                    />
                  )}
                  {showCamera && (
                    <CameraIcon className="absolute" fill="pink" />
                  )}
                  {isUploading && (
                    <Loader2 className="absolute animate-spin text-primary" />
                  )}
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    className="invisible w-0 h-0"
                    ref={fileInputRef}
                  />
                </Button>
              </>
            }
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
          <div className="flex lg:flex-row flex-col space-y-5 w-full justify-between">
            <div className="w-full">
              {!isEditing && (
                <div
                  className={`flex lg:flex-row flex-col lg:space-x-5 space-x-0 ${
                    !user!.is_active ? "pt-5 pl-3" : ""
                  }`}
                >
                  <div className="flex lg:flex-col lg:justify-start flex-row space-x-4 lg:space-x-0">
                    <div className="flex flex-row space-x-1">
                      <p className="font-semibold text-[#171717] text-lg ">
                        {`${headerValues!.nickname},`}
                      </p>
                      <p className="font-semibold text-primary text-lg">
                        {headerValues!.age}
                      </p>
                    </div>
                    {!isEditing && (
                      <p
                        className={
                          "mt-1 text-[#f0f9ff] border-[#075985] text-xs py-1 px-2 w-min rounded-md bg-[#38bdf8] hover:bg-[#38bdf8]/80"
                        }
                      >
                        Standard
                      </p>
                    )}
                  </div>
                  {userId !== user!.member_id.toString() && (
                    <div className="flex w-full lg:flex-row flex-col lg:justify-between lg:items-start lg:space-y-0 space-y-4 lg:pt-0 pt-5 lg:px-2">
                      <Button
                        disabled={!selectedConversation}
                        type="button"
                        className="text-xs border-primary hover:bg-primary px-2 py-1 lg:w-24 w-3/4"
                      >
                        <Link href="/messages">
                          <p className="flex">
                            <p>Chat</p>
                            <span>
                              <MessageCircleIcon className="h-4" />
                            </span>
                          </p>
                        </Link>
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          className="hover:ring-2 transition-all ring-primary"
                          variant={"outline"}
                          onClick={() =>
                            toggleLike.mutate({
                              member: user!.member_id,
                              liked: parseInt(userId),
                            })
                          }
                        >
                          {/* <p className="lg:inline hidden">Like</p> */}

                          <span>
                            <Heart
                              color="#FF599B"
                              fill={
                                isLiked && !likeTriggered
                                  ? "#FF599B"
                                  : !isLiked && likeTriggered
                                  ? "#FF599B"
                                  : "white"
                              }
                              className="ml-2 "
                            />
                          </span>
                        </Button>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="hover:ring-2 transition-all ring-primary"
                          onClick={() =>
                            toggleFavorite.mutate({
                              member: user!.member_id,
                              favored: parseInt(userId),
                            })
                          }
                        >
                          {/* <p className="lg:inline hidden">Favorite</p> */}

                          <span>
                            <Star
                              color="#FF599B"
                              className="ml-2"
                              fill={
                                isFavored && !favoriteTriggered
                                  ? "#FF599B"
                                  : !isFavored && favoriteTriggered
                                  ? "#FF599B"
                                  : "white"
                              }
                            />
                          </span>
                        </Button>
                        {/* more  */}
                        <Dialog>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                              <Button
                                type="button"
                                variant={"outline"}
                                className="hover:ring-2 transition-all ring-primary"
                              >
                                <span>
                                  <MoreHorizontal
                                    color="#FF599B"
                                    fill={
                                      isFavored && !favoriteTriggered
                                        ? "#FF599B"
                                        : !isFavored && favoriteTriggered
                                        ? "#FF599B"
                                        : "white"
                                    }
                                  />
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-24">
                              <DropdownMenuGroup>
                                <DropdownMenuItem>Block</DropdownMenuItem>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem>
                                    Report Abuse
                                  </DropdownMenuItem>
                                </DialogTrigger>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Report Abuse</DialogTitle>
                              <DialogDescription>
                                Help keep our platform safe and enjoyable. Use
                                this modal to quickly report any abusive content
                                or behavior.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                  id="member_id"
                                  value={userId}
                                  placeholder="member id"
                                  className="col-span-3"
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                  id="username"
                                  value={
                                    headerValues!.nickname
                                      ? headerValues!.nickname
                                      : ""
                                  }
                                  placeholder="username here"
                                  className="col-span-3"
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                  id="username"
                                  value={reportReason}
                                  onChange={(state) =>
                                    setReportReason(state.target.value)
                                  }
                                  placeholder="enter reason here"
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogTrigger asChild>
                                <Button
                                  type="submit"
                                  className="flex flex-row space-x-1"
                                  onClick={() =>
                                    handleReportSubmit(parseInt(userId))
                                  }
                                  disabled={reportProcessing}
                                >
                                  <p>
                                    {reportProcessing ? "Reporting" : "Report"}
                                  </p>{" "}
                                  <Flag size={15} />
                                </Button>
                              </DialogTrigger>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isEditing && (
                <FormField
                  name="nickname"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-primary">Nickname</FormLabel>
                        <Input
                          placeholder="Enter nickname"
                          type="text"
                          defaultValue={field.value}
                          onChange={field.onChange}
                          className="outline-0 border rounded-lg lg:w-1/2 w-full py-3 px-5"
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
                      Save
                      {isSaving && (
                        <span>
                          <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                        </span>
                      )}
                    </Button>
                    <Button
                      type={"button"}
                      onClick={() => {
                        toggleEditMode();
                        resetMultiselectDeletedItems();
                      }}
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
                      "text-xs rounded-2xl h-max lg:w-1/4 w-1/2",
                      "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80"
                    )}
                  >
                    <>
                      <FolderEdit className="h-4 mr-2" />
                      <span>Edit</span>
                    </>
                  </Button>
                )}
              </>
            )}
          </div>
          {!isEditing && user!.is_active && (
            <div className="h-full hidden lg:block mt-3">
              <div className="pt-5 flex w-full justify-start items-start flex-wrap text-xs space-x-2">
                {/* {headerValues.height && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] p-2 mb-2">
                    {`${headerValues!.height} cm`}
                  </p>
                )} */}
                {/* {headerValues.gender && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {headerValues!.gender == "F" && "Female"}
                    {headerValues!.gender == "M" && "Male"}
                  </p>
                )} */}
                {headerValues!.maritalStatus && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {headerValues!.maritalStatus}
                  </p>
                )}
                {headerValues!.country_name && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {headerValues!.country_name}
                  </p>
                )}
                {/* {headerValues.occupation_title && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {headerValues!.occupation_title}
                  </p>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
