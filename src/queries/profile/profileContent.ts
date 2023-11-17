import axiosQuery from "../axios";

const removeNull = (obj: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (obj[key] == null) {
      result[key] = "Unknown";
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

const fetchBasicInfoInitialData = async (userId: number) => {
  try {
    const basic = await axiosQuery.post(
      "/GetBasicInfo",
      { member: userId },
    );
    const background = await axiosQuery.post(
      "/GetBackground",
      { member: userId },
    );
    const maritalStatus = await axiosQuery.post(
      "/GetMaritalStatus",
      { member: userId },
    );
    const languages = await axiosQuery.post(
      "/GetLanguages",
      { member: userId },
    );
    const { gender, nationality, date_of_birth, age } = basic.data;
    const { religion_name, ethnicity_name } = background.data;
    const { marital_status_name } = maritalStatus.data;
    const { language_name } = languages.data[0];
    const formattedDate = new Date(date_of_birth).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
    let basicInformation: Record<string, string> = {
      gender: gender,
      nationality: nationality,
      birthInfo: formattedDate,
      age: age,
      religion: religion_name,
      ethnicity: ethnicity_name,
      maritalStatus: marital_status_name,
      language: language_name,
    };
    basicInformation = removeNull(basicInformation);
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
    const response1 = await axiosQuery.post(
      "/GetBackground",
      { member: userId },
    );

    const response2 = await axiosQuery.post(
      "/GetEmployment",
      { member: userId },
    );

    const { education_name } = response1.data;
    const { employment_status_name, occupation_title, income_range } =
      response2.data;

    let workEducationData: Record<string, string> = {
      education: education_name,
      employmentStatus: employment_status_name,
      occupationTitle: occupation_title,
      income: income_range,
    };
    workEducationData = removeNull(workEducationData);
    console.log(workEducationData);

    return workEducationData;
  } catch (err) {
    console.log(err);
  }
};

const fetchDetailsInitialData = async (userId: number) => {
  try {
    const response1 = await axiosQuery.post(
      "/GetHeight",
      { member: userId },
    );

    const response2 = await axiosQuery.post(
      "/GetWeight",
      { member: userId },
    );

    const response3 = await axiosQuery.post(
      "/GetAppearance",
      { member: userId },
    );

    const response4 = await axiosQuery.post(
      "/GetFavoriteFood",
      { member: userId },
    );

    const { height } = response1.data[0];

    const { weight } = response2.data[0];
    const { body_type_name } = response3.data;
    const { favorite_food_name } = response4.data[0];

    let detailsData: Record<string, string> = {
      height: height,
      weight: weight,
      bodyType: body_type_name,
      favoriteFood: favorite_food_name,
    };
    detailsData = removeNull(detailsData);
    return detailsData;
  } catch (err) {
    console.log(err);
  }
};

const fetchLocationInitialData = async (userId: number) => {
  try {
    const response = await axiosQuery.post(
      "/GetCountry",
      { member: userId },
    );
    const { country_name, region_name } = response.data[0];
    let locationData: Record<string, string> = {
      region: region_name,
      country: country_name,
    };
    locationData = removeNull(locationData);
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

const getLanguages = async (userId: number) => {
  try {
    const response = await axiosQuery.post("/Languages", {
      member: userId
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

// education
// occupations
// incomes

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
    console.log(response);
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

// favoriteFood
// bodyTypes

const getFavoriteFoods = async (userId: number) => {
  try {
    const response = await axiosQuery.post("/FavoriteFoods", {
      member: userId
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

const profileContentQuery = {
  fetchBasicInfoInitialData,
  fetchWorkEducationInitialData,
  fetchDetailsInitialData,
  fetchLocationInitialData,
  editOptions: {
    getNationality,
    getEthnicity,
    getMaritalStatus,
    getLanguages,
    getOccupations,
    getEducation,
    getIncomes,
    getFavoriteFoods,
    getBodyTypes
  },
};

export default profileContentQuery;
