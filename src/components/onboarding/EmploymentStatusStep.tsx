import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Occupation, Income, EmploymentStatus } from "@/types/profile";
import WorkEducationForm from "../profile/about/forms/workEducationForm";
import { useTranslation } from "react-i18next";

const EmploymentStatusStep = () => {
  const [, i18n] = useTranslation()
  const {
    setOccupations, setIncomes, setEmploymentStatus
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getOccupations(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["occupations", i18n.language],
    onSuccess: (data: Occupation[]) => {
      setOccupations(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getIncomes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["incomes", i18n.language],
    onSuccess: (data: Income[]) => {
      setIncomes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEmploymentStatus(i18n.language),
    queryKey: ["employmentStatus", i18n.language],
    onSuccess: (data: EmploymentStatus[]) => {
      setEmploymentStatus(data);
    },
  });

  return (
    <div className="w-full sm:w-1/2">
      <WorkEducationForm />
    </div>
  )
}

export default EmploymentStatusStep
