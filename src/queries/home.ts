import { MemberData } from "@/types/home";
import axiosQuery from "./axios";

const getMembers: (memberId: number) => Promise<MemberData[] | null> = async (
  memberId: number
) => {
  try {
    // console.log("member: ", memberId);
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/HomePage",
      { member: memberId }
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
