import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Drumstick, Dumbbell, Ruler, User2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/zustand/auth/user";

const AdditionalInformationForm = () => {
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const { bodyTypes, favoriteFoods } = selectOptions();
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
      <p className="font-semibold mb-2 ml-4">Children Preferences</p>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="hasChildren"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="hasChildren">
                        Has Children?
                      </FormLabel>
                      <Input
                        placeholder="Enter health"
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        className="outline-0 border border rounded-lg w-full py-3 px-5"
                        name="hasChildren"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="wantChildren"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="wantChildren"
                      >
                        Want Children?
                      </FormLabel>
                      <Input
                        placeholder="Enter health"
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        className="outline-0 border border rounded-lg w-full py-3 px-5"
                        name="wantChildren"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
      </div>
      <p className="font-semibold ml-4">Health</p>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="workout"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="weight">
                        Workout
                      </FormLabel>
                      <Input
                        placeholder="Enter Workout"
                        type="text"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        className="outline-0 border rounded-lg w-full py-3 px-5"
                        name="workout"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
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
                {data!.weight ? `${data!.weight} kg` : "Add Workout"}
              </p>
            </div>
          )}
      </div>
      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="disability"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-primary" htmlFor="disability">
                        disability
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Select body type"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bodyTypes &&
                            bodyTypes.map((data: BodyType) => {
                              const { body: disability, body_type_id } = data;
                              return (
                                <SelectItem
                                  value={disability}
                                  key={body_type_id}
                                >
                                  {disability}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="pets"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="pets"
                      >
                        Pets
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={""}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {favoriteFoods &&
                            favoriteFoods.map((data: FavoriteFood) => {
                              const {
                                favorite_food_name: favoriteFood,
                                favorite_food_id,
                              } = data;
                              return (
                                <SelectItem
                                  value={favoriteFood}
                                  key={favorite_food_id}
                                >
                                  {favoriteFood}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
                {data!.favoriteFood ? data!.favoriteFood : "Add Pets"}
              </p>
            </div>
          )}
      </div>
      <p className="font-semibold ml-4">Lifestyle</p>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="drinking"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="drinking"
                      >
                        Drinking
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Do you drink?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {favoriteFoods &&
                            favoriteFoods.map((data: FavoriteFood) => {
                              const {
                                favorite_food_name: favoriteFood,
                                favorite_food_id,
                              } = data;
                              return (
                                <SelectItem
                                  value={favoriteFood}
                                  key={favorite_food_id}
                                >
                                  {favoriteFood}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="smoking"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="smoking"
                      >
                        Smoking
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Do you smoke?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {favoriteFoods &&
                            favoriteFoods.map((data: FavoriteFood) => {
                              const {
                                favorite_food_name: favoriteFood,
                                favorite_food_id,
                              } = data;
                              return (
                                <SelectItem
                                  value={favoriteFood}
                                  key={favorite_food_id}
                                >
                                  {favoriteFood}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="livingStatus"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="livingStatus"
                      >
                        Living Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Select living status"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {favoriteFoods &&
                            favoriteFoods.map((data: FavoriteFood) => {
                              const {
                                favorite_food_name: favoriteFood,
                                favorite_food_id,
                              } = data;
                              return (
                                <SelectItem
                                  value={favoriteFood}
                                  key={favorite_food_id}
                                >
                                  {favoriteFood}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed
          ? (
            <div className="space-y-1 hover:cursor-pointer w-full items-center">
              <FormField
                name="car"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="car"
                      >
                        Car
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Select car"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {favoriteFoods &&
                            favoriteFoods.map((data: FavoriteFood) => {
                              const {
                                favorite_food_name: favoriteFood,
                                favorite_food_id,
                              } = data;
                              return (
                                <SelectItem
                                  value={favoriteFood}
                                  key={favorite_food_id}
                                >
                                  {favoriteFood}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={control}
              />
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
      </div>
    </div>
  );
};

export default AdditionalInformationForm;
