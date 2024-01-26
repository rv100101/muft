import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Pets } from "@/types/profile";
import PetsForm from "../profile/about/forms/petsForm";

const PetsStep = () => {
  const {
    setPets
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getPets(),
    refetchInterval: Infinity,
    queryKey: ["pets"],
    onSuccess: (data: Pets[]) => {
      setPets(data);
    },
  });

  return (
    <div className="w-1/2">
      <PetsForm />
    </div>
  )
}

export default PetsStep;
