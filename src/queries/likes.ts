import axiosQuery from "./axios";

const getLikes = async (memberId: number) => {
  try {
    const res = await axiosQuery.post("/MemberLikes", { member: memberId });
    return res.data;
  } catch (e) {
    return null;
  }
};

const likesQuery = {
  getLikes,
};

export default likesQuery;
