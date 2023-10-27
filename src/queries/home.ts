import axiosQuery from "./axios";

const getMembers = async (memberId: number) => {
  try {
    const res = await axiosQuery.post(
      "https://muffinfunction.azurewebsites.net/api/HomePage",
      { member: memberId },
    );
    return res.data
  } catch (error) {
    return null;
  }
};

const membersQuery = {
  getMembers,
};

export default membersQuery;
