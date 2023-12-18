import { ProfileHeader } from "@/types/profileHeader";
import axiosQuery from "../axios";

const getProfilePhoto = async (member: number) =>
  await axiosQuery.post("/GetProfilePhoto", { member });

const getBirthday = async (member: number) =>
  await axiosQuery.post("/GetBirthday", { member });

const getNickname = async (member: number) =>
  await axiosQuery.post("/GetNickname", { member });

const getHeight = async (member: number) =>
  await axiosQuery.post("/GetHeight", { member });

const getMaritalStatus = async (member: number) =>
  await axiosQuery.post("/GetMaritalStatus", { member });

const getEmployment = async (member: number) =>
  await axiosQuery.post("/GetEmployment", { member });

const getCountry = async (member: number) =>
  await axiosQuery.post("/GetCountry", { member });

const getProfileHeader = async (member: number) => {
  let profileHeader: ProfileHeader = {
    member_uuid: null,
    gallery_uuid: null,
    gender: null,
    nickname: null,
    height: null,
    age: null,
    maritalStatus: null,
    occupation_title: null,
    country_name: null,
  };
  try {
    const profilePhoto = await getProfilePhoto(member);
    if (profilePhoto.data !== "") {
      profileHeader = {
        ...profileHeader,
        member_uuid: profilePhoto.data.member_uuid,
        gallery_uuid: profilePhoto.data.gallery_uuid,
        gender: profilePhoto.data.gender,
      };
    }

    const birthday = await getBirthday(member);
    if (profilePhoto.data !== "") {
      profileHeader = {
        ...profileHeader,
        age: birthday.data[0].age,
      };
    }

    const nickName = await getNickname(member);
    if (nickName.data !== "") {
      profileHeader = {
        ...profileHeader,
        nickname: nickName.data[0].nickname,
      };
    }

    const height = await getHeight(member);
    if (height.data !== "") {
      profileHeader = {
        ...profileHeader,
        height: height.data[0].height,
      };
    }

    const maritalStatus = await getMaritalStatus(member);
    if (maritalStatus.data !== "") {
      profileHeader = {
        ...profileHeader,
        maritalStatus: maritalStatus.data.marital_status_name,
      };
    }
    const employment = await getEmployment(member);
    if (employment.data !== "") {
      profileHeader = {
        ...profileHeader,
        occupation_title: employment.data.occupation_title,
      };
    }
    const country = await getCountry(member);

    if (country.data !== "") {
      profileHeader = {
        ...profileHeader,
        country_name: country.data[0].country_name,
      };
    }
    return profileHeader;
  } catch (e) {
    return {
      data: null,
    };
  }
};

const profileQuery = {
  getProfileHeader,
};

export default profileQuery;
