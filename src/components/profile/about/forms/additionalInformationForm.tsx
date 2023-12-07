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
import {
  Car,
  Disability,
  Drink,
  HaveChildren,
  LivingStatus,
  Pets,
  Smoke,
  WantChildren,
  Workout,
} from "@/types/profile";
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
  const {
    haveChildren,
    wantChildren,
    workout,
    disability,
    pets,
    drink,
    smoke,
    livingStatus,
    car,
  } = selectOptions();
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
                name="haveChildren"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel
                        className="text-primary"
                        htmlFor="haveChildren"
                      >
                        Have Children?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Do you have children?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {haveChildren &&
                            haveChildren.map((data: HaveChildren) => {
                              return (
                                <SelectItem
                                  value={data.have_children_name}
                                  key={data.have_children_id}
                                >
                                  {data.have_children_name}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Do you want children?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wantChildren &&
                            wantChildren.map((data: WantChildren) => {
                              return (
                                <SelectItem
                                  value={data.want_children_name}
                                  key={data.want_children_id}
                                >
                                  {data.want_children_name}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={"Do you workout?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workout &&
                            workout.map((data: Workout) => {
                              return (
                                <SelectItem
                                  value={data.workout_name}
                                  key={data.workout_id}
                                >
                                  {data.workout_name}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
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
                            <SelectValue
                              placeholder={"Do you have a disability?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {disability &&
                            disability.map((data: Disability) => {
                              return (
                                <SelectItem
                                  value={data.disability_name}
                                  key={data.disability_id}
                                >
                                  {data.disability_name}
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
                              placeholder={"Do you have pets?"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pets &&
                            pets.map((data: Pets) => {
                              return (
                                <SelectItem
                                  value={data.pet_name}
                                  key={data.pet_id}
                                >
                                  {data.pet_name}
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
                          {drink &&
                            drink.map((data: Drink) => {
                              return (
                                <SelectItem
                                  value={data.drink_name}
                                  key={data.drink_id}
                                >
                                  {data.drink_name}
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
                          {smoke &&
                            smoke.map((data: Smoke) => {
                              return (
                                <SelectItem
                                  value={data.smoke_name}
                                  key={data.smoke_id}
                                >
                                  {data.smoke_name}
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
                          {livingStatus &&
                            livingStatus.map((data: LivingStatus) => {
                              return (
                                <SelectItem
                                  value={data.living_status}
                                  key={data.living_status_id}
                                >
                                  {data.living_status}
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
                          {car &&
                            car.map((data: Car) => {
                              return (
                                <SelectItem
                                  value={data.car_name}
                                  key={data.car_id}
                                >
                                  {data.car_name}
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
