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

interface JsonResponse {
  country_code?: string;
  member_uuid?: string;
  religion_name?: string;
  gender?: string;
  nationality?: string;
  date_of_birth?: string;
  ethnicity_name?: string;
  marital_status?: string;
  education_name?: string;
  employment_status?: string;
  occupation?: string;
  monthly_income?: string;
  body_type?: string;
  country_name?: string;
  state_name?: string;
  nickname?: string;
  gallery_uuid?: string;
  hair?: string;
  eyes?: string;
  body_art?: string;
  have_children?: string;
  want_children?: string;
  workout?: string;
  disability?: string;
  drinking?: string;
  smoking?: string;
  living_status?: string;
  car?: string;
  age?: string;
  is_liked?: string;
  is_favored?: string;
  is_blocked?: string;
}

interface ProfileDetails {
  country_code: string;
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
  is_liked: string;
  is_favored: string;
  is_blocked: string;
}

export function convertJsonToConvertedObject(
  jsonResponse: JsonResponse
): ProfileDetails {
  const converted: ProfileDetails = {
    country_code: jsonResponse.country_code || "",
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
    is_liked: jsonResponse.is_liked ?? "0",
    is_favored: jsonResponse.is_favored ?? "0",
    is_blocked: jsonResponse.is_blocked ?? "0",
  };

  return converted;
}
