import axiosQuery from "./axios";
function removePrefix(base64: string) {
  const index = base64.indexOf("base64,");
  console.log(index);

  return base64.substring(index + 7);
}

const uploadProfilePicture = async (base64: string, memberId: number) => {
  const image = removePrefix(base64);
  return await axiosQuery.post("/UploadProfilePhoto", {
    image: image,
    member: memberId,
  });
};

const uploadGalleryPhoto = async (base64: string, memberId: number) => {
  const image = removePrefix(base64);
  return await axiosQuery.post("/UploadGalleryPhoto", {
    image: image,
    member: memberId,
  });
};

const deleteGalleryPhoto = async (gallery: string) =>
  await axiosQuery.post("/DeleteGallery", {
    gallery,
  });

const uploadQueries = {
  uploadProfilePicture,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
};

export default uploadQueries;
