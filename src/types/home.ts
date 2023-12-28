export type Member = {
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
  nationality_code: string;
};
export type MemberData = {
  authorized: boolean;
  ip_address: string;
  member_id: number;
  member_uuid: string;
  nickname: string;
  age: number;
  gender: "M" | "F"; // Assuming gender can be either 'M' or 'F'
  marital_status: string; // You might want to create an enum for possible values
  nationality: string;
  country_code: string;
  country_name: string;
  state_name: string;
  last_active: string;
  gallery_uuid: string | null;
};
