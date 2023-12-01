import { getImagePath } from "@/lib/images";
import axiosQuery from "./axios";

type Nationality = {
  authorized: boolean;
  ip_address: string;
  country_code: string;
  nationality: string;
};

const getMembers = async (memberId: number) => {
  try {
    // console.log("member: ", memberId);
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/HomePage",
      { member: memberId }
      // { member: 403 }
    );

    const res2 = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/GetMaritalStatus",
      { member: memberId }
      // { member: 403 }
    );

    const res3 = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/Nationalities"
      // { member: memberId }
      // { member: 403 }
    );
    console.log("🚀 ~ file: home.ts:31 ~ getMembers ~ res3:", res3.data);

    // Loop through the response array and add imagePath property to each member object
    const membersWithImagePath = res.data.map(
      (member: {
        gallery_uuid: string;
        gender: string;
        member_uuid: string;
        nationality: string;
      }) => {
        const { country_code } = res3.data.filter(
          (nationality: Nationality) =>
            nationality.nationality === member.nationality
        )[0];

        const imagePath = getImagePath(
          member.gallery_uuid,
          member.gender,
          member.member_uuid
        );
        return {
          ...member,
          imagePath: imagePath, // Add imagePath property to the member object
          status: res2.data.marital_status_name,
          nationality_code: country_code,
        };
      }
    );

    return membersWithImagePath;
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
