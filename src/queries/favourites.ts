import axiosQuery from "./axios";

const getFavourites = async (memberId: number) => {
  try {
    const res = await axiosQuery.post("/MemberFavorites", {
      member: memberId,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

const favouritesQuery = {
  getFavourites,
};

export default favouritesQuery;
