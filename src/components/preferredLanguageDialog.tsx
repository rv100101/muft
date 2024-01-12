import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import { useUserStore } from "@/zustand/auth/user";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const PreferredLanguageDialog = ({
  showTrigger = false,
  triggerTitle,
  triggerVariant = "default",
}: {
  showTrigger: boolean;
  triggerTitle?: null | string;
  triggerVariant: string;
}) => {
  const [t] = useTranslation();

  const { preferred, setPreferredLanguage } = usePreferredLanguageStore();
  const [selectVal, setSelectVal] = useState<string | null>(preferred);
  const [changePreferredLanguage, setChangePreferredLanguage] = useState(false);
  const user = useUserStore((state) => state.user);
  return (
    <Dialog open={preferred == null || changePreferredLanguage}>
      {showTrigger && (
        <div className="flex justify-between items-center">
          {user && (
            <p className="font-medium pt-5">
              {triggerTitle
                ? triggerTitle
                : t("settings.changePreferredLanguage")}
            </p>
          )}
          <DialogTrigger className="flex">
            <Button
              variant={
                triggerVariant as
                  | "default"
                  | "destructive"
                  | "outline"
                  | "secondary"
                  | "ghost"
                  | "link"
                  | null
                  | undefined
              }
              className={cn(
                "text-white h-10 text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#1b1d1e] dark:hover:bg-red-700/90"
              )}
              onClick={() => setChangePreferredLanguage(true)}
            >
              {triggerTitle ? triggerTitle : t("settings.change")}
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent>
        <DialogHeader className="whitespace-nowrap">
          <DialogTitle>Choose your preferred language</DialogTitle>
        </DialogHeader>
        <Select
          onValueChange={(val) => {
            setSelectVal(val);
          }}
        >
          <SelectTrigger>
            <SelectValue className="text-left" placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="en">
                <p className="flex text-md">
                  <span>
                    <img
                      className="mr-2"
                      height={24}
                      width={24}
                      src="https://muffin0.blob.core.windows.net/flags/us.png"
                      alt="english-flag"
                    />
                  </span>
                  English
                </p>
              </SelectItem>
              <SelectItem value="ar">
                <p className="flex text-md">
                  <span>
                    <img
                      className="mr-2"
                      height={24}
                      width={24}
                      src="https://muffin0.blob.core.windows.net/flags/ae.png"
                      alt="arabic-flag"
                    />
                  </span>
                  العربية
                </p>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            className="
          hover:bg-[#FF599B]/90
          "
            onClick={() => {
              if (selectVal !== null) {
                setPreferredLanguage(selectVal);
                setChangePreferredLanguage(false);
              }
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreferredLanguageDialog;
