import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImagePath } from "@/lib/images";
import { Loader2, RotateCwIcon, X, Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getReferralCode, getReferrals } from "@/queries/referral";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { useReferralCodeStore } from "@/zustand/settings/referralStore";
import { useState } from "react";
import { useUserStore } from "@/zustand/auth/user";
import { useCopyToClipboard } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import ViewAllReferred from "./viewAllReferred";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const ReferralProgram = () => {
  const [t, i18n] = useTranslation();
  const [, copy] = useCopyToClipboard();
  const { toast } = useToast()
  const user = useUserStore(state => state.user);
  const { data: referralsData, isLoading: referralsIsLoading } = useQuery({
    queryKey: ["landing-posts"],
    queryFn: () => getReferrals(i18n.language, user!.member_id.toString()),
  });
  const referralCodeInfo = useReferralCodeStore();

  const [referralCodeIsLoading, setReferralCodeIsLoading] = useState(false);

  const handleFetchReferralCode = async (isFirstTime: boolean) => {
    setReferralCodeIsLoading(true);
    try {
      const res = await getReferralCode(i18n.language, user!.member_id.toString(), isFirstTime);
      if (res !== null) {
        referralCodeInfo.updateReferralCode(res.referrer_code);
        referralCodeInfo.updateReferralUrl(`https://www.muffin.ae/auth/signup?referral_code=${res.referrer_code}`);
      }
    } catch (error) {
      console.log(error);
    }
    setReferralCodeIsLoading(false);
  }

  return (
    <div className="flex overflow-clip flex-col border border-primary w-full rounded-[16px] border-b text-[#727272] space-y-2">
      <div className="flex w-full p-4 bg-primary">
        <p className="text-white text-lg">
          {t("rewards.rewardsProgram")}
        </p>
      </div>
      <div className="p-4 w-full space-y-4">
        {
          referralCodeInfo.referralCode ?
            <div className={cn("flex w-full",
            )}>
              <div className={cn("w-72 space-y-2", i18n.language == "en" ? " mr-8" : "ml-8")}>
                <div className={cn("flex", i18n.language == 'en' ? "space-x-4" : "-space-x-4"
                )}>
                  <p className="w-full text-xs sm:text-base   font-medium">
                    {t("rewards.referralCode")}
                  </p>
                  {
                    !referralCodeIsLoading &&
                    <div className="flex w-full space-x-2 justify-end">
                      <button className={cn("h-min", i18n.language == "en" ? "w-min" : "w-8")} disabled={referralCodeIsLoading} onClick={() => {
                        handleFetchReferralCode(true);
                      }}>
                        <RotateCwIcon className={cn("hover:cursor-pointer hover:text-[#727272]/90")} />
                      </button>
                      <Copy className={cn("hover:cursor-pointer hover:text-[#727272]/90")} onClick={() => {
                        copy(referralCodeInfo.referralCode ?? "");
                        toast({
                          title: 'Code copied to clipboard ✅',
                          variant: "success",
                          duration: 1000
                        });
                      }} />
                    </div>
                  }
                </div>
                <Input disabled={referralCodeIsLoading} value={referralCodeInfo.referralCode ?? ""} className="rounded-lg" readOnly />
              </div>
              <div className="w-72 space-y-2">
                <div className="flex space-x-4">
                  <p className="w-full text-sm sm:text-base font-medium">
                    {t("rewards.referralLink")}
                  </p>
                  {
                    !referralCodeIsLoading &&
                    <Copy onClick={() => {
                      copy(referralCodeInfo.referralUrl ?? "");
                      toast({
                        title: 'Link copied to clipboard ✅',
                        variant: "success",
                        duration: 1000
                      });
                    }} className="hover:cursor-pointer hover:text-[#727272]/90" />
                  }
                </div>
                <Input dir="ltr" disabled={referralCodeIsLoading} value={referralCodeInfo.referralUrl ?? ""} className="rounded-lg" readOnly />
              </div>
            </div>
            :
            <div className="flex">
              <Button onClick={() => handleFetchReferralCode(referralCodeInfo.referralCode !== null)} disabled={referralCodeIsLoading} className="w-64 space-y-2 hover:bg-[#ff599b]/90 dark:bg-[#ae2e51]">
                Generate Referral Code
                {referralCodeIsLoading && (
                  <Loader2 className="ml-2 h-min w-min animate-spin" />
                )}
              </Button>
            </div>
        }
        <hr />
        <p className="font-medium">Invite Friends Over</p>
        <p className="text-sm">{t("rewards.shareTheLove")}</p>
        <div className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm">{t("rewards.referredRecently")}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full hover:bg-[#ff599b]/90">{t("rewards.viewAll")}</Button>
              </DialogTrigger>
              <DialogContent dir={i18n.language == "en" ? 'ltr' : "rtl"} className="sm:max-w-[600px] w-72">
                <div className="flex justify-between">
                  <p>Referrals</p>
                  <DialogClose>
                    <X className="hover:text-black/70" />
                  </DialogClose>
                </div>
                <ViewAllReferred referrals={referralsData} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            {
              referralsIsLoading ?
                <>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </>
                :
                referralsData?.length == 0 ?
                  <div className="flex h-24 w-full items-center justify-center space-x-2">
                    No referrals yet.
                    Invite friends to join!
                  </div>
                  :
                  referralsData?.slice(0, 1).map((referral, index) => {
                    return <a target="_blank" href={`/members/${referral.member_id}`} key={index} className="border p-2 pr-4 rounded-lg flex justify-between items-center w-full hover:border-primary">
                      <div className={cn("flex w-full", i18n.language == "en" ? "space-x-2" : "")}>
                        <img src={getImagePath(referral.gallery_uuid, referral.gender, referral.member_uuid)} alt="Referred User" className="w-12 rounded-full" />
                        <div className={cn("w-full", i18n.language == "ar" ? "mr-2" : "")}>
                          <p className="font-medium">{referral.nickname}</p>
                          <p className="text-xs">{referral.country_name}</p>
                        </div>
                      </div>
                      <p className="w-full text-right text-xs sm:text-base">Earned amount: ${referral.earned_amount}</p>
                    </a>
                  })
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default ReferralProgram;
