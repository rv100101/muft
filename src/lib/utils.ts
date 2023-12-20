import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
interface ProfileDetails {
  religion: string;
  gender: string;
  nationality: string;
  birthInfo: string;
  ethnicity: string;
  maritalStatus: string;
  education: string;
  employmentStatus: string;
  occupationTitle: string;
  income: string;
  bodyType: string;
  country: string;
  region: string;
  nickname: string;
  profilePhoto: string;
  hair: string;
  eyes: string;
  bodyArt: string;
  haveChildren: string;
  wantChildren: string;
  workout: string;
  disability: string;
  drinking: string;
  smoking: string;
  livingStatus: string;
  car: string;
  member_uuid: string;
  gallery_uuid: string | null;
  age: string;
}

export function convertJsonToConvertedObject(
  jsonResponse: any
): ProfileDetails {
  const converted: ProfileDetails = {
    member_uuid: jsonResponse.member_uuid || "",
    religion: jsonResponse.religion_name || "",
    gender: jsonResponse.gender || "",
    nationality: jsonResponse.nationality || "",
    birthInfo: jsonResponse.date_of_birth || "",
    ethnicity: jsonResponse.ethnicity_name || "",
    maritalStatus: jsonResponse.marital_status || "",
    education: jsonResponse.education_name || "",
    employmentStatus: jsonResponse.employment_status || "",
    occupationTitle: jsonResponse.occupation || "",
    income: jsonResponse.monthly_income || "",
    bodyType: jsonResponse.body_type || "",
    country: jsonResponse.country_name || "",
    region: jsonResponse.state_name || "",
    nickname: jsonResponse.nickname || "",
    profilePhoto: jsonResponse.gallery_uuid || "",
    hair: jsonResponse.hair || "",
    eyes: jsonResponse.eyes || "",
    bodyArt: jsonResponse.body_art || "",
    haveChildren: jsonResponse.have_children || "",
    wantChildren: jsonResponse.want_children || "",
    workout: jsonResponse.workout || "",
    disability: jsonResponse.disability || "",
    drinking: jsonResponse.drinking || "",
    smoking: jsonResponse.smoking || "",
    livingStatus: jsonResponse.living_status || "",
    car: jsonResponse.car || "",
    gallery_uuid: jsonResponse.gallery_uuid ?? null,
    age: jsonResponse.age ?? "",
  };

  return converted;
}
