import axiosQuery from "@/queries/axios";
import { useDetailsStore } from "@/zustand/profile/about/useDetailsStore";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Heart,
  MapPin,
  MoreHorizontal,
  Phone,
  PlusCircle,
} from "lucide-react";

type FavoriteFood = {
  authorized: boolean;
  ip_address: string;
  favorite_food_id: number;
  favorite_food_name: string;
};

type Interest = {
  authorized: boolean;
  ip_address: string;
  interest_id: number;
  interest_name: string;
};

const DetailsForm = () => {
  const { formData, setFormData, globalEditMode: editMode } = useDetailsStore();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // fetch select options
  const fetchFavoriteFood = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/FavoriteFoods",
      { member: 32 }
    );

    return response.data;
  };

  const fetchInterest = async () => {
    const response = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Interests",
      { member: 32 }
    );

    return response.data;
  };

  // useQuery instances
  const { data: favoriteFoods } = useQuery(
    ["favoriteFoods"],
    fetchFavoriteFood
  );
  const { data: Interests } = useQuery(["Interests"], fetchInterest);

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.appearance}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="appearance"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <MapPin
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.appearance}</p>
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.health}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="health"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Briefcase
              color="#727272"
              size={20}
              className="hover:cursor-pointer"
            />
            <p className="text-[#727272]">{formData.health}</p>
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <PlusCircle
              color="#FF599B"
              size={20}
              className="hover:cursor-pointer"
            />
            <input
              type="text"
              value={formData.lifestyle}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="lifestyle"
            />
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Heart color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.lifestyle}</p>
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
            {/* <input
              type="text"
              value={formData.interest}
              onChange={(e) => handleInputChange(e)}
              autoFocus
              className="outline-0 text-[#FF599B]"
              name="interest"
            /> */}
          </div>
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Phone color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.interest}</p>
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
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
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
              className="outline-0 text-[#FF599B]"
              name="favoriteFood"
            >
              <option value="" disabled>
                Select Favorite Food
              </option>
              {favoriteFoods.map((data: FavoriteFood) => {
                const { favorite_food_name: favoriteFood, favorite_food_id } =
                  data;
                return (
                  <option value={favoriteFood} key={favorite_food_id}>
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
            <Phone color="#727272" size={20} className="hover:cursor-pointer" />
            <p className="text-[#727272]">{formData.favoriteFood}</p>
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
