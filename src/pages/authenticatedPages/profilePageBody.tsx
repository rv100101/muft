import AboutAccordion from "@/components/profile/about/aboutAccordion";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTopNav from "@/components/profile/profileTopNav";
import { Formik } from "formik";
// import * as Yup from "yup";
// const ProfileSchema = Yup.object().shape(
//   {
//     gender: Yup.string().required(),
//   },
// );

const ProfilePageBody = ({ userId }: { userId: string }) => {
   return (
    <div className="flex flex-col justify-start w-full h-full lg:w-1/2 border mx-auto overflow-y-auto no-scrollbar ">
            {/* header */}
            <ProfileTopNav />
            {/*  */}
            <ProfileHeader userId={userId} />
            {/* content */}
            <AboutAccordion userId={parseInt(userId)} />
            {/* gallery */}
            {/* <GallerySection /> */}
    </div>
  );
};

export default ProfilePageBody;
