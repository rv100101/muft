import { useTranslation } from "react-i18next";
import BasicInformationForm from "../profile/about/forms/basicInformationForm"
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Nationality } from "@/types/profile";

const BasicInformationStep = () => {
  const [, i18n] = useTranslation();
  const {
    setNationalities
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getNationality(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["nationalities", i18n.language],
    onSuccess: (data: Nationality[]) => {
      setNationalities(data);
    },
  });
  return (
    <div>
      <BasicInformationForm />
    </div>
  )
}

export default BasicInformationStep
