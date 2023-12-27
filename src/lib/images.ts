export const getImagePath = (
  gallery_uuid: string | null | undefined,
  gender: string | null | undefined,
  member_uuid: string | null | undefined
) => {
  if (gallery_uuid != null) {
    return `https://muffin0.blob.core.windows.net/profile/${member_uuid}/${gallery_uuid}.jpg`;
  } else if (gallery_uuid == null && gender && gender[0] == "M") {
    return "https://muffin0.blob.core.windows.net/profile/male.png";
  } else if (gallery_uuid == null && gender && gender[0] == "F") {
    return "https://muffin0.blob.core.windows.net/profile/female.png";
  } else {
    return "https://muffin0.blob.core.windows.net/profile/profile.png";
  }
};

export const getImagePathGallery = (
  gallery_uuid: string | null | undefined,
  gender: string | null | undefined,
  member_uuid: string | undefined
) => {
  if (gallery_uuid != null) {
    return `https://muffin0.blob.core.windows.net/photos/${member_uuid}/${gallery_uuid}.jpg`;
  } else if (gallery_uuid == null && gender == "M") {
    return "https://muffin0.blob.core.windows.net/profile/male.png";
  } else if (gallery_uuid == null && gender == "F") {
    return "https://muffin0.blob.core.windows.net/profile/female.png";
  } else {
    return "https://muffin0.blob.core.windows.net/profile/profile.png";
  }
};
