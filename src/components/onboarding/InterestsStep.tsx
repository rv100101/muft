import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Interest, } from "@/types/profile";
import InterestsForm from "../profile/about/forms/interestsForm";

const InterestsStep = () => {
  const {
    setInterest
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getInterests(),
    refetchInterval: Infinity,
    queryKey: ["interests"],
    onSuccess: (data: Interest[]) => {
      setInterest(data);
    },
  });

  return (
    <div className="h-36 w-full sm:w-1/2">
      <InterestsForm />
    </div>
  )
}

export default InterestsStep
