import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { MaritalStatus, HaveChildren, WantChildren } from "@/types/profile";
import MaritalStatusForm from "../profile/about/forms/maritalStatusForm";

const MaritalStatusStep = () => {
  const {
    setMaritalStatus, setHaveChildren, setWantChildren
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getMaritalStatus(),
    refetchInterval: Infinity,
    queryKey: ["maritalStatus"],
    onSuccess: (data: MaritalStatus[]) => {
      setMaritalStatus(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHaveChildren(),
    refetchInterval: Infinity,
    queryKey: ["haveChildren"],
    onSuccess: (data: HaveChildren[]) => {
      setHaveChildren(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWantChildren(),
    refetchInterval: Infinity,
    queryKey: ["wantChildren"],
    onSuccess: (data: WantChildren[]) => {
      setWantChildren(data);
    },
  });

  return (
    <div className="w-1/2">
      <MaritalStatusForm />
    </div>
  )
}

export default MaritalStatusStep
