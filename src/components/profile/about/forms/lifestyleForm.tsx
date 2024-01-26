import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Beer, CarTaxiFront, Cigarette, Home } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { Car, Drink, LivingStatus, Smoke } from "@/types/profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/zustand/auth/user";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const LifestyleForm = () => {
  const [t, i18n] = useTranslation();
  const { control } = useFormContext();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
  const { drink, smoke, livingStatus, car } = selectOptions();
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
    <div className={cn(
      "h-96 w-full",
      !user?.profile_completed && "h-full",
      !user?.profile_completed ? "grid grid-flow-row grid-cols-2 gap-2 sm:gap-4" : "flex flex-col space-y-4"
    )}
    >
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="drinking"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="drinking">
                      {t("memberDetails.drinking")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Do you drink?" : "يرجى الاختيار"}
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
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Beer
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.drinking ? data!.drinking : "Add Drink"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.drinkingAlcohol")}
              </p>
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
                      {t("memberDetails.smoking")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Do you smoke?" : "يرجى الاختيار"}
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
        ) : (
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Cigarette
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.drinking ? data!.drinking : "Add Drink"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.smokingCigarette")}
              </p>
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
                      {t("memberDetails.livingStatus")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select living status" : "يرجى الاختيار"}
                          />
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <Home
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.livingStatus ? data!.livingStatus : "Add Living Status"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.livingStatus")}
              </p>
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
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="car">
                      {t("memberDetails.car")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={i18n.language == 'en' ? "Select car" : "يرجى الاختيار"}
                          />
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
          <div
            className={cn(
              "flex flex-row space-x-2 hover:cursor-pointer",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <CarTaxiFront
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.car ? data!.car : "Add Car"}
              </p>
              <p className="text-[#727272] text-xs">
                {t("memberDetails.hasCar")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifestyleForm;
