import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Workout, Disability } from "@/types/profile";
import HealthForm from "../profile/about/forms/healthForm";

const HealthStep = () => {
  const [, i18n] = useTranslation();
  const {
    setWorkout, setDisability
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getWorkout(),
    refetchInterval: Infinity,
    queryKey: ["workout"],
    onSuccess: (data: Workout[]) => {
      setWorkout(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getDisability(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["disability", i18n.language],
    onSuccess: (data: Disability[]) => {
      setDisability(data);
    },
  });

  return (
    <div className="w-full sm:w-1/2">
      <HealthForm />
    </div>
  )
}

export default HealthStep
