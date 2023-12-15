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
  language_code: string;
  language_name: string;
  member_language_id: number;
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

export type Country = {
  country_code: string;
  country_name: string;
};

export type State = {
  state_id: string;
  state_name: string;
};

export type Hair = {
  hair_id: string;
  hair_name: string;
};

export type BodyArt = {
  body_art_id: number;
  body: string;
};

export type Eye = {
  eyes_id: number;
  eyes_name: string;
};

export type HaveChildren = {
  have_children_id: number;
  have_children_name: string;
};

export type WantChildren = {
  want_children_id: number;
  want_children_name: string;
};

export type Workout = {
  workout_id: number;
  workout_name: string;
};

export type Disability = {
  disability_id: number;
  disability_name: string;
};

export type Pets = {
  pet_id: number;
  pet_name: string;
};

export type Drink = {
  drink_id: number;
  drink_name: string;
};

export type Smoke = {
  smoke_id: number;
  smoke_name: string;
};

export type LivingStatus = {
  living_status_id: number;
  living_status: string;
};

export type Car = {
  car_id: number;
  car_name: string;
};

export type Interest = {
  interest_id: number;
  interest_name: string;
};

export type Religion = {
  religion_id: number;
  religion_name: string;
};

export type EmploymentStatus = {
  employment_status_id: number;
  employment_status_name: string;
};
