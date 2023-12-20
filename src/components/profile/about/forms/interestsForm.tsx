
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  BookOpenCheck,
} from "lucide-react";
import {
} from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import {
} from "@/components/ui/select";
import { useUserStore } from "@/zustand/auth/user";
import InterestField from "./interestField";

const InterestsForm = () => {
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const user = useUserStore((state) => state.user);
  if (isLoading) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <InterestField />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <BookOpenCheck
                color="#ff5c9d"
                size={30}
                className="hover:cursor-pointer mt-2 mr-3"
              />
              <div className="flex flex-col justify-start space-y-1">
                <p className="font-bold text-base text-primary">
                  {[
                    ...new Set(
                      data?.interest.map((interest) => interest.interest_name),
                    ),
                  ].join(", ") ?? "Add interests"}
                </p>
                <p className="text-[#727272] text-xs">Interests</p>
              </div>
            </div>
          )}
      </div>


    </div>
  );
};

export default InterestsForm;
