import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImagePath } from "@/lib/images";
import { Loader2, MoreHorizontal, RotateCwIcon, ClipboardCopyIcon } from "lucide-react";
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

const ReferralProgram = () => {
  const [, i18n] = useTranslation();
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
        referralCodeInfo.updateReferralUrl(res.referrer_uuid);
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
          Rewards Program
        </p>
      </div>
      <div className="p-4 w-full space-y-4">
        {
          referralCodeInfo.referralCode ?
            <div className="flex w-full space-x-8">
              <div className="w-72 space-y-2">
                <div className="flex space-x-4">
                  <p className="w-full font-medium">My Referral Code</p>
                  {
                    !referralCodeIsLoading &&
                    <div className="flex space-x-2">
                      <button className="h-min" disabled={referralCodeIsLoading} onClick={() => {
                        handleFetchReferralCode(true);
                      }}>
                        <RotateCwIcon className="hover:cursor-pointer" />
                      </button>
                      <ClipboardCopyIcon onClick={() => {
                        copy(referralCodeInfo.referralCode ?? "");
                        toast({
                          title: 'Code copied to clipboard ✅',
                          variant: "success",
                        });
                      }} className="hover:cursor-pointer" />
                    </div>
                  }
                </div>
                <Input disabled={referralCodeIsLoading} value={referralCodeInfo.referralCode ?? ""} className="rounded-lg" readOnly />
              </div>
              <div className="w-72 space-y-2">
                <div className="flex space-x-4">
                  <p className="w-full font-medium">My Referral Link</p>
                  {
                    !referralCodeIsLoading &&
                    <ClipboardCopyIcon onClick={() => {
                      copy(referralCodeInfo.referralUrl ?? "");
                      toast({
                        title: 'Link copied to clipboard ✅',
                        variant: "success",
                      });
                    }} className="hover:cursor-pointer" />
                  }
                </div>
                <Input disabled={referralCodeIsLoading} value={referralCodeInfo.referralUrl ?? ""} className="rounded-lg" readOnly />
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
        <p className="text-sm">Share the love and invite your friends to join Muffin. They’ll thank you for it, and you might just help them find their perfect match!</p>
        <div className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm">Referred recently</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full hover:bg-[#ff599b]/90">View all</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
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
                referralsData?.map((referral, index) => {
                  return <div key={index} className="border p-2 pr-4 rounded-lg flex justify-between items-center">
                    <div className="flex space-x-2">
                      <img src={getImagePath(referral.gallery_uuid, referral.gender, referral.member_uuid)} alt="Referred User" className="w-12 rounded-full" />
                      <div>
                        <p className="font-medium">{referral.nickname}</p>
                        <p className="text-xs">{referral.country_name}</p>
                      </div>
                    </div>
                    <button>
                      <MoreHorizontal />
                    </button>
                  </div>
                })
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default ReferralProgram;
