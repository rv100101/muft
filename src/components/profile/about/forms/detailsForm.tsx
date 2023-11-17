import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Drumstick,
  Dumbbell,
  MoreHorizontal,
  Ruler,
  User2,
} from "lucide-react";
import FormSkeletonLoading from "./formSkeletonLoading";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { BodyType, FavoriteFood } from "@/types/profile";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailsForm = () => {
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const { bodyTypes, favoriteFoods } = selectOptions();
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
  };
  const editMode = profileAboutContentStore((state) => state.editMode);
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
    <div className="flex flex-col w-full space-y-5 py-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer  w-full items-center">
              <Input
                type="text"
                value={data!.height}
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 text-[#FF599B] border border rounded-lg w-full py-3 px-5"
                name="height"
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Ruler
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.height ? `${data!.height} cm` : "Add Height"}
              </p>
            </div>
          )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
              <Input
                type="text"
                value={data!.weight}
                onChange={() => handleInputChange()}
                autoFocus
                className="outline-0 text-[#FF599B] border rounded-lg w-full py-3 px-5"
                name="weight"
              />
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Dumbbell
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.weight ? `${data!.weight} kg` : "Add Weight"}
              </p>
            </div>
          )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row items-center space-x-2 hover:cursor-pointer w-full">
              <Select name="bodyTypes">
                <SelectTrigger>
                  <SelectValue
                    placeholder={bodyTypes[0]?.body}
                  />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes &&
                    bodyTypes.map((data: BodyType) => {
                      const { body: bodyType, body_type_id } = data;
                      return (
                        <SelectItem
                          value={body_type_id.toString()}
                          key={body_type_id}
                        >
                          {bodyType}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <User2
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.bodyType ? data!.bodyType : "Add Body Type"}
              </p>
            </div>
          )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode
          ? (
            <div className="flex flex-row items-center space-x-2 hover:cursor-pointer w-full">
              <Select name="favoritesFoods">
                <SelectTrigger>
                  <SelectValue
                    placeholder={favoriteFoods[0]?.favorite_food_name}
                  />
                </SelectTrigger>
                <SelectContent>
                {favoriteFoods &&
                  favoriteFoods.map((data: FavoriteFood) => {
                    const {
                      favorite_food_name: favoriteFood,
                      favorite_food_id,
                    } = data;
                    return (
                      <option value={favorite_food_id} key={favorite_food_id}>
                        {favoriteFood}
                      </option>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )
          : (
            <div className="flex flex-row space-x-2 hover:cursor-pointer">
              <Drumstick
                color="#727272"
                size={20}
                className="hover:cursor-pointer"
              />
              <p className="text-[#727272]">
                {data!.favoriteFood ? data!.favoriteFood : "Add Favorite Food"}
              </p>
            </div>
          )}
        {!editMode && (
          <MoreHorizontal
            color="#727272"
            size={20}
            className="hover:cursor-pointer "
          />
        )}
      </div>
    </div>
  );
};

export default DetailsForm;
