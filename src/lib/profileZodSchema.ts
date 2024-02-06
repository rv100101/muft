import { FavoriteFood, Interest, Languages, Pets } from "@/types/profile";
import { TFunction } from "i18next";
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

export const ProfileFormSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    gender: z.string().min(1, { message: t("validation.selectGender") }),
    nationality: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.selectNationality") }),
    birthInfo: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.enterBirthday") })
      .refine(
        (value) => {
          // Convert input string to a Date object
          const dob = new Date(value);

          // Calculate age based on current date
          const age = new Date(Date.now() - dob.getTime()).getFullYear() - 1970;

          // Validate age against conditions (18 <= age <= 80)
          return age >= 18 && age <= 80;
        },
        {
          message: t("validation.invalidAge"),
        }
      ),
    ethnicity: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.selectEthnicity") }),
    maritalStatus: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.selectMaritalStatus") }),
    language: z
      .array(
        z.object({
          language_name: z.string(),
          language_code: z.string().or(z.number()),
        })
      )
      .refine(
        (data) => {
          console.log("LANGUAGE!!!", data);
          return data.length > 0;
        },
        {
          message: t("validation.pickLanguage"),
        }
      ),
    education: z
      .string({
        required_error: t("validation.educationInfoRequired"),
      })
      .min(2, { message: t("validation.selectEducation") }),
    employmentStatus: z
      .string({ required_error: t("validation.fieldRequired") })
      .min(2, { message: t("validation.selectEmploymentStatus") }),
    occupationTitle: z
      .string({
        required_error: t("validation.occupationInfoRequired"),
      })
      .min(2, { message: t("validation.selectOccupation") }),
    income: z
      .string({
        required_error: t("validation.incomeInfoRequired"),
      })
      .min(2, { message: t("validation.selectIncomeRange") }),
    height: z
      .number({
        required_error: t("validation.heightRequired"),
        invalid_type_error: t("validation.heightNumbersOnly"),
      })
      .min(55, { message: t("validation.minHeight") })
      .max(260, { message: t("validation.maxHeight") })
      .nonnegative({ message: t("validation.invalidHeight") }),
    weight: z
      .number({
        required_error: t("validation.weightRequired"),
        invalid_type_error: t("validation.weightNumbersOnly"),
      })
      .min(25, { message: t("validation.minWeight") })
      .max(600, { message: t("validation.maxWeight") })
      .nonnegative({ message: t("validation.invalidWeight") }),
    bodyType: z
      .string({
        required_error: t("validation.selectBodyType"),
      })
      .min(2, { message: t("validation.selectYourBodyType") }),
    interest: z
      .array(
        z.object({
          interest_name: z.string(),
          interest_id: z.string().or(z.number()),
        })
      )
      .refine((data) => data.length > 0, {
        message: t("validation.pickInterest"),
      }),
    favoriteFood: z
      .array(
        z.object({
          favorite_food_name: z.string(),
          favorite_food_id: z.string().or(z.number()),
          authorized: z.boolean(),
          ip_address: z.string(),
        })
      )
      .refine((data) => data.length > 0, {
        message: t("validation.pickFavoriteFood"),
      }),
    country: z
      .string({
        required_error: t("validation.countryRequired"),
      })
      .min(2, { message: t("validation.invalidCountry") }),
    region: z
      .string({
        required_error: t("validation.regionRequired"),
      })
      .min(2, { message: t("validation.regionRequired") }),
    religion: z
      .string({
        required_error: t("validation.religionRequired"),
      })
      .min(2, { message: t("validation.religionRequired") }),
    nickname: z
      .string({
        required_error: t("validation.nicknameRequired"),
      })
      .min(3, { message: t("validation.nameIsTooShort") })
      .max(12, { message: t("validation.nicknameLength") })
      .regex(/^[a-zA-Z]+$/, { message: t("validation.invalidNickname") }),
    hair: z
      .string({
        required_error: t("validation.hairTypeRequired"),
      })
      .min(2, { message: t("validation.hairTypeRequired") }),
    eyes: z
      .string({
        required_error: t("validation.eyeTypeRequired"),
      })
      .min(2, { message: t("validation.eyeTypeRequired") }),
    bodyArt: z
      .string({
        required_error: t("validation.bodyArtRequired"),
      })
      .min(2, { message: t("validation.bodyArtRequired") }),
    haveChildren: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
    wantChildren: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
    workout: z
      .string({
        required_error: t("validation.workoutRequired"),
      })
      .min(2, { message: t("validation.workoutRequired") }),
    disability: z
      .string({
        required_error: t("validation.disabilityRequired"),
      })
      .min(2, { message: t("validation.disabilityRequired") }),
    pets: z
      .array(
        z.object({
          pet_name: z.string().or(z.number()),
          pet_id: z.string().or(z.number()),
        })
      )
      .refine((data) => data.length > 0, {
        message: t("validation.pickPet"),
      }),
    drinking: z
      .string({
        required_error: t("validation.drinkingRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
    smoking: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
    livingStatus: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
    car: z
      .string({
        required_error: t("validation.fieldRequired"),
      })
      .min(2, { message: t("validation.fieldRequired") }),
  });
