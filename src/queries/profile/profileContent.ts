import { ProfileAbout } from "@/zustand/profile/profileAboutStore";
import axiosQuery from "../axios";
import { FavoriteFood, Interest, Languages, Pets } from "@/types/profile";

const removeNull = (
  obj: Record<string, string | []>
): Record<string, string | []> => {
  const result: Record<string, string | []> = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = obj[key];
    } else if (obj[key] == null) {
      result[key] = "";
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

const fetchMemberDetails = async (
  memberId: number,
  sender: number,
  lang: string
) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("member", memberId.toString());
  formData.append("sender", sender.toString());
  formData.append("lang", lang);
  try {
    const details = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_details.php",
      formData
    );
    const { data } = details;
    return data[0];
  } catch (error) {
    return;
  }
};

const fetchAdditionalInformation = async (userId: number, lang: string) => {
  const id = userId.toString();

  const languagesFormData = new FormData();
  languagesFormData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  languagesFormData.append("member", id);
  languagesFormData.append("lang", lang);

  const petsFormData = new FormData();
  petsFormData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  petsFormData.append("member", id);
  petsFormData.append("lang", lang);

  const interestFormData = new FormData();
  interestFormData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  interestFormData.append("member", id);
  interestFormData.append("lang", lang);

  const favoriteFoodFormData = new FormData();
  favoriteFoodFormData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  favoriteFoodFormData.append("member", id);
  favoriteFoodFormData.append("lang", lang);

  try {
    const pets = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_pets.php",
      petsFormData
    );

    const interests = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_interests.php",
      interestFormData
    );

    const languages = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_languages.php",
      languagesFormData
    );

    const appearance = await axiosQuery.post("/GetAppearance", {
      member: userId,
    });

    const favoriteFood = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_favorite_food.php",
      favoriteFoodFormData
    );

    let additionalInformation: Record<string, string | []> = {
      pets: pets.data ?? [],
      interest: interests.data ?? [],
      language: languages.data ?? [],
      height: appearance.data.height,
      weight: appearance.data.weight,
      favoriteFood: favoriteFood.data ?? [],
    };

    additionalInformation = removeNull(additionalInformation);

    return additionalInformation;
  } catch (error) {
    return {
      error: error,
    };
  }
};

