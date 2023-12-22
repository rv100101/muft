import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Brush, Dumbbell, EyeIcon, Ruler, Scissors, User2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { BodyArt, BodyType, Eye, Hair } from "@/types/profile";
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

const AppearanceForm = () => {
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const { bodyTypes, hair, bodyArts, eyes } = selectOptions();
  const editMode = profileAboutContentStore((state) => state.editMode);
  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore((state) => state.profileData);
  if ((isLoading && profileData == null) || isSaving) {
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
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="eyes"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="eyes">
                      Eyes
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select eye type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eyes &&
                          eyes.map((data: Eye, index: number) => {
                            const { eyes_name } = data;
                            return (
                              <SelectItem value={eyes_name} key={index}>
                                {eyes_name}
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
            <EyeIcon
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.eyes ? data!.eyes : "Add Eye Color"}
              </p>
              <p className="text-[#727272] text-xs">Eye Color</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="hair"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="hair">
                      Hair
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select hair"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hair &&
                          hair.map((data: Hair, index: number) => {
                            const { hair_name } = data;
                            return (
                              <SelectItem value={hair_name} key={index}>
                                {hair_name}
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
            <Scissors
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.hair ? data!.hair : "Add Haircut"}
              </p>
              <p className="text-[#727272] text-xs">Haircut</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
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
            <Ruler
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.height ? `${data!.height} cm` : "Add Height"}
              </p>
              <p className="text-[#727272] text-xs">Height</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
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
                      placeholder="Enter weight (lbs)"
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
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.weight ? `${data!.weight} kg` : "Add Weight"}
              </p>
              <p className="text-[#727272] text-xs">Weight</p>
            </div>
          </div>
        )}
      </div>
      {/* add new */}
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
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
            <User2
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.bodyType ? data!.bodyType : "Add Body Type"}
              </p>
              <p className="text-[#727272] text-xs">Body Type</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="bodyArt"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="bodyArt">
                      Body Art
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select body art"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bodyArts &&
                          bodyArts.map((data: BodyArt, index: number) => {
                            const { body } = data;

                            return (
                              <SelectItem value={body} key={index}>
                                {body}
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
            <Brush
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.bodyArt ? data!.bodyArt : "Add Body Art Type"}
              </p>
              <p className="text-[#727272] text-xs">Body Art Type</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceForm;
