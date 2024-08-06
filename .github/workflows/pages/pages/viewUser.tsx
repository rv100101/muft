import React from "react";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";
import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import Head from "next/head";
import { getImagePath } from "@/lib/images";
import { useUserStore } from "@/zustand/auth/user";
interface AboutSelfProps {
  id: string;
}

const AboutSelf: React.FC<AboutSelfProps> = ({ id }) => {
  const { data, profileData } = profileAboutContentStore();
  const user = useUserStore((state) => state.user);
  return (
    <AuthenticatedLayout>
      <Head>
        <>
          <title>{data?.nickname ?? "muffin"} | Muffin</title>
          <link
            rel="canonical"
            href={`https://${window.location.hostname}${location}`}
          />
        </>
        ) : (
        <>
          <title>My Profile</title>
          <link
            rel="canonical"
            href={`https://${window.location.hostname}${location}`}
          />
        </>
        <meta
          property="og:title"
          content={
            user !== null ? `${user.first_name}'s Profile` : "Loading..."
          }
        />
        <meta property="og:description" content={"Muffin member"} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={
            profileData !== null
              ? getImagePath(
                  profileData!.gallery_uuid,
                  profileData!.gender,
                  profileData!.member_uuid
                )
              : "https://muffin.ae/public/logo.png"
          }
        />
        <meta
          property="og:image:secure_url"
          content={"https://muffin.ae/public/logo.png"}
        />
        <meta property="og:image:alt" content="User's profile image" />
      </Head>

      <ProfilePageBody userId={id} />
    </AuthenticatedLayout>
  );
};

export default AboutSelf;
