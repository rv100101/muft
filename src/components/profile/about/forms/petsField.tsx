import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Pets } from "@/types/profile";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import removeExistingData from "@/lib/removeExistingData";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import deleteMultiselectValuesStore from "@/zustand/profile/about/deleteMultiselectValues";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";

export default function PetsField() {
  const setDeleted = deleteMultiselectValuesStore(
    (state) => state.setPetsToDelete
  );
  const user = useUserStore((state) => state.user);
  const { control, watch, setValue } = useFormContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Pets[]>(watch("pets"));
  const [inputValue, setInputValue] = React.useState("");
  const { pets } = selectOptions();
  const [selectables, setSelectables] = React.useState<Pets[]>([]);
  const [t, i18n] = useTranslation();

  useUpdateEffect(() => {
    const selectables = removeExistingData(pets, selected, "pet_name");
    setSelectables(selectables);
  }, [selected, pets]);

  const [noPets, setNoPets] = React.useState(
    watch("pets").length !== 0 && watch("pets")[0].pet_id == "179"
  );

  const handleUnselect = React.useCallback(
    (framework: Pets) => {
      setSelected((prev) =>
        prev.filter((s) => s.pet_name !== framework.pet_name)
      );
      setDeleted(framework);
    },
    [setDeleted]
  );

  // const handleKeyDown = React.useCallback(
  //   (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     const input = inputRef.current;
  //     if (input) {
  //       if (e.key === "Delete" || e.key === "Backspace") {
  //         if (input.value === "") {
  //           setSelected((prev) => {
  //             const newSelected = [...prev];
  //             newSelected.pop();
  //             return newSelected;
  //           });
  //         }
  //       }
  //       // This is not a default behaviour of the <input /> field
  //       if (e.key === "Escape") {
  //         input.blur();
  //       }
  //     }
  //   },
  //   []
  // );

  const { trigger } = useFormContext();

  React.useEffect(() => {
    setValue("pets", selected, {
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger("pets");
  }, [selected, setValue, trigger]);

  useEffectOnce(() => {
    setSelected(watch("pets"));
  });

  React.useEffect(() => {
    if (noPets) {
      const noPet: Pets = {
        pet_id: "179",
        pet_name: "No pet",
        member_pet_id: 179,
      };
      setSelected([noPet]);
    }
  }, [noPets, setValue, setSelected]);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex items-center space-x-2",
          i18n.language == "ar" && "space-x-reverse"
        )}
      >
        <Checkbox
          checked={noPets}
          onCheckedChange={(checked) => {
            setNoPets(checked as boolean);
            setSelected([]);
          }}
          id="pets"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("memberDetails.noPets")}
        </label>
      </div>
      <FormField
        name="pets"
        control={control}
        render={() => {
          return (
            <FormItem>
              {/* <FormLabel className="text-primary" htmlFor="maritalStatus">
              Pets
            </FormLabel> */}
              <Command
                // onKeyDown={handleKeyDown}
                className="overflow-visible bg-transparent"
              >
                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <div className="flex gap-1 flex-wrap">
                    {selected.map((framework) => {
                      return (
                        <Badge
                          key={framework.pet_id}
                          className="bg-white dark:bg-[#3b0117] dark:text-white dark:border-[#df4798] border-primary border"
                          variant="secondary"
                        >
                          {framework.pet_name}
                          <button
                            disabled={noPets}
                            type="button"
                            className="ml-1 bg-white ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUnselect(framework);
                              }
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={() => handleUnselect(framework)}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground dark:bg-[#df4798] dark:rounded-full dark:text-[#3b0117]" />
                          </button>
                        </Badge>
                      );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                      disabled={noPets}
                      ref={inputRef}
                      value={inputValue}
                      onValueChange={setInputValue}
                      onBlur={() => setOpen(false)}
                      onFocus={() => setOpen(true)}
                      placeholder={t("memberDetails.petsPlaceholder")}
                      className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    "relative mt-2 lg:h-full",
                    !user?.profile_completed ? "h-full" : "h-screen"
                  )}
                >
                  {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                      <CommandGroup className="h-40 overflow-auto">
                        {selectables.map((framework) => {
                          return (
                            <CommandItem
                              key={framework.pet_id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                setInputValue("");
                                setSelected((prev) => [...prev, framework]);
                              }}
                              className={"cursor-pointer"}
                            >
                              {framework.pet_name}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </div>
                  ) : null}
                </div>
              </Command>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
