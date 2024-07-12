import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Ban, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const BlockedMessage = ({ blockedModal, setBlockedModal }: { blockedModal: boolean, setBlockedModal: Dispatch<SetStateAction<boolean>> }) => {
  const [t, i18n] = useTranslation();
  return (
    <Dialog open={blockedModal}>
      <DialogContent
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        className="sm:max-w-[425px] flex flex-col items-center"
      >
        <div className="w-full flex justify-end">
          <DialogClose className="flex justify-end">
            <X className="hover:cursor-pointer" onClick={() => {
              setBlockedModal(false);
            }} />
          </DialogClose>
        </div>
        <DialogHeader className="flex flex-row space-x-3 w-full">
          <DialogTitle className="mt-3 dark:text-white flex flex-row space-x-1 text-center w-full justify-center ">{t("blockedModal.title")}</DialogTitle>
        </DialogHeader>
        <div className="block">
          <Ban size={100} color="#ff77ae" />
        </div>
        <div className="dark:block hidden">
          <Ban size={100} color="#ae2e51" />
        </div>
        <div className="flex flex-col space-y-5 items-center text-center mt-3">
          <p>{t("blockedModal.description1")}</p>
          <p>{t("blockedModal.description2")}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BlockedMessage
