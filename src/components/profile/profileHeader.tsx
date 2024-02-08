import { useMutation } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
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
  X,
} from "lucide-react";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
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
import { useUpdateEffect } from "usehooks-ts";
import axiosQuery from "@/queries/axios";
import useHomepageViewStore from "@/zustand/home/homepageView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "../ui/textarea";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";

type FormDataType = {
  reason: string;
  reportedId: string;
};

const ProfileHeader = ({ userId }: { userId: string }) => {
  const [t, i18n] = useTranslation();
  const setView = useMobileMessagingViewStore((state) => state.setView);
  const [reportProcessing, setReportProcessing] = useState(false);
  const setEditModeFalse = profileAboutContentStore(
    (state) => state.setEditModeFalse
  );
  const formik = useFormik({
    initialValues: {
      reason: "",
      reportedId: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Field must only contain letters A-Z")
        .required("Field is required")
        .max(50, "Reason must not exceed 50 characters"),
    }),
    onSubmit: (values: FormDataType) => handleReportSubmit(values),
  });

  const toggleIsFavored = useHomepageViewStore(
    (state) => state.toggleIsFavored
  );
  const toggleIsLiked = useHomepageViewStore((state) => state.toggleIsLiked);
  const setIsFinished = onboardingStore((state) => state.setIsFinished);
  // const [likeTriggered, toggleLikeIcon] = useState(false);
  const [favoriteTriggered, toggleFavoriteIcon] = useState(false);
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      // toggleLikeIcon((prev) => !prev);
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
    data,
    isLoading,
    setData,
    setProfileData,
    profileData,
    editMode: isEditing,
    isSaving,
  } = profileAboutContentStore();
  // const fetchInitialData = async () =>

  const [isLiked, setIsLiked] = useState(
    data?.is_liked == "0" ? "0" : data?.is_liked
  );
  const [isBlocked, setIsBlocked] = useState(
    data?.is_blocked == "0" ? "0" : data?.is_blocked
  );
  const [isFavored, setIsFavored] = useState(
    data?.is_favored == "0" ? "0" : data?.is_favored
  );

  useEffect(() => {
    setIsLiked(data?.is_liked == "0" ? "0" : data?.is_liked);
    setIsFavored(data?.is_favored == "0" ? "0" : data?.is_favored);
    setIsBlocked(data?.is_blocked == "0" ? "0" : data?.is_blocked);
  }, [data]);

  //   await profileQuery.getProfileHeader(parseInt(userId));

  const user = useUserStore((state) => state.user);
  const toggleEditMode = profileAboutContentStore(
    (state) => state.toggleEditMode
  );
  const setSelectedHistoryMemberId = useLatestConversationStore(
    (state) => state.setSelectedHistoryMemberId
  );

  const { formState } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const setAvatar = useUserAvatar((state) => state.setAvatar);

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
        data?.gallery_uuid ?? null,
        data!.gender,
        res.data.recipient_uuid,
        res.data.recipient_nickname!,
        res.data.conversation_uuid
      );
      return res.data.conversation_uuid;
    } catch (error) {
      console.log(error);
    }
  }, [data, location, setSelectedConversation, user, userId]);

  useEffect(() => {
    if (data) {
      getConversationUuid();
    }
    // setSelectedHistoryMemberId(parseInt(userId));
  }, [userId, data, setSelectedHistoryMemberId, getConversationUuid]);

  const handleGalleryUpload = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Check if the selected file is an image (you can enhance this check)
    const allowedImageTypes = ["image/jpeg", "image/png"];
    if (file) {
      const reader = new FileReader();
      if (!allowedImageTypes.includes(file?.type)) {
        toast({
          title: t("alert.selectValidImageFile"),
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      reader.onloadend = () => {
        const base64String = reader.result as string; // Result is a data URL
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  useUpdateEffect(() => {
    if (selectedFile) {
      handleProfilePhotoUpload();
    }
  }, [selectedFile]);

  const handleProfilePhotoUpload = async () => {
    try {
      setIsUploading(true);

      // Check if a file is selected
      if (!selectedFile) {
        // Handle the case where no file is selected
        toast({
          title: t("alert.selectFileToUpload"),
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      const res = await uploadQueries.uploadProfilePicture(
        selectedFile,
        user!.member_id
      );
      setData({
        ...data!,
        gallery_uuid: res.data[0].gallery_uuid,
      });
      setProfileData({
        ...profileData!,
        gallery_uuid: res.data[0].gallery_uuid,
      });
      setAvatar(res.data[0].gallery_uuid);
      toast({
        title: t("alert.photoSuccessfullyUpdated"),
        variant: "success",
      });
      setEditModeFalse();
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReportSubmit = async ({ reason }: FormDataType) => {
    try {
      setReportProcessing(true);
      const res = await axiosQuery.post("/ReportAbuse", {
        member: user!.member_id,
        reported: userId,
        reason: reason,
      });
      console.log(
        "🚀 ~ file: profileHeader.tsx:292 ~ handleReportSubmit ~ res:",
        res
      );

      // setReportProcessing(false);
      toast({
        title: t("alerts.reported"),
        description: t("alerts.changesTakeAwhile"),
        // variant: "success",
      });

      if (res.data) {
        setReportProcessing(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleBlockMember = async (blocked: number) => {
    try {
      const res = await axiosQuery.post("/Block", {
        member: user!.member_id,
        blocked: blocked,
      });

      // setReportProcessing(false);

      if (res.data) {
        toast({
          title: t("alerts.userBlocked"),
          description: t("alerts.changesTakeAwhile"),
          variant: "success",
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (isLoading && location.startsWith("/members")) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <ProfileHeaderSkeleton />
        </div>
      </div>
    );
  }

  if (isLoading && location.startsWith("/profile") && profileData == null) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <ProfileHeaderSkeleton />
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="items-start py-5 sm:p-5 border-b w-full">
      <div
        className={cn(
          "flex justify-start items-start space-x-2",
          i18n.language == "ar" && "space-x-reverse"
        )}
      >
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
                                data?.gallery_uuid,
                                data?.gender[0] ?? null,
                                data!.member_uuid?.toString()
                              )
                        }
                        alt="no image selected"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-row justify-end">
                        <DialogClose>
                          <X className="hover:cursor-pointer" size={20} />
                        </DialogClose>
                      </DialogHeader>
                      <img
                        className={`h-full object-cover max-h-96 sm:max-h-[500px] w-full`}
                        src={
                          selectedFile
                            ? selectedFile
                            : getImagePath(
                                data!.gallery_uuid,
                                data?.gender[0] ?? null,
                                data!.member_uuid?.toString()
                              )
                        }
                        alt="no image selected"
                      />
                      <div
                        className={cn(
                          "flex justify-center font-semibold text-2xl",
                          i18n.language == "ar"
                            ? "space-x-reverse space-x-1"
                            : "space-x-1"
                        )}
                      >
                        <p className=" whitespace-nowrap">{data?.nickname}, </p>
                        <p> {`${data?.age}`}</p>
                      </div>
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
                      className={`z-10 select-none object-cover h-32 w-32 overflow-clip border-4 border-primary rounded-full`}
                      src={
                        selectedFile
                          ? selectedFile
                          : getImagePath(
                              data!.gallery_uuid,
                              data!.gender,
                              data!.member_uuid?.toString()
                            )
                      }
                      alt="no image selected"
                    />
                  )}
                  {showCamera && (
                    <CameraIcon className="absolute" fill="pink" />
                  )}
                  {/* {isUploading && (
                    <Loader2 className="absolute animate-spin text-primary" />
                  )} */}
                  {isUploading && (
                    <Skeleton className="absolute z-40 h-32 w-32 rounded-full" />
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
            {
              <p
                className={
                  "sm:hidden text-[#f0f9ff] border-[#075985] text-xs py-1 px-2 w-min rounded-md bg-[#38bdf8] hover:bg-[#38bdf8]/80"
                }
              >
                Standard
              </p>
            }
          </div>
        }
        <div className="w-full">
          <div className="flex lg:flex-row flex-col space-y-5 w-full justify-between">
            <div className="w-full">
              {
                <div
                  className={`flex lg:flex-row flex-col lg:space-x-5 space-x-0 ${
                    !user!.is_active ? "pt-5 pl-3" : ""
                  }`}
                >
                  <div className="flex lg:flex-col lg:justify-start flex-row space-x-4 lg:space-x-0">
                    <div className="flex flex-col space-x-1">
                      <div
                        className={cn(
                          "flex items-center space-x-1",
                          i18n.language == "ar" && "space-x-reverse"
                        )}
                      >
                        <div className="flex">
                          <p className="font-semibold text-[#171717] whitespace-nowrap text-sm sm:text-lg dark:text-white">
                            {data!.nickname}
                          </p>
                          <p>,</p>
                        </div>
                        <p className="font-semibold text-primary sm:text-lg">
                          {data!.age}
                        </p>
                      </div>
                    </div>
                    {
                      <p
                        className={
                          "hidden sm:block mt-1 text-[#f0f9ff] border-[#075985] text-xs py-1 px-2 w-min rounded-md bg-[#38bdf8] hover:bg-[#38bdf8]/80"
                        }
                      >
                        {t("memberDetails.standard")}
                      </p>
                    }
                  </div>
                  {userId !== user!.member_id.toString() && (
                    <div className="flex w-full lg:flex-row flex-col lg:justify-between lg:items-start lg:space-y-0 space-y-4 lg:pt-0 pt-1 sm:pt-5 lg:px-2">
                      <Button
                        disabled={!selectedConversation}
                        onClick={() => {
                          if (user?.temporarily_deactivated) {
                            toast({
                              title: t("alerts.reactivateYourAccount"),
                              description: t("alerts.continueChattingWith"),
                              variant: "destructive",
                            });
                          }
                        }}
                        type="button"
                        className="text-xs border-primary hover:bg-primary px-2 py-1 lg:w-24 w-min sm:w-3/4 dark:bg-[#ae2e51] dark:text-white"
                      >
                        <Link
                          onClick={() => {
                            setView("CHAT-MESSAGES");
                            setSelectedHistoryMemberId(parseInt(userId));
                          }}
                          href={
                            !user?.temporarily_deactivated ? "/messages" : ""
                          }
                        >
                          <div
                            className={cn(
                              "flex w-min",
                              i18n.language == "ar" && "flex-row-reverse"
                            )}
                          >
                            <p>{t("memberDetails.chat")}</p>
                            <span>
                              <MessageCircleIcon className="h-4" />
                            </span>
                          </div>
                        </Link>
                      </Button>
                      <div
                        className={cn(
                          "flex space-x-2",
                          i18n.language == "ar" && "space-x-reverse"
                        )}
                      >
                        <Button
                          type="button"
                          className="hover:ring-2 px-2 py-1 sm:py-2 sm:px-4  transition-all ring-primary"
                          variant={"outline"}
                          onClick={() => {
                            toggleLike.mutate({
                              member: user!.member_id,
                              liked: parseInt(userId),
                            });
                            setIsLiked(isLiked == "0" ? "1" : "0");
                            setData({
                              ...data!,
                              is_liked: isLiked == "0" ? "1" : "0",
                            });
                          }}
                        >
                          <Heart
                            color="#FF599B"
                            fill={isLiked !== "0" ? "#FF599B" : "white"}
                          />
                        </Button>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="hover:ring-2 px-2 py-1 sm:py-2 sm:px-4  transition-all ring-primary"
                          onClick={() => {
                            toggleFavorite.mutate({
                              member: user!.member_id,
                              favored: parseInt(userId),
                            });
                            setIsFavored(isFavored == "0" ? "1" : "0");
                            setData({
                              ...data!,
                              is_favored: isFavored == "0" ? "1" : "0",
                            });
                          }}
                        >
                          <Star
                            color="#FF599B"
                            fill={isFavored !== "0" ? "#FF599B" : "white"}
                          />
                        </Button>
                        {/* more  */}
                        <Dialog>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="rounded-md h-10 px-2 sm:px-4 py-1 sm:py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:ring-2 transition-all ring-primary">
                              <span>
                                <MoreHorizontal
                                  color="#FF599B"
                                  fill={favoriteTriggered ? "#FF599B" : "white"}
                                />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-24">
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleBlockMember(parseInt(userId));
                                    setIsBlocked(isBlocked == "0" ? "1" : "0");
                                    setData({
                                      ...data!,
                                      is_blocked: isBlocked == "0" ? "1" : "0",
                                    });
                                  }}
                                >
                                  {isBlocked !== "0"
                                    ? t("memberDetails.unblock")
                                    : t("memberDetails.block")}
                                </DropdownMenuItem>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem>
                                    {t("memberDetails.reportAbuse")}
                                  </DropdownMenuItem>
                                </DialogTrigger>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <div className="flex flex-row justify-between items-end pb-5">
                                <DialogTitle>Report Abuse</DialogTitle>
                                <DialogClose>
                                  <X
                                    className="hover:cursor-pointer"
                                    size={20}
                                  />
                                </DialogClose>
                              </div>
                              <DialogDescription>
                                Help keep our platform safe and enjoyable. Use
                                this modal to quickly report any abusive content
                                or behavior.
                              </DialogDescription>
                            </DialogHeader>
                            <div>
                              {/* report abuse form */}
                              <form
                                action="post"
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col space-y-5 justify-center items-start"
                              >
                                {/* <Input
                                  id="member_id"
                                  value={userId}
                                  name="reportedId"
                                  onChange={formik.handleChange}
                                  className="col-span-3 w-80"
                                  disabled
                                  max={50}
                                /> */}
                                <Input
                                  id="username"
                                  value={data!.nickname ? data!.nickname : ""}
                                  onChange={formik.handleChange}
                                  name="username"
                                  placeholder="username"
                                  className="col-span-3 w-80"
                                  disabled
                                />
                                <Textarea
                                  id="reason"
                                  {...formik.getFieldProps("reason")}
                                  onChange={formik.handleChange}
                                  name="reason"
                                  placeholder="enter reason here"
                                  className={`col-span-3 w-80 h-32 ring-0  ${
                                    formik.touched.reason &&
                                    formik.errors.reason
                                      ? "border-rose-500"
                                      : ""
                                  }`}
                                />
                                {formik.touched.reason &&
                                formik.errors.reason ? (
                                  <div className="error text-sm text-red-500 ml-5">
                                    {formik.errors.reason}
                                  </div>
                                ) : null}
                                <DialogFooter>
                                  {/* <DialogTrigger asChild> */}
                                  <Button
                                    type="submit"
                                    className="flex flex-row space-x-1 float-right hover:bg-[#ff569a]/90"
                                    disabled={reportProcessing}
                                  >
                                    <p>
                                      {reportProcessing ? (
                                        <Loader2 className="ml-2 h-full w-full animate-spin" />
                                      ) : (
                                        "Report"
                                      )}
                                    </p>
                                    <Flag size={15} />
                                  </Button>
                                  {/* </DialogTrigger> */}
                                </DialogFooter>
                              </form>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  )}
                </div>
              }
              {/* {isEditing && (
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
              )} */}
            </div>
            {userId === user!.member_id.toString() && (
              <>
                {" "}
                {isEditing && (
                  <div
                    className={cn(
                      "flex space-x-2",
                      i18n.language == "ar" && "space-x-reverse"
                    )}
                  >
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
                              setIsFinished(true);
                            }
                      }
                      disabled={isSaving || isUploading}
                      type={"submit"}
                      className={cn(
                        "text-xs rounded-2xl h-max",
                        "hover:bg-green-400/80 bg-green-400"
                      )}
                    >
                      <p>{t("general.save")}</p>
                      {isSaving && (
                        <span>
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </span>
                      )}
                    </Button>
                    {!isSaving && (
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
                        <p>{t("forgotPassword.cancel")}</p>
                      </Button>
                    )}
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
                      <FolderEdit
                        className={cn(
                          "h-4 mr-2",
                          i18n.language == "ar" && "transform -scale-x-100"
                        )}
                      />
                      <span>{t("memberDetails.edit")}</span>
                    </>
                  </Button>
                )}
              </>
            )}
          </div>
          {!isEditing && user!.is_active && (
            <div className="h-full hidden lg:block mt-3">
              <div
                className={cn(
                  "pt-5 flex w-full justify-start items-start flex-wrap text-xs space-x-2",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                {/* {data.height && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] p-2 mb-2">
                    {`${data!.height} cm`}
                  </p>
                )} */}
                {/* {data.gender && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {data!.gender == "F" && "Female"}
                    {data!.gender == "M" && "Male"}
                  </p>
                )} */}
                {data!.maritalStatus && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2 dark:bg-[#3b0117]">
                    {data!.maritalStatus}
                  </p>
                )}
                {data!.country && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2 dark:bg-[#3b0117]">
                    {data!.country}
                  </p>
                )}
                {/* {data.occupation_title && (
                  <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-2 mb-2">
                    {data!.occupation_title}
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
