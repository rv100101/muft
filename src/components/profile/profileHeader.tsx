import { useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { ProfileHeader as ProfileHeaderType } from "@/types/profileHeader";
import ProfileHeaderSkeleton from "./profileHeaderSkeleton";
import { Button } from "../ui/button";
import { CameraIcon, Pencil } from "lucide-react";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import profileQuery from "@/queries/profile/profileHeader";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "../ui/use-toast";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const [showCamera, setShowCamera] = useState(false);
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const setHeaderValues = profileHeaderStore((state) => state.setHeaderValues);
  const fetchInitialData = async () =>
    await profileQuery.getProfileHeader(parseInt(userId));
  const user = useUserStore((state) => state.user);
  const toggleEditMode = profileAboutContentStore((state) =>
    state.toggleEditMode
  );
  const { formState } = useFormContext();
  const isEditing = profileAboutContentStore((state) => state.editMode);
  const { isLoading, isRefetching } = useQuery(
    {
      queryKey: ["profileHeader", userId],
      queryFn: fetchInitialData,
      refetchInterval: Infinity,
      refetchOnWindowFocus: false,
      onSuccess: (data: ProfileHeaderType | null) => {
        console.log(data);
        if (data) {
          console.log(data);
          setHeaderValues(data);
        }
      },
    },
  );

  if (isLoading || isRefetching) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="items-start p-5 border-b select-none w-full">
      <div className="flex flex-row space-x-5 items-center w-full justify-start ">
        <Button
          disabled={!isEditing}
          type="button"
          onMouseOver={() => {
            if (isEditing) {
              setShowCamera(true);
            }
          }}
          onMouseOut={() => {
            if (isEditing) {
              setShowCamera(false);
            }
          }}
          className="relative disabled:opacity-100 w-28 h-full rounded-full p-0"
        >
          {showCamera && <CameraIcon className="absolute" />}
          <img
            className={`user-drag-none rounded-full object-cover w-full h-full border-primary border-4 transition-all duration-300 filter`}
            src={getImagePath(
              headerValues.gallery_uuid,
              headerValues.gender,
              headerValues.member_uuid?.toString(),
            )}
            alt="no image selected"
          />
        </Button>
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div className="w-42">
              {!isEditing && (
                <p className="font-semibold text-[#171717] text-lg">
                  {headerValues.nickname}
                </p>
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
                          className="outline-0 border border rounded-lg w-full py-3 px-5"
                          name="nickname"
                        />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              {!isEditing &&
                (
                  <p className="text-[#727272] text-sm">
                    @{`${headerValues.nickname?.toLowerCase()}`}
                  </p>
                )}
            </div>
            {userId === user!.member_id.toString() &&
              (
                <>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          if (isEditing && !formState.isValid) {
                            toast({
                              variant: "destructive",
                              title: "Cannot save your profile",
                              description:
                                "Please make sure all the required fields are satisfied.",
                              duration: 1.5,
                            });
                          }
                        }}
                        type={"submit"}
                        className={cn(
                          "text-xs rounded-2xl h-max",
                          "hover:bg-green-400/80 bg-green-400",
                        )}
                      >
                        <p>Save</p>
                      </Button>
                      <Button
                        type={"button"}
                        onClick={() => toggleEditMode()}
                        className={cn(
                          "text-xs rounded-2xl h-max",
                          "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80",
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
                        "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80",
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
          {!isEditing && (
            <div className="h-full hidden lg:block">
              <div className="pt-5 flex w-full justify-start items-start flex-wrap text-xs space-x-2">
                <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] p-2 mb-2">
                  {`${headerValues.height} cm`}
                </p>
                <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                  {headerValues.gender == "F" && "Female"}
                  {headerValues.gender == "M" && "Male"}
                </p>{" "}
                <p className="rounded-md w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                  {headerValues.maritalStatus}
                </p>
                <p className="rounded-full w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                  {headerValues.country_name}
                </p>
                <p className="rounded-full w-max h-max bg-[#FFF2F7] text-[#FF599B] px-5 py-1 mb-2">
                  {headerValues.occupation_title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
