import { MemberData } from "@/types/home";
import axiosQuery from "./axios";

const getMembers: (
  memberId: number,
  lang: string
) => Promise<MemberData[] | null> = async (memberId: number, lang: string) => {
  try {
    // console.log("member: ", memberId);
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const res = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/home.php",
      formData
    );

    const memberData: MemberData[] = res.data;
    return memberData;
  } catch (error) {
    return null;
  }
};

const getMemberLikes = async (memberId: number) => {
  try {
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/MemberLikes",
      { member: memberId }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getMemberFavorites = async (memberId: number) => {
  try {
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/MemberFavorites",
      { member: memberId }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const membersQuery = {
  getMembers,
  getMemberLikes,
  getMemberFavorites,
};

export default membersQuery;
