
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import {
} from "@/components/ui/form";
import FormSkeletonLoading from "./formSkeletonLoading";
import {
} from "@/components/ui/select";
import { useUserStore } from "@/zustand/auth/user";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { HaveChildren, MaritalStatus, WantChildren, } from "@/types/profile";
import { Baby, Laugh, Ribbon } from "lucide-react";
import { useFormContext } from "react-hook-form";
const MaritalStatusForm = () => {
  const { control } = useFormContext();
  const {
    maritalStatus, haveChildren, wantChildren
  } = selectOptions();
  const isLoading = profileAboutContentStore((state) => state.isLoading);
  const data = profileAboutContentStore((state) => state.data);
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
              name="maritalStatus"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="maritalStatus">
                      Marital Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select marital status"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatus.map((data: MaritalStatus) => {
                          const { marital_status_name, marital_status_id } =
                            data;
                          return (
                            <SelectItem
                              value={marital_status_name}
                              key={marital_status_id}
                            >
                              {marital_status_name}
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
            <Ribbon
              color="#ff569a"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data?.maritalStatus
                  ? data?.maritalStatus
                  : "Add Marital Status"}
              </p>
              <p className="text-[#727272] text-xs">Marital Status</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="haveChildren"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="haveChildren">
                      Have Children?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Do you have children?"} />
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Baby
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />

            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.haveChildren ? `${data!.haveChildren}` : "Add Children"}
              </p>
              <p className="text-[#727272] text-xs">Has Children</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between w-full px-5">
        {editMode || !user?.profile_completed ? (
          <div className="space-y-1 hover:cursor-pointer w-full items-center">
            <FormField
              name="wantChildren"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-primary" htmlFor="wantChildren">
                      Want Children?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Do you want children?"} />
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
        ) : (
          <div className="flex flex-row space-x-2 hover:cursor-pointer">
            <Laugh
              color="#ff5c9d"
              size={30}
              className="hover:cursor-pointer mt-2 mr-3"
            />
            <div className="flex flex-col justify-start space-y-1">
              <p className="font-bold text-base text-primary">
                {data!.wantChildren ? `${data!.wantChildren}` : "Want Children"}
              </p>
              <p className="text-[#727272] text-xs">Want Children</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaritalStatusForm;
