import { Skeleton } from "@/components/ui/skeleton";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Drumstick,
  Dumbbell,
  MoreHorizontal,
  PlusCircle,
  Ruler,
  User2,
} from "lucide-react";
import { useState } from "react";

type FavoriteFood = {
  authorized: boolean;
  ip_address: string;
  favorite_food_id: number;
  favorite_food_name: string;
};

type BodyType = {
  authorized: boolean;
  ip_address: string;
  body_type_id: number;
  body: string;
};

const DetailsForm = () => {
  const isLoading = profileAboutContentStore(state => state.isLoading);
  const data = profileAboutContentStore(state => state.data);
  const handleInputChange = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
  };
  const [editMode] = useState(false);
  if (isLoading) {
    return (
      <div className="flex justify-start items-start space-x-4 w-full ml-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[400px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[375px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-5 py-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer  w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={data!.height}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="height"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Ruler color="#727272" size={20} className="hover:cursor-pointer" />
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
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer w-full items-center">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={data!.weight}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="weight"
            />
          </div>
        ) : (
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
        {editMode ? (
          <div className="flex flex-row items-center space-x-2 hover:cursor-pointer w-full">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={data!.bodyType}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="bodyType"
            >
              <option value="" disabled>
                Select Body Type
              </option>
              {BodyTypes &&
                BodyTypes.map((data: BodyType) => {
                  const { body: bodyType, body_type_id } = data;
                  return (
                    <option value={body_type_id} key={body_type_id}>
                      {bodyType}
                    </option>
                  );
                })}
            </select>
            {/* <input
              type="text"
              value={data!.bodyType}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="lifestyle"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <User2 color="#727272" size={20} className="hover:cursor-pointer" />
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

      {/* <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={data!.interest}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="Interests"
            >
              <option value="" disabled>
                Select Interest
              </option>
              {Interests.map((data: Interest) => {
                const { interest_name: interest, interest_id } = data;
                return (
                  <option value={interest} key={interest_id}>
                    {interest}
                  </option>
                );
              })}
            </select>

          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PersonStanding
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {data!.interest ? data!.interest : "Add Interests"}
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
      </div> */}

      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row items-center space-x-2 hover:cursor-pointer w-full">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <select
              // type="text"
              value={data!.favoriteFood}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B] border rounded-lg lg:w-3/4 w-full py-3 px-5"
              name="favoriteFood"
            >
              <option value="" disabled>
                Select Favorite Food
              </option>
              {favoriteFoods &&
                favoriteFoods.map((data: FavoriteFood) => {
                  const { favorite_food_name: favoriteFood, favorite_food_id } =
                    data;
                  return (
                    <option value={favorite_food_id} key={favorite_food_id}>
                      {favoriteFood}
                    </option>
                  );
                })}
            </select>
            {/* <input
              type="text"
              value={data!.favoriteFood}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="favoriteFood"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Drumstick
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">
              {data!.favoriteFood
                ? data!.favoriteFood
                : "Add Favorite Food"}
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

      {/*  */}
    </div>
  );
};

export default DetailsForm;
