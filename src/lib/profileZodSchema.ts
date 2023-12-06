import * as z from "zod";

export const emptyDefault = {
  religion: "",
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
  height: 0,
  weight: 0,
  bodyType: "",
  favoriteFood: "",
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
  pets: "",
  drinking: "",
  smoking: "",
  livingStatus: "",
  car: "",
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
    .string({
      required_error: "This field is required",
    })
    .min(2, { message: "Please select a language" }),
  education: z
    .string({
      required_error: "Education information is required",
    }),
  employmentStatus: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "Value is too short" }),
  occupationTitle: z
    .string({
      required_error: "Occupation information is required",
    }),
  income: z
    .string({
      required_error: "Income information is required",
    }),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .nonnegative({ message: "Invalid height" }),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .nonnegative({ message: "Invalid weight" }),
  bodyType: z
    .string({
      required_error: "Please select body type that matches you",
    }),
  favoriteFood: z
    .string({
      required_error: "Please select your preferred food",
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
  nickname: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  hair: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  eyes: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  bodyArt: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  haveChildren: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  wantChildren: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  workout: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  disability: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  pets: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  drinking: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  smoking: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  livingStatus: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
  car: z
    .string({
      required_error: "Nickname required",
    })
    .min(2, { message: "Nickname is required" }),
});
