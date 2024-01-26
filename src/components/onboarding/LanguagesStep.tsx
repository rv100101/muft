import LanguagesForm from "../profile/about/forms/languagesForm";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Languages } from "@/types/profile";
import { useUserStore } from "@/zustand/auth/user";

const LanguagesStep = () => {
  const [, i18n] = useTranslation();
  const {
    setLanguages
  } = selectOptions();

  const user = useUserStore(state => state.user);


  useQuery({
    queryFn: () => profileContentQuery.editOptions.getLanguages(i18n.language, user!.member_id),
    queryKey: ["languages"],
    onSuccess: (data: Languages[]) => {
      console.log(data);
      setLanguages(data);
    },
  });

  return (
    <div className="w-1/2">
      <LanguagesForm />
    </div>
  )
}

export default LanguagesStep
