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

import { usePreferredLanguageStore } from "@/zustand/auth/preferred_language";
import { useState } from "react";
const PreferredLanguageDialog = () => {
  const { preferred, setPreferredLanguage } = usePreferredLanguageStore();
  const [selectVal, setSelectVal] = useState<string | null>(preferred);
  return (
    <Dialog open={preferred == null}>
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
            onClick={() => {
              if (selectVal !== null) {
                setPreferredLanguage(selectVal);
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
