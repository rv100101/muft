import axiosQuery from "./axios";

type UserReferralInfo = {
  authorized: boolean;
  ip_address: string;
  referral_id: string;
  member_id: number;
  age: number;
  country_code: string;
  gender: string;
  country_name: string;
  state_name: string;
  nickname: string;
  created_date: string;
  member_uuid: string;
  gallery_uuid: string | null;
  earned_amount: number;
  paid_amount: number;
};

export const getReferrals = async (lang: string, member: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  formData.append("member", member);
  try {
    const result = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/referrals.php",
      formData
    );
    const referrals: UserReferralInfo[] = result.data;
    return referrals;
  } catch (error) {
    return [];
  }
};
