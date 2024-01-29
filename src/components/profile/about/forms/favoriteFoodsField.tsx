import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import selectOptions from "@/zustand/profile/selectData/selectOptions";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { FavoriteFood } from "@/types/profile";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import removeExistingData from "@/lib/removeExistingData";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";

export default function FavoriteFoodField() {
  const user = useUserStore(state => state.user);
  const { control, watch, setValue } = useFormContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<FavoriteFood[]>(
    watch("favoriteFood")
  );
  const [inputValue, setInputValue] = React.useState("");
  const { favoriteFoods } = selectOptions();

  const [selectables, setSelectables] = React.useState<FavoriteFood[]>([]);

  useUpdateEffect(() => {
    const selectables = removeExistingData(
      favoriteFoods,
      selected,
      "favorite_food_name"
    );
    setSelectables(selectables);
  }, [selected, favoriteFoods]);

  const handleUnselect = React.useCallback((framework: FavoriteFood) => {
    setSelected((prev) =>
      prev.filter((s) => s.favorite_food_name !== framework.favorite_food_name)
    );
  }, []);

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
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  React.useEffect(() => {
    setValue("favoriteFood", selected);
  }, [selected]);

  useEffectOnce(() => {
    setSelected(watch("favoriteFood"));
  });

  return (
    <FormField
      name="favoriteFood"
      control={control}
      render={() => {
        return (
          <FormItem>
            {/* <FormLabel className="text-primary" htmlFor="favoriteFood">
              Favorite Foods
            </FormLabel> */}
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selected.map((framework) => {
                    return (
                      <Badge
                        key={framework.favorite_food_id}
                        className="bg-white dark:bg-[#3b0117] dark:text-white dark:border-[#df4798] border-primary border"
                        variant="secondary"
                      >
                        {framework.favorite_food_name}
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
                    placeholder="Select favorite foods..."
                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                  />
                </div>
              </div>
              <div className={cn("relative mt-2 lg:h-full", !user?.profile_completed ? 'h-full' : 'h-screen')}>
                {open && selectables.length > 0 ? (
                  <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandGroup className="h-40 overflow-auto">
                      {selectables.map((framework) => {
                        return (
                          <CommandItem
                            key={framework.favorite_food_id}
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
                            {framework.favorite_food_name}
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
