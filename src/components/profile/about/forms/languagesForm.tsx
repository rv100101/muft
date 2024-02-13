import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { LanguagesIcon } from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";

import LanguageField from "./languageField";
import { useTranslation } from "react-i18next";
const LanguagesForm = () => {
  const [, i18n] = useTranslation();
  const { data, editMode, isLoading, profileData } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  if ((isLoading && profileData == null && user?.profile_completed) || isSaving) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <FormSkeletonLoading rows={7} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full space-y-4",
        // !user?.profile_completed && "h-full"
      )}
    >
      <div className="flex h-full flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 h-full  w-full items-center">
            <LanguageField />
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <LanguagesIcon
              color="#ff569a"
              size={30}
              className=" mt-2 mr-3"
            />
            <div className="flex  flex-col justify-start space-y-1">
              <p
                className={cn(
                  "font-bold flex-wrap text-base text-primary flex flex-row",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                {[
                  ...new Set(
                    data?.language.map((lang, index: number) => (
                      <p key={index} className="border font-normal rounded-lg mx-3 px-5 py-1 bg-[#ffdeeb] text-[#fe68a0] border-[#fe68a0] hover:bg-[#ffdeeb]/60 mb-5 flex flex-row space-x-2">
                        <p> {lang.language_name}</p>
                      </p>
                    ))
                  ),
                ] ?? "Add languages"}
              </p>
              {/* <p className="text-[#727272] text-xs">Language</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;
