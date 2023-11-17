export type Nationality = {
  authorized: boolean;
  ip_address: string;
  country_code: string;
  nationality: string;
};

export type Ethnicity = {
  authorized: boolean;
  ip_address: string;
  ethnicity_id: number;
  ethnicity_name: string;
};

export type MaritalStatus = {
  authorized: boolean;
  ip_address: string;
  marital_status_id: number;
  marital_status_name: string;
};

export type Languages = {
  authorized: boolean;
  ip_address: string;
  language_code: string;
  language_name: string;
};

export type Education = {
  authorized: boolean;
  ip_address: string;
  education_id: number;
  education_name: string;
};

export type Occupation = {
  authorized: boolean;
  ip_address: string;
  occupation_id: number;
  occupation_title: string;
};

export type Income = {
  authorized: boolean;
  ip_address: string;
  income_id: number;
  income_range: string;
};


export type FavoriteFood = {
  authorized: boolean;
  ip_address: string;
  favorite_food_id: number;
  favorite_food_name: string;
};

export type BodyType = {
  authorized: boolean;
  ip_address: string;
  body_type_id: number;
  body: string;
};
