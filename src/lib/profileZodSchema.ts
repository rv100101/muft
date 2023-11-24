import * as z from "zod";

export const emptyDefault = {
  gender: "",
  nationality: "",
  birthInfo: "",
  ethnicity: "",
  maritalStatus: "",
  language: "",
  education: "",
  employmentStatus: "",
  occupationTitle: "",
  income: "",
  height: "",
  weight: "",
  bodyType: "",
  favoriteFood: "",
  country: "",
  region: "",
  nickname: "",
  profilePhoto: "",
};

export const ProfileFormSchema = z.object({
  gender: z.string().min(1, { message: "Please select a gender" }).nullable(),
  nationality: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a nationality" })
    .nullable(),
  birthInfo: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please enter your birthday" }),
  ethnicity: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select an ethnicity" })
    .nullable(),
  maritalStatus: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a marital status" })
    .nullable(),
  language: z
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a language" })
    .nullable(),
  education: z
    .string({
      required_error: "Education information is required",
    })
    .nullable(),
  employmentStatus: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "Value is too short" })
    .nullable(),
  occupationTitle: z
    .string({
      required_error: "Occupation information is required",
    })
    .nullable(),
  income: z
    .string({
      required_error: "Income information is required",
    })
    .nullable(),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .nonnegative({ message: "Invalid height" })
    .nullable(),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .nonnegative({ message: "Invalid weight" })
    .nullable(),
  bodyType: z
    .string({
      required_error: "Please select body type that matches you",
    })
    .nullable(),
  favoriteFood: z
    .string({
      required_error: "Please select your preferred food",
    })
    .nullable(),
  country: z
    .string({
      required_error: "Country is required",
    })
    .min(2, { message: "Invalid country" })
    .nullable(),
  region: z
    .string({
      required_error: "Region is required",
    })
    .min(2, { message: "Invalid region" })
    .nullable(),
  nickname: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" })
    .nullable(),
});
