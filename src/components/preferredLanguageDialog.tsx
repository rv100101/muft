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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const PreferredLanguageDialog = ({ showTrigger = false }) => {
  const [t] = useTranslation();
  const { preferred, setPreferredLanguage } = usePreferredLanguageStore();
  const [selectVal, setSelectVal] = useState<string | null>(preferred);
  const [changePreferredLanguage, setChangePreferredLanguage] = useState(false);
  return (
    <Dialog open={preferred == null || changePreferredLanguage}>
      {showTrigger && (
        <div className="flex justify-between items-center">
          <p className="font-medium pt-5">
            {t("settings.changePreferredLanguage")}
          </p>
          <DialogTrigger className="flex">
            <Button
              className={cn(
                "text-white h-10 text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 w-24 dark:bg-[#1b1d1e] dark:hover:bg-red-700/90"
              )}
              onClick={() => setChangePreferredLanguage(true)}
            >
              {t("settings.change")}
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
              <SelectItem value="ar">Arabic</SelectItem>
              <SelectItem value="en">English</SelectItem>
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
