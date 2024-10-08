import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Interest } from "@/types/profile";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import removeExistingData from "@/lib/removeExistingData";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import deleteMultiselectValuesStore from "@/zustand/profile/about/deleteMultiselectValues";
import { useTranslation } from "react-i18next";

export default function InterestField() {
  const [t] = useTranslation();
  const setDeleted = deleteMultiselectValuesStore(
    (state) => state.setInterestsToDelete
  );
  const user = useUserStore((state) => state.user);
  const { control, watch, setValue } = useFormContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Interest[]>(watch("interest"));
  const [inputValue, setInputValue] = React.useState("");
  const { interests } = selectOptions();

  const [selectables, setSelectables] = React.useState<Interest[]>([]);

  useUpdateEffect(() => {
    const selectables = removeExistingData(
      interests,
      selected,
      "interest_name"
    );
    setSelectables(selectables);
  }, [selected, interests]);

  const handleUnselect = React.useCallback(
    (framework: Interest) => {
      setSelected((prev) =>
        prev.filter((s) => s.interest_name !== framework.interest_name)
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
    setValue("interest", selected, {
      shouldDirty: true,
      shouldTouch: true,
    });
    if (selected.length !== 0) trigger("interest");
  }, [selected, setValue, trigger]);

  useEffectOnce(() => {
    setSelected(watch("interest"));
  });

  return (
    <FormField
      name="interest"
      control={control}
      render={() => {
        return (
          <FormItem>
            {/* <FormLabel className="text-primary" htmlFor="maritalStatus">
              Interests
            </FormLabel> */}
            <Command
              // onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selected.map((framework, index: number) => {
                    return (
                      <Badge
                        key={index}
                        className="bg-white dark:bg-[#3b0117] dark:text-white dark:border-[#df4798] border-primary border"
                        variant="secondary"
                      >
                        {framework.interest_name}
                        <button
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
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder={t("memberDetails.interestsPlaceholder")}
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
                      {selectables.map((framework, index: number) => {
                        return (
                          <CommandItem
                            key={index}
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
                            {framework.interest_name}
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
  );
}
