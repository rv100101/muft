import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from '../ui/use-toast';
import uploadQueries from '@/queries/uploading';
import { useUserAvatar } from '@/zustand/auth/avatar';
import { useTranslation } from 'react-i18next';
import profileAboutContentStore from '@/zustand/profile/profileAboutStore';
import { useUserStore } from '@/zustand/auth/user';
import logo from "@/assets/single-logo.png";
import { getImagePath } from '@/lib/images';

const UploadPhotoStep = () => {
  const [t] = useTranslation();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const {
    data,
    setData,
    setProfileData,
    profileData,
  } = profileAboutContentStore();
  const [isUploading, setIsUploading] = useState(false);
  const user = useUserStore(state => state.user);
  const setAvatar = useUserAvatar((state) => state.setAvatar);
  const avatar = useUserAvatar((state) => state.gallery_uuid);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Check if the selected file is an image (you can enhance this check)
    const allowedImageTypes = ["image/jpeg", "image/png"];
    if (file) {
      const reader = new FileReader();
      if (!allowedImageTypes.includes(file?.type)) {
        toast({
          title: t("alert.selectValidImageFile"),
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      reader.onloadend = () => {
        const base64String = reader.result as string; // Result is a data URL
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    // Check if the selected file is an image (you can enhance this check)
    const allowedImageTypes = ["image/jpeg", "image/png"];
    if (file) {
      const reader = new FileReader();
      if (!allowedImageTypes.includes(file?.type)) {
        toast({
          title: t("alert.selectValidImageFile"),
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      reader.onloadend = () => {
        const base64String = reader.result as string; // Result is a data URL
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };


  useEffect(() => {
    const handleProfilePhotoUpload = async () => {
      try {
        setIsUploading(true);
        // Check if a file is selected
        if (!selectedFile) {
          // Handle the case where no file is selected
          toast({
            title: t("alerts.selectFileToUpload"),
            variant: "destructive",
          });
          setIsUploading(false);
          return;
        }

        const res = await uploadQueries.uploadProfilePicture(
          selectedFile,
          user!.member_id
        );
        setData({
          ...data!,
          gallery_uuid: res.data[0].gallery_uuid,
        });
        setProfileData({
          ...profileData!,
          gallery_uuid: res.data[0].gallery_uuid,
        });
        setAvatar(res.data[0].gallery_uuid);
        toast({
          title: t("alerts.photoSuccessfullyUpdated"),
          variant: "success",
        });
        setSelectedFile(null);
      } catch (error) {
        return;
      } finally {
        setIsUploading(false);
      }
    };
    if (selectedFile) {
      handleProfilePhotoUpload();
    }
  }, [data, profileData, selectedFile, setAvatar, setData, setProfileData, t, user]);


  const getGender: (value: string) => string = (value: string) => {
    if (value == t("memberDetails.male") || value == "M") {
      return "M";
    } else if (value == t("memberDetails.female") || value == "F") {
      return "F";
    } else {
      return "";
    }
  };

  return <>
    <div
      onDragOver={(e: unknown) => handleDragOver(e as DragEvent)}
      onDrop={(e: unknown) => handleDrop(e as DragEvent)}
      className="border-2 border-dashed border-gray-300 text-center h-64 w-48 flex flex-col overflow-clip justify-center items-center">
      <label htmlFor="profile-photo-upload" className="block cursor-pointer">
        {selectedFile || avatar ? (
          <div className='flex flex-col items-center justify-center relative'>
            {isUploading && <div className='flex flex-col justify-center items-center absolute'>
              <div className="flex justify-center w-full">
                <img src={logo} className="animate-bounce w-12 h-12 z-30" alt="muffin-logo" />
              </div>
            </div>
            }
            <div className="relative">
              {avatar !== null ?
                <img
                  className={`h-full object-cover max-h-96 sm:max-h-[500px] w-full`}
                  src={
                    selectedFile
                      ? selectedFile
                      : getImagePath(
                        avatar,
                        getGender(data!.gender) ?? null,
                        data!.member_uuid?.toString()
                      )
                  }
                  alt="no image selected"
                />
                : <img src={selectedFile!} alt="Selected" className="mx-auto max-w-full max-h-48 rounded-lg" />}
              {isUploading && <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center w-full">
              <img src={logo} className="w-12 h-12 z-30 mb-8" alt="muffin-logo" />
            </div>
            <span className="block mb-2 text-sm mx-4">Select or drag & drop your photo here</span>
            <span className="block text-sm mx-4">(PNG or JPG)</span>
          </>
        )}
      </label>
      <input type="file" accept="image/*" disabled={isUploading} id="profile-photo-upload" className="hidden" onChange={handleFileChange} />
    </div>
    {/* {
      selectedFile !== null &&
      <Button variant={"outline"} className='mt-4 border-primary' onClick={handleProfilePhotoUpload}>
        {isUploading ? "Uploading" : "Save"}
      </Button>
    } */}
  </>
}

export default UploadPhotoStep;
