import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { MaritalStatus, HaveChildren, WantChildren } from "@/types/profile";
import MaritalStatusForm from "../profile/about/forms/maritalStatusForm";
import { useTranslation } from "react-i18next";

const MaritalStatusStep = () => {
  const [, i18n] = useTranslation();
  const {
    setMaritalStatus, setHaveChildren, setWantChildren
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getMaritalStatus(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["maritalStatus", i18n.language],
    onSuccess: (data: MaritalStatus[]) => {
      setMaritalStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHaveChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["haveChildren", i18n.language],
    onSuccess: (data: HaveChildren[]) => {
      setHaveChildren(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWantChildren(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["wantChildren", i18n.language],
    onSuccess: (data: WantChildren[]) => {
      setWantChildren(data);
    },
  });

  return (
    <div className="w-full sm:w-1/2">
      <MaritalStatusForm />
    </div>
  )
}

export default MaritalStatusStep
