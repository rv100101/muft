import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import profileContentQuery from "@/queries/profile/profileContent";
import { Hair, Eye, BodyType, BodyArt } from "@/types/profile";
import AppearanceForm from "../profile/about/forms/appearanceForm";

const AppearanceStep = () => {
  const [, i18n] = useTranslation();
  const {
    setEyes, setHair, setBodyTypes, setBodyArts
  } = selectOptions();

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getHair(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["hair", i18n.language],
    onSuccess: (data: Hair[]) => {
      setHair(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getEyes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["eyes", i18n.language],
    onSuccess: (data: Eye[]) => {
      setEyes(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getBodyArts(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["bodyArts", i18n.language],
    onSuccess: (data: BodyArt[]) => {
      setBodyArts(data);
    },
  });

  useQuery({
    queryFn: () => profileContentQuery.editOptions.getBodyTypes(i18n.language),
    refetchInterval: Infinity,
    queryKey: ["bodyTypes", i18n.language],
    onSuccess: (data: BodyType[]) => {
      setBodyTypes(data);
    },
  });

  return (
    <div className="w-1/2">
      <AppearanceForm />
    </div>
  )
}

export default AppearanceStep
