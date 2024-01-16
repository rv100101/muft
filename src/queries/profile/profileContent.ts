import { ProfileAbout } from "@/zustand/profile/profileAboutStore";
import axiosQuery from "../axios";
import { Languages } from "@/types/profile";

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

// const fetchMemberDetails = async (memberId: number, userId: number) => {
//   try {
//     const details = await axiosQuery.post("/MemberDetails", {
//       member: memberId,
//       user: userId,
//     });
//     const { data } = details;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchMemberDetails = async (memberId: number, lang: string) => {
  const formData = new FormData();
  formData.append(
    "auth",
    "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
  );
  formData.append("member", memberId.toString());
  formData.append("sender", memberId.toString());
  formData.append("lang", lang);
  try {
    const details = await axiosQuery.post(
      "https://muffinapi.azurewebsites.net/member_details.php",
      formData
    );
    const { data } = details;
    console.log(data);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

const fetchAdditionalInformation = async (userId: number) => {
  try {
    const pets = await axiosQuery.post("/GetPets", {
      member: userId,
    });

    // const lifestyle = await axiosQuery.post("/GetLifestyle", {
    //   member: userId,
    // });

    const interests = await axiosQuery.post("/GetInterests", {
      member: userId,
    });

    const languages = await axiosQuery.post("/GetLanguages", {
      member: userId,
    });

    const appearance = await axiosQuery.post("/GetAppearance", {
      member: userId,
    });

    const favoriteFood = await axiosQuery.post("/GetFavoriteFood", {
      member: userId,
    });

    let additionalInformation: Record<string, string | []> = {
      pets: pets.data,
      interest: interests.data ?? [],
      language: languages.data ?? [],
      height: appearance.data.height,
      weight: appearance.data.weight,
      favoriteFood: favoriteFood.data ?? [],
    };

    additionalInformation = removeNull(additionalInformation);

    return additionalInformation;
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
};

const fetchBasicInfoInitialData = async (userId: number) => {
  try {
    const basic = await axiosQuery.post("/GetBasicInfo", { member: userId });
    const background = await axiosQuery.post("/GetBackground", {
      member: userId,
    });
    const maritalStatus = await axiosQuery.post("/GetMaritalStatus", {
      member: userId,
    });

    const languagesResponse: { data: { language_name: string }[] } =
      await axiosQuery.post("/GetLanguages", { member: userId });

    const { gender, nationality, date_of_birth, nickname } = basic.data;
    const { religion_name, ethnicity_name } = background.data;
    const { marital_status_name } = maritalStatus.data;

    let language = null;
    console.log(languagesResponse.data);

    if (
      languagesResponse.data.length !== 0 &&
      languagesResponse.data.length > 1
    ) {
      language = languagesResponse.data[languagesResponse.data.length - 1];
    }

    if (languagesResponse.data.length === 1) {
      language = languagesResponse.data[0];
    }

    const formattedDate =
      date_of_birth === null
        ? ""
        : new Date(date_of_birth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

    const basicInformation: Record<string, string> = {
      gender: gender,
      nationality: nationality,
      birthInfo: formattedDate,
      nickname: nickname,
      religion: religion_name,
      ethnicity: ethnicity_name,
      maritalStatus: marital_status_name,
      language: language?.language_name ?? "",
    };

    // basicInformation = removeNull(basicInformation);
    return basicInformation;
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const fetchWorkEducationInitialData = async (userId: number) => {
  try {
    const response1 = await axiosQuery.post("/GetBackground", {
      member: userId,
    });

    const response2 = await axiosQuery.post("/GetEmployment", {
      member: userId,
    });

    const { education_name } = response1.data;
    const { employment_status_name, occupation_title, income_range } =
      response2.data;

    const workEducationData: Record<string, string> = {
      education: education_name,
      employmentStatus: employment_status_name,
      occupationTitle: occupation_title,
      income: income_range,
    };
    // workEducationData = removeNull(workEducationData);

    return workEducationData;
  } catch (err) {
    console.log(err);
  }
};

const fetchDetailsInitialData = async (userId: number) => {
  try {
    const response3 = await axiosQuery.post("/GetAppearance", {
      member: userId,
    });

    const response4 = await axiosQuery.post("/GetFavoriteFood", {
      member: userId,
    });

    const {
      body_type_name,
      height,
      weight,
      body_art_name,
      hair_name,
      eyes_name,
    } = response3.data;

    let favoriteFood = null;
    if (response4.data.length > 0) {
      favoriteFood = response4.data[0];
    }

    const detailsData: Record<string, string> = {
      height: height,
      weight: weight,
      bodyType: body_type_name,
      hair: hair_name,
      eyes: eyes_name,
      bodyArt: body_art_name,
      favoriteFood: favoriteFood ? favoriteFood!.favorite_food_name : null,
    };

    // detailsData = removeNull(detailsData);
    return detailsData;
  } catch (err) {
    console.log(err);
  }
};

const fetchLocationInitialData = async (userId: number) => {
  try {
    const response = await axiosQuery.post("/GetCountry", { member: userId });
    const { country_name, region_name } = response.data[0];
    const locationData: Record<string, string> = {
      region: region_name,
      country: country_name,
    };
    // locationData = removeNull(locationData);
    return locationData;
  } catch (err) {
    console.log(err);
  }
};

// nationality
// ethnicity
// maritalStatus
// languages

const getNationality = async () => {
  try {
    const response = await axiosQuery.post("/Nationalities");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getInterests = async () => {
  try {
    const response = await axiosQuery.post("/Interests", {
      member: 32,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEmploymentStatus = async () => {
  try {
    const response = await axiosQuery.post("/EmploymentStatus");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getReligion = async () => {
  try {
    const response = await axiosQuery.post("/Religion");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEthnicity = async () => {
  try {
    const response = await axiosQuery.post("/Ethnicity");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getMaritalStatus = async () => {
  try {
    const response = await axiosQuery.post("/MaritalStatus");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getLanguages = async () => {
  try {
    const response = await axiosQuery.post("/Languages", {
      member: 999,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getHair = async () => {
  try {
    const response = await axiosQuery.post("/Hair");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getHaveChildren = async () => {
  try {
    const response = await axiosQuery.post("/HaveChildren");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getWantChildren = async () => {
  try {
    const response = await axiosQuery.post("/WantChildren");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getWorkout = async () => {
  try {
    const response = await axiosQuery.post("/Workout");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getDisability = async () => {
  try {
    const response = await axiosQuery.post("/Disability");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getPets = async () => {
  try {
    const response = await axiosQuery.post("/Pets", {
      member: 32,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getDrink = async () => {
  try {
    const response = await axiosQuery.post("/Drink");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getSmoke = async () => {
  try {
    const response = await axiosQuery.post("/Smoke");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getLivingStatus = async () => {
  try {
    const response = await axiosQuery.post("/LivingStatus");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCar = async () => {
  try {
    const response = await axiosQuery.post("/Car");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEducation = async () => {
  try {
    const response = await axiosQuery.post("/Education");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getOccupations = async () => {
  try {
    const response = await axiosQuery.post("/Occupation");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getIncomes = async () => {
  try {
    const response = await axiosQuery.post("/Income");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getFavoriteFoods = async () => {
  try {
    const response = await axiosQuery.post("/FavoriteFoods", {
      member: 9999,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getBodyTypes = async () => {
  try {
    const response = await axiosQuery.post("/BodyTypes");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCountries = async () => {
  try {
    const response = await axiosQuery.post("/Countries");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getStates = async (countryCode: string) => {
  try {
    const response = await axiosQuery.post("/States", {
      country: countryCode,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

const getEyes = async () => {
  try {
    const response = await axiosQuery.post("/Eyes");
    return response.data;
  } catch (error) {
    return [];
  }
};

const getBodyArts = async () => {
  try {
    const response = await axiosQuery.post("/BodyArts");
    return response.data;
  } catch (error) {
    return [];
  }
};

type ProfileContent = ProfileAbout & {
  nickname: string;
  deletedLanguages: Languages[];
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
          lang: lang.language_code,
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

    // interest
    // if (profile.interest) {
    //   await axiosQuery.post("/SaveInterest", {
    //     interest: profile.interest,
    //     member: userId,
    //   });
    // }

    return { success: "Profile saved successfully!" };
  } catch (error) {
    console.error("Error saving information:", error);
  }
};

const profileContentQuery = {
  fetchBasicInfoInitialData,
  fetchWorkEducationInitialData,
  fetchDetailsInitialData,
  fetchLocationInitialData,
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
  },
  saveInformation,
  fetchMemberDetails,
};

export default profileContentQuery;
