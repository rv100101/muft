import { FieldErrors, FieldValues } from "react-hook-form";

const mapErrorsToSections = (errors: FieldErrors<FieldValues>): number[] => {
  const sectionArray: string[][] = [
    ["nickname", "gender", "nationality", "birthInfo"],
    ["country", "region"],
    ["education", "religion", "ethnicity"],
    ["language"],
    ["eyes", "hair", "height", "weight", "bodyType", "bodyArt"],
    ["drinking", "smoking", "livingStatus", "car"],
    ["pets"],
    ["favoriteFood"],
    ["workout", "disability"],
    ["maritalStatus", "haveChildren", "wantChildren"],
    ["employmentStatus", "occupationTitle", "income"],
    ["interest"],
  ];

  const errorSections: number[] = [];

  // Iterate through each section
  sectionArray.forEach((section, index) => {
    // Check if any field in the section has an error
    if (section.some((field) => errors[field])) {
      errorSections.push(index);
    }
  });

  return errorSections;
};

export default mapErrorsToSections;
