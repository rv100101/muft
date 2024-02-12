import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Drumstick } from "lucide-react";
import { } from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import { } from "@/components/ui/select";
import { useUserStore } from "@/zustand/auth/user";
import FavoriteFoodField from "./favoriteFoodsField";
import removeDuplicates from "@/lib/removeDulpicates";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const FavoriteFoodForm = () => {
  const [, i18n] = useTranslation();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const editMode = profileAboutContentStore((state) => state.editMode);
  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
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
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1  w-full items-center">
            <FavoriteFoodField />
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 ",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Drumstick
              color="#ff5c9d"
              size={30}
              className="mt-2 mr-3"
            />
            <div className="flex  flex-col justify-start space-y-1">
              <p
                className={cn(
                  "font-bold flex-wrap text-base text-primary flex flex-row space-x-3",
                  i18n.language == "ar" && "space-x-reverse"
                )}
              >
                {removeDuplicates(data!.favoriteFood, "favorite_food_name").map(
                  (fave) => (
                    <p className="border font-normal rounded-lg px-5 py-1 bg-[#ffdeeb] text-[#fe68a0] border-[#fe68a0] hover:bg-[#ffdeeb]/60 mb-5 flex flex-row space-x-2">
                      <p> {fave.favorite_food_name}</p>
                    </p>
                  )
                ) ?? "Add  favorite foods"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteFoodForm;
