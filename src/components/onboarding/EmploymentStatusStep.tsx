import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Occupation, Income, EmploymentStatus } from "@/types/profile";
import WorkEducationForm from "../profile/about/forms/workEducationForm";

const EmploymentStatusStep = () => {
  const {
    setOccupations, setIncomes, setEmploymentStatus
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getOccupations(),
    refetchInterval: Infinity,
    queryKey: ["occupations"],
    onSuccess: (data: Occupation[]) => {
      setOccupations(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getIncomes(),
    refetchInterval: Infinity,
    queryKey: ["incomes"],
    onSuccess: (data: Income[]) => {
      setIncomes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEmploymentStatus(),
    queryKey: ["employmentStatus"],
    onSuccess: (data: EmploymentStatus[]) => {
      setEmploymentStatus(data);
    },
  });

  return (
    <div className="w-1/2">
      <WorkEducationForm />
    </div>
  )
}

export default EmploymentStatusStep
