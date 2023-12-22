import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import selectOptions from "@/zustand/profile/selectData/selectOptions";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Languages } from "@/types/profile";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import deleteMultiselectValuesStore from "@/zustand/profile/about/deleteMultiselectValues";
import removeExistingData from "@/lib/removeExistingData";

export default function LanguageField() {
  const setLanguagesToDelete = deleteMultiselectValuesStore(
    (state) => state.setLanguagesToDelete
  );
  const { control, watch, setValue } = useFormContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [selected, setSelected] = React.useState<Languages[]>(
    watch("language")
  );
  const [selectables, setSelectables] = React.useState<Languages[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const { languages } = selectOptions();

  useUpdateEffect(() => {
    const selectables = removeExistingData(
      languages,
      selected,
      "language_name"
    );
    setSelectables(selectables);
  }, [selected]);

  const handleUnselect = React.useCallback(
    (
      framework: Languages & {
        member_language_id: number;
      }
    ) => {
      setSelected((prev) =>
        prev.filter(
          (s) => s.member_language_id !== framework.member_language_id
        )
      );
      setLanguagesToDelete(framework);
    },
    [setLanguagesToDelete]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
            const deleted = selected.pop();
            if (deleted !== undefined) {
              setLanguagesToDelete(deleted);
            }
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, setLanguagesToDelete]
  );

  React.useEffect(() => {
    setValue("language", selected);
  }, [selected, setValue]);

  useEffectOnce(() => {
    setSelected(watch("language"));
  });

  return (
    <FormField
      name="language"
      control={control}
      render={() => {
        return (
          <FormItem>
            <FormLabel className="text-primary" htmlFor="maritalStatus">
              Languages
            </FormLabel>
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selected.map((framework) => {
                    return (
                      <Badge
                        key={framework.member_language_id}
                        className="bg-white dark:bg-[#3b0117] dark:text-white dark:border-[#df4798] border-primary border"
                        variant="secondary"
                      >
                        {framework.language_name}
                        <button
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
                    placeholder="Select languages..."
                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                  />
                </div>
              </div>
              <div className="relative mt-2 lg:h-full h-screen">
                {open && selectables.length > 0 ? (
                  <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandGroup className="h-40 sm:h-96 overflow-auto ">
                      {selectables.map((framework) => {
                        return (
                          <CommandItem
                            className={"cursor-pointer"}
                            key={framework.member_language_id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={() => {
                              setInputValue("");
                              setSelected((prev) => [...prev, framework]);
                            }}
                          >
                            {framework.language_name}
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
