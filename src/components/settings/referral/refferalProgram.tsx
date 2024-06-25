import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImagePath } from "@/lib/images";
import { MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getReferrals } from "@/queries/referral";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const ReferralProgram = () => {
  const [, i18n] = useTranslation();
  const { data: referralsData, isLoading: referralsIsLoading } = useQuery({
    queryKey: ["landing-posts"],
    queryFn: () => getReferrals(i18n.language, '403'),
  });

  console.log(referralsData);

  return (
    <div className="flex overflow-clip flex-col border border-primary w-full rounded-[16px] border-b text-[#727272] space-y-2">
      <div className="flex w-full p-4 bg-primary">
        <p className="text-white text-lg">
          Referral Program
        </p>
      </div>
      <div className="p-4 w-full space-y-4">
        <div className="flex w-full space-x-8">
          <div className="w-72 space-y-2">
            <p className="w-full font-medium">My Referral Code</p>
            <Input className="rounded-lg" />
          </div>
          <div className="w-72 space-y-2">
            <p className="w-full font-medium">My Referral Link</p>
            <Input className="rounded-lg" />
          </div>
        </div>
        <hr />
        <p className="font-medium">Invite Friends Over</p>
        <p className="text-sm">Share the love and invite your friends to join Muffin. They’ll thank you for it, and you might just help them find their perfect match!</p>
        <div className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm">Referred recently</p>
            <Button className="rounded-full hover:bg-[#ff599b]/90">View all</Button>
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
