import { getImagePath } from "@/lib/images";
import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";
import { useUserStore } from "@/zustand/auth/user";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

const ViewUser = ({ id }: { id: string }) => {
  const [location] = useLocation();
  const { data, profileData } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);

  const ogImage = profileData
    ? getImagePath(
        profileData!.gallery_uuid,
        profileData!.gender,
        profileData!.member_uuid
      )
    : "https://muffin.ae/public/logo.png";

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>
          {location.startsWith("/members")
            ? `${data?.nickname ?? "muffin"} | Muffin`
            : "My Profile"}
        </title>
        <link
          rel="canonical"
          href={`https://${window.location.hostname}${location}`}
        />

        <meta
          property="og:title"
          content={
            user !== null ? `${user.first_name}'s Profile` : "Loading..."
          }
        />
        <meta property="og:description" content="Muffin member" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:alt" content="User's profile image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <div className="w-full">
        <ProfilePageBody userId={id} />
      </div>
    </AuthenticatedLayout>
  );
};

export default ViewUser;
