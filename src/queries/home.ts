import { getImagePath } from "@/lib/images";
import axiosQuery from "./axios";

const getMembers = async (memberId: number) => {
  try {
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/HomePage",
      { member: memberId }
    );
    // Loop through the response array and add imagePath property to each member object
    const membersWithImagePath = res.data.map(
      (member: {
        gallery_uuid: string;
        gender: string;
        member_uuid: string;
      }) => {
        const imagePath = getImagePath(
          member.gallery_uuid,
          member.gender,
          member.member_uuid
        );
        return {
          ...member,
          imagePath: imagePath, // Add imagePath property to the member object
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

const toggleLikeButton = async (memberId: number, likedMemberId: number) => {
  console.log("this is triggered!"); // return await axiosQuery.post("/Like", {
  //   member: memberId,
  //   like: likedMemberId,
  // });
  // try {
  //   const res = await axiosQuery.post(
  //     "https://muffinfunction.azurewebsites.net/api/Like",
  //     { member: memberId, liked: likedMemberId }
  //   );
  //   return res;
  // } catch (error) {
  //   console.log(error);
  // }
};

const membersQuery = {
  getMembers,
  getMemberLikes,
  toggleLikeButton,
};

export default membersQuery;
