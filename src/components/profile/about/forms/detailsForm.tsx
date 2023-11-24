import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Drumstick,
  Dumbbell,
  MoreHorizontal,
  Ruler,
  User2,
} from "lucide-react";
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

const DetailsForm = () => {
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const { bodyTypes, favoriteFoods } = selectOptions();
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
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="height"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="height">
                      Height
                    </FormLabel>
                    <Input
                      placeholder="Enter height (cm)"
                      type="number"
                      onChange={(e) => {
                        if (
                          e.target.value !== "" &&
                          typeof parseInt(e.target.value) === "number"
                        ) {
                          field.onChange(parseInt(e.target.value));
                        }
                      }}
                      value={field.value}
                      defaultValue={field.value}
                      className="outline-0 border border rounded-lg w-full py-3 px-5"
                      name="height"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
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
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="weight"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="weight">
                      Weight
                    </FormLabel>
                    <Input
                      placeholder="Enter weight (kg)"
                      type="number"
                      onChange={(e) => {
                        if (
                          e.target.value !== "" &&
                          typeof parseInt(e.target.value) === "number"
                        ) {
                          field.onChange(parseInt(e.target.value));
                        }
                      }}
                      defaultValue={field.value}
                      className="outline-0 border rounded-lg w-full py-3 px-5"
                      name="weight"
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
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
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="bodyType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="bodyType">
                      Body Type
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
                            const { body: bodyType, body_type_id } = data;
                            return (
                              <SelectItem value={bodyType} key={body_type_id}>
                                {bodyType}
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
      </div>{" "}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="favoriteFood"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="favoriteFood">
                      Favorite Food
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select favorite food"} />
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
        ) : (
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
