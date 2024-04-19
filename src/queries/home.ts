import { MemberData } from "@/types/home";
import axiosQuery from "./axios";

const getMembers: (
  memberId: number,
  lang: string,
  pageNumber: number
) => Promise<MemberData[] | null> = async (
  memberId: number,
  lang: string,
  pageNumber: number
) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    formData.append("page_number", pageNumber.toString());
    const res = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/home_pagination.php",
      formData
    );

    const memberData: MemberData[] = res.data;
    return memberData;
  } catch (error) {
    return null;
  }
};

const getMemberLikes = async (memberId: number, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/likes.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getMemberFavorites = async (memberId: number, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId.toString());
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/favorites.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const membersQuery = {
  getMembers,
  getMemberLikes,
  getMemberFavorites,
};

export default membersQuery;
