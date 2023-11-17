import { useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/lib/images";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { ProfileHeader as ProfileHeaderType } from "@/types/profileHeader";
import ProfileHeaderSkeleton from "./profileHeaderSkeleton";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import profileQuery from "@/queries/profile/profileHeader";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const setHeaderValues = profileHeaderStore((state) => state.setHeaderValues);
  const fetchInitialData = async () =>
    await profileQuery.getProfileHeader(parseInt(userId));
  const user = useUserStore((state) => state.user);
  const toggleEditMode = profileAboutContentStore((state) => state.toggleEditMode);
  const isEditing = profileAboutContentStore(state => state.editMode);
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
      <div className="flex flex-row space-x-5 items-center justify-start w-full justify-start ">
        <img
          className={`user-drag-none rounded-full object-cover h-28 border-primary border-4 transition-all duration-300 filter`}
          src={getImagePath(
            headerValues.gallery_uuid,
            headerValues.gender,
            headerValues.member_uuid?.toString(),
          )}
          alt="no image selected"
        />
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div>
              <p className="font-semibold text-[#171717] text-lg">
                {headerValues.nickname}
              </p>
              <p className="text-[#727272] text-sm">
                @{`${headerValues.nickname?.toLowerCase()}`}
              </p>
            </div>
            {userId === user!.member_id.toString() && (
              <Button
                type={isEditing ? "button" : "submit"}
                onClick={() => {
                  toggleEditMode()
                }}
                className={cn(
                  "text-xs rounded-2xl h-max",
                  isEditing
                    ? "hover:bg-green-400/80 bg-green-400"
                    : "text-[#727272] bg-[#E8ECEF] hover:bg-[#E8ECEF]/80",
                )}
              >
                {!isEditing && (
                  <>
                    <Pencil className="h-4 mr-2" />
                    <span>Edit Profile</span>
                  </>
                )}
                {isEditing && <p>Save</p>}
              </Button>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
