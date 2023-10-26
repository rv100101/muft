// import { Skeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axiosQuery from "@/queries/axios";
// import { useUserStore } from "@/zustand/auth/user";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useQuery } from "@tanstack/react-query";
import {
  Drumstick,
  Dumbbell,
  MoreHorizontal,
  PlusCircle,
  Ruler,
  User2,
} from "lucide-react";

type FavoriteFood = {
  authorized: boolean;
  ip_address: string;
  favorite_food_id: number;
  favorite_food_name: string;
};

// type Interest = {
//   authorized: boolean;
//   ip_address: string;
//   interest_id: number;
//   interest_name: string;
// };

type BodyType = {
  authorized: boolean;
  ip_address: string;
  body_type_id: number;
  body: string;
};

const DetailsForm = () => {
  // const { user } = useUserStore();

  const { formData, setFormData, globalEditMode: editMode } = useDetailsStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const fetchInitialData = async () => {
  //   try {
  //     const response1 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetHeight",
  //       { member: user?.member_id }
  //     );

  //     const response2 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetWeight",
  //       { member: user?.member_id }
  //     );

  //     const response3 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetAppearance",
  //       { member: user?.member_id }
  //     );

  //     const response4 = await axiosQuery.post(
  //       "https://muffinfunction.azurewebsites.net/api/GetFavoriteFood",
  //       { member: user?.member_id }
  //     );

  //     const { height } = response1.data[0];

  //     const { weight } = response2.data[0];
  //     const { body_type_id } = response3.data;
  //     const { favorite_food_id } = response4.data[0];

  //     setFormData({
  //       ...formData,
  //       height: height,
  //       weight: weight,
  //       bodyType: body_type_id,
  //       favoriteFood: favorite_food_id,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // fetch select options
  const fetchFavoriteFood = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/FavoriteFoods",
      { member: 32 }
    );

    return response.data;
  };

  // const fetchInterest = async () => {
  //   const response = await axiosQuery.post(
  //     "https://muffinfunction.azurewebsites.net/api/Interests",
  //     { member: 32 }
  //   );

  //   return response.data;
  // };

  const fetchBodyTypes = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/BodyTypes"
      // { member: 32 }
    );

    return response.data;
  };

  // useQuery instances
  const { data: favoriteFoods } = useQuery(
    ["favoriteFoods"],
    fetchFavoriteFood
  );
  // const { data: Interests } = useQuery(["Interests"], fetchInterest);
  const { data: BodyTypes, isLoading } = useQuery(
    ["BodyTypes"],
    fetchBodyTypes
  );

  // const { isLoading: initialDataLoading } = useQuery(
  //   ["initialData"],
  //   fetchInitialData
  // );

  if (isLoading) {
    // return <>Loading...</>;
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
              value={formData.height}
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
              {formData.height ? `${formData.height} cm` : "Add Height"}
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
              value={formData.weight}
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
              {formData.weight ? `${formData.weight} kg` : "Add Weight"}
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
              value={formData.bodyType}
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
              value={formData.bodyType}
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
              {formData.bodyType ? formData.bodyType : "Add Body Type"}
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
              value={formData.interest}
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
              {formData.interest ? formData.interest : "Add Interests"}
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
              value={formData.favoriteFood}
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
              value={formData.favoriteFood}
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
              {formData.favoriteFood
                ? formData.favoriteFood
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
