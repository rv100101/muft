import { getImagePath } from "@/lib/images";
import { cn } from "@/lib/utils";
import { UserReferralInfo } from "@/queries/referral";
import { useTranslation } from "react-i18next";

const ViewAllReferred = ({ referrals }: { referrals: UserReferralInfo[] | undefined }) => {
  const [, i18n] = useTranslation();
  if (referrals?.length == 0) {
    return <div className="w-full py-16 h-full flex justify-center items-center">
      You don’t have any referrals
    </div>
  }
  return (
    <div dir={i18n.language == "en" ? 'ltr' : "rtl"} className="space-y-2 max-h-96 overflow-auto">
      {referrals && referrals.map((referral, index) => (
        <a target="_blank" href={`/members/${referral.member_id}`} key={index} className="border p-2 pr-4 rounded-lg flex justify-between items-center w-full hover:border-primary">
          <div className={cn("flex w-full", i18n.language == "en" ? "space-x-2" : "")}>
            <img src={getImagePath(referral.gallery_uuid, referral.gender, referral.member_uuid)} alt="Referred User" className="w-12 rounded-full" />
            <div className={cn("w-full", i18n.language == "ar" ? "mr-2" : "")}>
              <p className="font-medium">{referral.nickname}</p>
              <p className="text-xs">{referral.country_name}</p>
            </div>
          </div>
          <div className={cn("w-full", i18n.language == "ar" ? "text-left" : "text-right")}>
            <p className="text-xs sm:text-sm">Earned amount: ${referral.earned_amount}</p>
            {referral.paid_amount != 0 && <p className=" text-xs sm:text-sm">Paid amount: ${referral.paid_amount}</p>}
          </div>
        </a>
      ))}
    </div>
  )
}

export default ViewAllReferred;
