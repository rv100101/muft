import { FavoriteFood, Interest, Languages, Pets } from "@/types/profile";
import * as z from "zod";

export const emptyDefault = {
  religion: "",
  gender: "",
  nationality: "",
  birthInfo: "",
  ethnicity: "",
  maritalStatus: "",
  language: [] as Languages[],
  education: "",
  employmentStatus: "",
  occupationTitle: "",
  income: "",
  height: 0,
  weight: 0,
  bodyType: "",
  favoriteFood: [] as FavoriteFood[],
  country: "",
  region: "",
  nickname: "",
  profilePhoto: "",
  hair: "",
  eyes: "",
  bodyArt: "",
  haveChildren: "",
  wantChildren: "",
  workout: "",
  disability: "",
  pets: [] as Pets[],
  drinking: "",
  smoking: "",
  livingStatus: "",
  car: "",
  interest: [] as Interest[],
};

export const ProfileFormSchema = z.object({
  gender: z.string().min(1, { message: "Please select a gender" }),
  nationality: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a nationality" }),
  birthInfo: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please enter your birthday" }),
  ethnicity: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select an ethnicity" }),
  maritalStatus: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a marital status" }),
  language: z
    .array(
      z.object({
        language_name: z.string(),
        language_code: z.string(),
      })
    )
    .refine((data) => data.length > 0, {
      message: "Pick at least one language",
    }),
  education: z
    .string({
      required_error: "Education information is required",
    })
    .min(2, { message: "Please select an education" }),
  employmentStatus: z
    .string({ required_error: "This field is required" })
    .min(2, { message: "Please select employment status" }),
  occupationTitle: z
    .string({
      required_error: "Occupation information is required",
    })
    .min(2, { message: "Please select an occupation" }),
  income: z
    .string({
      required_error: "Income information is required",
    })
    .min(2, { message: "Please select income range" }),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .min(55, { message: "Minimum height is 55 cm" })
    .max(260, { message: "Max height is 260 cm" })
    .nonnegative({ message: "Invalid height" }),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(25, { message: "Minimum weight is 25 kg" })
    .max(600, { message: "Max weight is 600 kg" })
    .nonnegative({ message: "Invalid weight" }),
  bodyType: z
    .string({
      required_error: "Please select body type that matches you",
    })
    .min(2, { message: "Please select your body type" }),
  interest: z
    .array(
      z.object({
        interest_name: z.string(),
        interest_id: z.number(),
      })
    )
    .refine((data) => data.length > 0, {
      message: "Pick at least one interest",
    }),
  favoriteFood: z
    .array(
      z.object({
        favorite_food_name: z.string(),
        favorite_food_id: z.number(),
        authorized: z.boolean(),
        ip_address: z.string(),
      })
    )
    .refine((data) => data.length > 0, {
      message: "Pick at least one favorite food",
    }),
  country: z
    .string({
      required_error: "Country is required",
    })
    .min(2, { message: "Invalid country" }),
  region: z
    .string({
      required_error: "Region is required",
    })
    .min(2, { message: "Invalid region" }),
  religion: z
    .string({
      required_error: "Religion is required",
    })
    .min(2, { message: "Religion is required" }),
  nickname: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  hair: z
    .string({
      required_error: "Hair type is required",
    })
    .min(2, { message: "Hair type is required" }),
  eyes: z
    .string({
      required_error: "Eyes is required",
    })
    .min(2, { message: "Eye type is required" }),
  bodyArt: z
    .string({
      required_error: "Body art is required",
    })
    .min(2, { message: "Body art is required" }),
  haveChildren: z
    .string({
      required_error: "Have children is required",
    })
    .min(2, { message: "This field is required" }),
  wantChildren: z
    .string({
      required_error: "Want children is required",
    })
    .min(2, { message: "This field is required" }),
  workout: z
    .string({
      required_error: "Workout is required",
    })
    .min(2, { message: "Workout is required" }),
  disability: z
    .string({
      required_error: "Disability is required",
    })
    .min(2, { message: "Disability is required" }),
  pets: z
    .array(
      z.object({
        pet_name: z.string(),
        pet_id: z.number(),
      })
    )
    .refine((data) => data.length > 0, {
      message: "Pick at least one pet",
    }),
  drinking: z
    .string({
      required_error: "Drinking is required",
    })
    .min(2, { message: "Drinking is required" }),
  smoking: z
    .string({
      required_error: "Smoking is required",
    })
    .min(2, { message: "Smoking is required" }),
  livingStatus: z
    .string({
      required_error: "Living status is required",
    })
    .min(2, { message: "Living status is required" }),
  car: z
    .string({
      required_error: "Car is required",
    })
    .min(2, { message: "Car is required" }),
});
