import { LikedMemberData, MemberData } from "@/types/home";

const createMap = (
  memberDataList: MemberData[],
  likedMembers: LikedMemberData[]
): Record<string, boolean> => {
  const likedMap: Record<string, boolean> = {};

  // Initialize the map with false values for all member IDs
  memberDataList.forEach((member) => {
    likedMap[member.member_id.toString()] = false;
  });

  // Update liked values to true for members that exist in both lists
  likedMembers.forEach((likedMember) => {
    likedMap[likedMember.member_id.toString()] = true;
  });

  return likedMap;
};

export default createMap;
