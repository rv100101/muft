import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { BookOpenCheck } from "lucide-react";
import {} from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import {} from "@/components/ui/select";
import { useUserStore } from "@/zustand/auth/user";
import InterestField from "./interestField";
import removeDuplicates from "@/lib/removeDulpicates";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const InterestsForm = () => {
  const [, i18n] = useTranslation();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  if ((isLoading && profileData == null) || isSaving) {
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
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <InterestField />
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <BookOpenCheck
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />

            <div className="flex  flex-col justify-start space-y-1">
              <p
                className={cn(
                  "font-bold flex-wrap text-base text-primary flex flex-row space-x-3",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                {removeDuplicates(data!.interest, "interest_name").map(
                  (interest) => (
                    <p className="border font-normal rounded-lg px-5 py-1 bg-[#ffdeeb] text-[#fe68a0] border-[#fe68a0] hover:bg-[#ffdeeb]/60 mb-5 flex flex-row space-x-2">
                      <p> {interest.interest_name}</p>
                    </p>
                  )
                ) ?? "Add  Interests"}
              </p>
              {/* <p className="text-[#727272] text-xs">Language</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestsForm;
