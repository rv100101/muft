import { getImagePath } from "@/lib/images";
import { UserReferralInfo } from "@/queries/referral";

const ViewAllReferred = ({ referrals }: { referrals: UserReferralInfo[] | undefined }) => {
  if (referrals?.length == 0) {
    return <div className="w-full py-16 h-full flex justify-center items-center">
      No referrals yet
    </div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {referrals && referrals.map((referral, index) => (
        <a target="_blank" href={`/members/${referral.member_id}`}
          key={index}
          className="border p-2 w-25 h-25 rounded-lg flex flex-col justify-between items-center"
        >
          <div className="flex w-full h-full flex-col items-center space-y-2">
            <img
              src={getImagePath(referral.gallery_uuid, referral.gender, referral.member_uuid)}
              alt="Referred User"
              className="w-24 h-24 rounded-full"
            />
            <div className="text-center">
              <p className="font-medium">{referral.nickname}</p>
              <p className="text-xs">{referral.country_name}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default ViewAllReferred;
