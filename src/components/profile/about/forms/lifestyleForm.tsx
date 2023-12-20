import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
  Beer,
  CarTaxiFront,
  Cigarette,
  Home,
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
import {
  Car,
  Drink,
  LivingStatus,
  Smoke,

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

const LifestyleForm = () => {
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const {

    drink,
    smoke,
    livingStatus,
    car,
  } = selectOptions();
  const editMode = profileAboutContentStore((state) => state.editMode);
  const user = useUserStore((state) => state.user);

  const isSaving = profileAboutContentStore((state) => state.isSaving);
  const profileData = profileAboutContentStore(state => state.profileData);
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
              name="drinking"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="drinking">
                      Drinking
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Do you drink?"} />
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Beer
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.drinking ? data!.drinking : "Add Drink"}
              </p>
              <p className="text-[#727272] text-xs">Drinks Alcohol</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="smoking"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="smoking">
                      Smoking
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Do you smoke?"} />
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Cigarette
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.drinking ? data!.drinking : "Add Drink"}
              </p>
              <p className="text-[#727272] text-xs">Smokes Cigarette</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="livingStatus"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="livingStatus">
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Home
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.livingStatus ? data!.livingStatus : "Add Living Status"}
              </p>
              <p className="text-[#727272] text-xs">Living Status</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="car"
              render={({ field }) => {
                console.log(field);

                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="car">
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <CarTaxiFront
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.car ? data!.car : "Add Car"}
              </p>
              <p className="text-[#727272] text-xs">Has Car</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifestyleForm;
