import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { FavoriteFood } from "@/types/profile";
import FavoriteFoodForm from "../profile/about/forms/favoriteFoodForm";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { fieldNames } from "@/lib/formFieldKeys";
import onboardingStore from "@/zustand/profile/onboarding/onboardingStore";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Skeleton } from "../ui/skeleton";
import { useUserStore } from "@/zustand/auth/user";
import { useTranslation } from "react-i18next";

const FavoriteFoodStep = () => {
  const { setFavoriteFoods, favoriteFoods } = selectOptions();
  const user = useUserStore((state) => state.user);
  const [, i18n] = useTranslation();
  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext();

  const step = onboardingStore((state) => state.step);
  const values = useWatch({ name: fieldNames[step - 1] });

  useEffect(() => {
    if (step == 8) {
      trigger(
        Object.keys(dirtyFields).filter((key) => {
          return dirtyFields[key] === true;
        })
      );
    }
  }, [values, step, trigger, dirtyFields]);

  useQuery({
    queryFn: () =>
      profileContentQuery.editOptions.getFavoriteFoods(
        user!.member_id.toString(),
        i18n.language
      ),
    refetchInterval: Infinity,
    queryKey: ["favoriteFoods"],
    onSuccess: (data: FavoriteFood[]) => {
      setFavoriteFoods(data);
    },
  });

  const { setIsLoading, isLoading } = profileAboutContentStore();

  useEffect(() => {
    setIsLoading(favoriteFoods.length == 0);
  }, [favoriteFoods.length, setIsLoading]);

  return isLoading ? (
    <div className="grid w-full sm:w-3/4 sm:grid-rows-2 grid-flow-row sm:grid-cols-2 gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  ) : (
    <div className="h-36 w-full sm:w-3/4">
      <FavoriteFoodForm />
    </div>
  );
};

export default FavoriteFoodStep;
