export const getImagePath = (
  gallery_uuid: string | null,
  gender: string,
  member_uuid: string
) => {
  if (gallery_uuid != null) {
    return `https://muffin0.blob.core.windows.net/profile/${member_uuid}/${gallery_uuid}.jpg`;
  } else if (gallery_uuid == null && gender == "M") {
    return "https://muffin0.blob.core.windows.net/profile/male.png";
  } else if (gallery_uuid == null && gender == "F") {
    return "https://muffin0.blob.core.windows.net/profile/female.png";
  } else {
    return "https://muffin0.blob.core.windows.net/profile/profile.png";
  }
};
