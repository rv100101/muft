import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import {

  Hash,
  UserCircle,
  Ghost,
  Flag,
  Hourglass,
  Map,
  MapPin,
} from "lucide-react";
import Head from "next/head";
import styles from "./style/Member.module.css";

type Profile = {
  authorized: boolean;
  ip_address: string;
  member_id: number;
  member_uuid: string;
  nickname: string;
  match_percentage: string;
  matched: string;
  first_name: string;
  last_name: string;
  email_address: string;
  member_photo: string;
  gender: string;
  nationality: string;
  date_of_birth: string;
  age: string;
  country_code: string;
  country_name: string;
  state_name: string;
  education_name: string;
  religion_id: string;
  religion_name: string;
  marital_status: string;
  hair: string;
  eyes: string;
  body_type: string;
  body_art: string;
  drinking: string;
  smoking: string;
  living_status: string;
  car: string;
  workout: string;
  disability: string;
  have_children: string;
  want_children: string;
  employment_status: string;
  occupation: string;
  monthly_income: string;
  gallery_uuid: string;
  ethnicity_name: string;
  is_liked: string;
  is_favored: string;
  is_blocked: string;
  last_active: string;
  communication_language: string;
  language_name: string;
  profile_blocked: boolean;
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "location">("basic");
  const [showDialog, setShowDialog] = useState(true);



  const [isBlurred, setIsBlurred] = useState(true);

  const handleBlurClick = () => {
    setIsBlurred(false);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowDialog(false);
    handleBlurClick();
  };

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://muffinapi.azurewebsites.net/member_details.php",
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer 0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              auth: "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6",
              lang: i18n.language, // use current language
              member: id as string,
            }),
          }
        );

        const data: Profile[] = await response.json();
        setProfile(data[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id, i18n.language]);

  if (!profile) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {profile.nickname} {t("| Member")}
        </title>
        <meta
          name="description"
          content={`Explore the profile of ${profile.nickname}, ${profile.age} years old from ${profile.country_name}.`}
        />
        <meta
          property="og:Member"
          content={`${profile.nickname}  ${t("Member")}`}
        />
        <meta
          property="og:description"
          content={`Explore the profile of ${profile.nickname}, ${profile.age} years old from ${profile.country_name}.`}
        />
        <meta property="og:image" content={profile.member_photo} />
        <meta
          property="og:url"
          content={`https://muffinapi.azurewebsites.net/member/${profile.member_id}`}
        />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${profile.nickname}  ${t("title")}`}
        />
        <meta
          name="twitter:description"
          content={`Explore the profile of ${profile.nickname}, ${profile.age} years old from ${profile.country_name}.`}
        />
        <meta name="twitter:image" content={profile.member_photo} />
        <link
          rel="canonical"
          href={`https://muffinapi.azurewebsites.net/member/${profile.member_id}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {showDialog && (
        <div className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <p>{t("general.chooseYourPreferredLanguage")}</p>
          </div>
          <button onClick={() => handleLanguageChange("en")}>English</button>
          <button onClick={() => handleLanguageChange("ar")}>Arabic</button>
        </div>
      )}

      <main className={`${styles.main} ${isBlurred ? styles.blur : ""}`}>
        <div className={styles.topheader}>
          <div className={styles.profileHeader}>
            <img
              src={profile.member_photo}
              alt="Member Photo"
              className={styles.profilePhoto}
            />
            <div>
              <h1 className={styles.profileName}>
                {profile.nickname},{" "}
                <span className={styles.agestyle}>{profile.age}</span>
                <div>
                  <p className={styles.profileDetailBox}>
                    {profile.marital_status}
                  </p>

                  <p className={styles.profileDetailBox}>
                    {profile.country_name}
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div className={styles.contentmargin}>
          <div>
            <p className={styles.aboutheader}>{t("memberDetails.about")}</p>
          </div>
          <div className={styles.content}>
            <div className={styles.menu}>
              <button
                className={
                  activeTab === "basic" ? styles.activeTab : styles.tabButton
                }
                onClick={() => setActiveTab("basic")}
              >
                {t("memberDetails.basicInformation")}
              </button>
              <button
                className={
                  activeTab === "location" ? styles.activeTab : styles.tabButton
                }
                onClick={() => setActiveTab("location")}
              >
                {t("memberDetails.location")}
              </button>
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.details}>
                {activeTab === "basic" && (
                  <div>
                    <div className={styles.containerIcon}>
                      <Hash className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.member_id}</p>
                        <p className={styles.label}>
                          {t("memberDetails.memberID")}
                        </p>
                      </div>
                    </div>

                    <div className={styles.containerIcon}>
                      <UserCircle className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.nickname}</p>
                        <p className={styles.label}>
                          {t("memberDetails.nickname")}
                        </p>
                      </div>
                    </div>

                    <div className={styles.containerIcon}>
                      <Ghost className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.gender}</p>
                        <p className={styles.label}>
                          {t("memberDetails.gender")}
                        </p>
                      </div>
                    </div>

                    <div className={styles.containerIcon}>
                      <Flag className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.nationality}</p>
                        <p className={styles.label}>
                          {t("memberDetails.nationality")}
                        </p>
                      </div>
                    </div>

                    <div className={styles.containerIcon}>
                      <Hourglass className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.age} Y</p>
                        <p className={styles.label}>{t("memberDetails.age")}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "location" && (
                  <div className={styles.tabContent}>
                    <div className={styles.containerIcon}>
                      <Map className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.country_name}</p>
                        <p className={styles.label}>
                          {t("memberDetails.country")}
                        </p>
                      </div>
                    </div>

                    <div className={styles.containerIcon}>
                      <MapPin className={styles.icondetails} />
                      <div className={styles.textContainer}>
                        <p className={styles.value}>{profile.state_name}</p>
                        <p className={styles.label}>
                          {t("memberDetails.state")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