const getGender = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/gender.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getNationality = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/nationalities.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getInterests = async (memberId: string, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId);
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/interests.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEmploymentStatus = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/employment_status.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getReligion = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/religion.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEthnicity = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/ethnicity.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getMaritalStatus = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/marital_status.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getLanguages = async (lang: string, member: number) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    formData.append("member", member.toString());
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/languages.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getHair = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/hair.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getHaveChildren = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/have_children.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getWantChildren = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/want_children.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getWorkout = async (memberId: string, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", memberId);
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/workout.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getDisability = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/disability.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getPets = async (member: string, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("member", member);
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/pets.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getDrink = async (lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  try {
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/drink.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getSmoke = async (lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  try {
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/smoking.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getLivingStatus = async (lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  try {
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/living_status.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCar = async (lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("lang", lang);
  try {
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/car.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEducation = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/education.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getOccupations = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/occupation.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getIncomes = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/income.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getFavoriteFoods = async (memberId: string, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );

    formData.append("member", memberId);
    formData.append("lang", lang);

    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/favorite_foods.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getBodyTypes = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/body_type.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCountries = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/countries.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getStates = async (countryCode: string, lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("country", countryCode);
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/states.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEyes = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/eyes.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const getBodyArts = async (lang: string) => {
  try {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    const response = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/body_arts.php",
      formData
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export type ProfileContent = ProfileAbout & {
  nickname: string;
  deletedLanguages: Languages[];
  deletedFavoriteFoods: FavoriteFood[];
  deletedPets: Pets[];
  deletedInterests: Interest[];
};

const saveInformation = async (profile: ProfileContent, userId: number) => {
  try {
    // gender
    if (profile.gender) {
      await axiosQuery.post("/SaveGender", {
        gender: profile.gender,
        member: userId,
      });
    }

    // pets
    if (profile.pets) {
      for (const pet of profile.pets) {
        await axiosQuery.post("/SavePet", {
          pet: pet.pet_id,
          member: userId,
        });
      }
    }

    // language
    if (profile.language) {
      for (const lang of profile.language) {
        await axiosQuery.post("/SaveLanguage", {
          language: lang.language_code,
          member: userId,
        });
      }
    }

    // delete language
    if (profile.deletedLanguages) {
      for (const lang of profile.deletedLanguages) {
        await axiosQuery.post("/DeleteLanguage", {
          lang: lang.member_language_id,
          member: userId,
        });
      }
    }

    // delete language
    if (profile.deletedFavoriteFoods) {
      for (const ff of profile.deletedFavoriteFoods) {
        await axiosQuery.post("/DeleteFavoriteFood", {
          favorite_food: ff.member_favorite_food_id,
          member: userId,
        });
      }
    }

    // delete language
    if (profile.deletedPets) {
      for (const pet of profile.deletedPets) {
        await axiosQuery.post("/DeletePet", {
          pet: pet.member_pet_id,
          member: userId,
        });
      }
    }

    // delete language
    if (profile.deletedInterests) {
      for (const interest of profile.deletedInterests) {
        await axiosQuery.post("/DeleteInterest", {
          interest: interest.member_interest_id,
          member: userId,
        });
      }
    }

    // interest
    if (profile.interest) {
      for (const interest of profile.interest) {
        await axiosQuery.post("/SaveInterest", {
          interest: interest.interest_id,
          member: userId,
        });
      }
    }

    // disability
    if (profile.disability) {
      await axiosQuery.post("/SaveDisability", {
        disability: profile.disability,
        member: userId,
      });
    }

    // workout
    if (profile.workout) {
      await axiosQuery.post("/SaveWorkout", {
        workout: profile.workout,
        member: userId,
      });
    }

    // hair
    if (profile.hair) {
      await axiosQuery.post("/SaveHair", {
        hair: profile.hair,
        member: userId,
      });
    }

    // eyes
    if (profile.eyes) {
      await axiosQuery.post("/SaveEyes", {
        eyes: profile.eyes,
        member: userId,
      });
    }

    // drink
    if (profile.drinking) {
      await axiosQuery.post("/SaveDrink", {
        drink: profile.drinking,
        member: userId,
      });
    }

    // smoke
    if (profile.smoking) {
      await axiosQuery.post("/SaveSmoke", {
        smoke: profile.smoking,
        member: userId,
      });
    }

    // car
    if (profile.car) {
      await axiosQuery.post("/SaveCar", {
        car: profile.car,
        member: userId,
      });
    }

    // haveChildren
    if (profile.haveChildren) {
      await axiosQuery.post("/SaveHaveChildren", {
        have_children: profile.haveChildren,
        member: userId,
      });
    }

    // wantChildren
    if (profile.wantChildren) {
      await axiosQuery.post("/SaveWantChildren", {
        want_children: profile.wantChildren,
        member: userId,
      });
    }

    // livingStatus
    if (profile.livingStatus) {
      await axiosQuery.post("/SaveLivingStatus", {
        living_status: profile.livingStatus,
        member: userId,
      });
    }

    // bodyArt
    if (profile.bodyArt) {
      await axiosQuery.post("/SaveBodyArt", {
        body_art: profile.bodyArt,
        member: userId,
      });
    }

    // religion
    if (profile.religion) {
      await axiosQuery.post("/SaveReligion", {
        religion: profile.religion,
        member: userId,
      });
    }

    // nationality
    if (profile.nationality) {
      await axiosQuery.post("/SaveNationality", {
        nationality: profile.nationality,
        member: userId,
      });
    }

    // birthInfo
    if (profile.birthInfo) {
      await axiosQuery.post("/SaveBirthday", {
        birthday: profile.birthInfo,
        member: userId,
      });
    }

    // ethnicity
    if (profile.ethnicity) {
      await axiosQuery.post("/SaveEthnicity", {
        ethnicity: profile.ethnicity,
        member: userId,
      });
    }

    // maritalStatus
    if (profile.maritalStatus) {
      await axiosQuery.post("/SaveMaritalStatus", {
        marital_status: profile.maritalStatus,
        member: userId,
      });
    }

    // education
    if (profile.education) {
      await axiosQuery.post("/SaveEducation", {
        education: profile.education,
        member: userId,
      });
    }

    // employmentStatus
    if (profile.employmentStatus) {
      await axiosQuery.post("/SaveEmploymentStatus", {
        employment_status: profile.employmentStatus,
        member: userId,
      });
    }

    // occupation
    if (profile.occupationTitle) {
      await axiosQuery.post("/SaveOccupation", {
        occupation: profile.occupationTitle,
        member: userId,
      });
    }

    // income_range
    if (profile.income) {
      await axiosQuery.post("/SaveIncome", {
        income: profile.income,
        member: userId,
      });
    }

    // height
    if (profile.height) {
      await axiosQuery.post("/SaveHeight", {
        height: profile.height,
        member: userId,
      });
    }

    // weight
    if (profile.weight) {
      await axiosQuery.post("/SaveWeight", {
        weight: profile.weight,
        member: userId,
      });
    }

    // bodyType
    if (profile.bodyType) {
      await axiosQuery.post("/SaveBodyType", {
        body_type: profile.bodyType,
        member: userId,
      });
    }

    // favoriteFood
    if (profile.favoriteFood) {
      for (const food of profile.favoriteFood) {
        await axiosQuery.post("/SaveFavoriteFood", {
          favorite_food: food.favorite_food_id,
          member: userId,
        });
      }
    }

    // country
    if (profile.country) {
      await axiosQuery.post("/SaveCountry", {
        country: profile.country,
        member: userId,
      });
    }

    // nickname
    if (profile.nickname) {
      await axiosQuery.post("/SaveNickname", {
        nickname: profile.nickname,
        member: userId,
      });
    }

    // city
    await axiosQuery.post("/SaveCity", {
      city: 2,
      member: userId,
    });

    // region
    if (profile.region) {
      await axiosQuery.post("/SaveState", {
        state: profile.region,
        member: userId,
      });
    }

    return { success: "Profile saved successfully!" };
  } catch (error) {
    console.error("Error saving information:", error);
  }
};

const saveOnboarding = async (
  profile: ProfileContent,
  userId: number,
  step: number
) => {
  try {
    if (step == 1) {
      // gender
      if (profile.gender) {
        await axiosQuery.post("/SaveGender", {
          gender: profile.gender,
          member: userId,
        });
      }
      // nickname
      if (profile.nickname) {
        await axiosQuery.post("/SaveNickname", {
          nickname: profile.nickname,
          member: userId,
        });
      }
      // nationality
      if (profile.nationality) {
        await axiosQuery.post("/SaveNationality", {
          nationality: profile.nationality,
          member: userId,
        });
      }
      // birthInfo
      if (profile.birthInfo) {
        await axiosQuery.post("/SaveBirthday", {
          birthday: profile.birthInfo,
          member: userId,
        });
      }
    } else if (step == 2) {
      // country
      if (profile.country) {
        await axiosQuery.post("/SaveCountry", {
          country: profile.country,
          member: userId,
        });
      }

      // city
      await axiosQuery.post("/SaveCity", {
        city: 2,
        member: userId,
      });

      // region
      if (profile.region) {
        await axiosQuery.post("/SaveState", {
          state: profile.region,
          member: userId,
        });
      }
    } else if (step == 3) {
      // education
      if (profile.education) {
        await axiosQuery.post("/SaveEducation", {
          education: profile.education,
          member: userId,
        });
      }
      // religion
      if (profile.religion) {
        await axiosQuery.post("/SaveReligion", {
          religion: profile.religion,
          member: userId,
        });
      }
      // ethnicity
      if (profile.ethnicity) {
        await axiosQuery.post("/SaveEthnicity", {
          ethnicity: profile.ethnicity,
          member: userId,
        });
      }
    } else if (step == 4) {
      // language
      if (profile.language) {
        for (const lang of profile.language) {
          await axiosQuery.post("/SaveLanguage", {
            language: lang.language_code,
            member: userId,
          });
        }
      }
    } else if (step == 5) {
      // hair
      if (profile.hair) {
        await axiosQuery.post("/SaveHair", {
          hair: profile.hair,
          member: userId,
        });
      }

      // eyes
      if (profile.eyes) {
        await axiosQuery.post("/SaveEyes", {
          eyes: profile.eyes,
          member: userId,
        });
      }

      // bodyArt
      if (profile.bodyArt) {
        await axiosQuery.post("/SaveBodyArt", {
          body_art: profile.bodyArt,
          member: userId,
        });
      }

      // height
      if (profile.height) {
        await axiosQuery.post("/SaveHeight", {
          height: profile.height,
          member: userId,
        });
      }

      // weight
      if (profile.weight) {
        await axiosQuery.post("/SaveWeight", {
          weight: profile.weight,
          member: userId,
        });
      }

      // bodyType
      if (profile.bodyType) {
        await axiosQuery.post("/SaveBodyType", {
          body_type: profile.bodyType,
          member: userId,
        });
      }
    } else if (step == 6) {
      // drink
      if (profile.drinking) {
        await axiosQuery.post("/SaveDrink", {
          drink: profile.drinking,
          member: userId,
        });
      }

      // smoke
      if (profile.smoking) {
        await axiosQuery.post("/SaveSmoke", {
          smoke: profile.smoking,
          member: userId,
        });
      }

      // car
      if (profile.car) {
        await axiosQuery.post("/SaveCar", {
          car: profile.car,
          member: userId,
        });
      }

      // livingStatus
      if (profile.livingStatus) {
        await axiosQuery.post("/SaveLivingStatus", {
          living_status: profile.livingStatus,
          member: userId,
        });
      }
    } else if (step == 7) {
      // pets
      if (profile.pets) {
        for (const pet of profile.pets) {
          await axiosQuery.post("/SavePet", {
            pet: pet.pet_id,
            member: userId,
          });
        }
      }
    } else if (step == 8) {
      // favoriteFood
      if (profile.favoriteFood) {
        for (const food of profile.favoriteFood) {
          await axiosQuery.post("/SaveFavoriteFood", {
            favorite_food: food.favorite_food_id,
            member: userId,
          });
        }
      }
    } else if (step == 9) {
      // disability
      if (profile.disability) {
        await axiosQuery.post("/SaveDisability", {
          disability: profile.disability,
          member: userId,
        });
      }

      // workout
      if (profile.workout) {
        await axiosQuery.post("/SaveWorkout", {
          workout: profile.workout,
          member: userId,
        });
      }
    } else if (step == 10) {
      // haveChildren
      if (profile.haveChildren) {
        await axiosQuery.post("/SaveHaveChildren", {
          have_children: profile.haveChildren,
          member: userId,
        });
      }

      // wantChildren
      if (profile.wantChildren) {
        await axiosQuery.post("/SaveWantChildren", {
          want_children: profile.wantChildren,
          member: userId,
        });
      }

      // maritalStatus
      if (profile.maritalStatus) {
        await axiosQuery.post("/SaveMaritalStatus", {
          marital_status: profile.maritalStatus,
          member: userId,
        });
      }
    } else if (step == 11) {
      // employmentStatus
      if (profile.employmentStatus) {
        await axiosQuery.post("/SaveEmploymentStatus", {
          employment_status: profile.employmentStatus,
          member: userId,
        });
      }

      // occupation
      if (profile.occupationTitle) {
        await axiosQuery.post("/SaveOccupation", {
          occupation: profile.occupationTitle,
          member: userId,
        });
      }

      // income_range
      if (profile.income) {
        await axiosQuery.post("/SaveIncome", {
          income: profile.income,
          member: userId,
        });
      }
    } else if (step == 12) {
      // interest
      if (profile.interest) {
        for (const interest of profile.interest) {
          await axiosQuery.post("/SaveInterest", {
            interest: interest.interest_id,
            member: userId,
          });
        }
      }
    } else {
      return { failed: "saving failed" };
    }

    return { success: "Profile saved successfully!" };
  } catch (error) {
    console.error("Error saving information:", error);
  }
};

const profileContentQuery = {
  fetchAdditionalInformation,
  editOptions: {
    getNationality,
    getEthnicity,
    getMaritalStatus,
    getLanguages,
    getOccupations,
    getEducation,
    getIncomes,
    getFavoriteFoods,
    getBodyTypes,
    getStates,
    getCountries,
    getHair,
    getEyes,
    getBodyArts,
    getPets,
    getDrink,
    getSmoke,
    getLivingStatus,
    getCar,
    getHaveChildren,
    getWantChildren,
    getWorkout,
    getDisability,
    getInterests,
    getReligion,
    getEmploymentStatus,
    getGender,
  },
  saveInformation,
  saveOnboarding,
  fetchMemberDetails,
};

export default profileContentQuery;
