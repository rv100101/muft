import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { FavoriteFood } from "@/types/profile";
import FavoriteFoodForm from "../profile/about/forms/favoriteFoodForm";

const FavoriteFoodStep = () => {
  const {
    setFavoriteFoods
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getFavoriteFoods(),
    refetchInterval: Infinity,
    queryKey: ["favoriteFoods"],
    onSuccess: (data: FavoriteFood[]) => {
      setFavoriteFoods(data);
    },
  });

  return (
    <div className="h-36 w-full sm:w-1/2">
      <FavoriteFoodForm />
    </div>
  )
}

export default FavoriteFoodStep;
