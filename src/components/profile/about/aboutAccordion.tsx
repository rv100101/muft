import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import AboutAccordionContent from "./aboutAccordionContent";
import { useQuery } from "@tanstack/react-query";
import profileContentQuery from "@/queries/profile/profileContent";
import profileAboutContentStore, {
  ProfileAbout,
} from "@/zustand/profile/profileAboutStore";
import {useEffect} from "react";
const AboutAccordion = ({userId} : {userId: number}) => {
  const setIsLoading = profileAboutContentStore((state) => state.setIsLoading);
  const setAboutData = profileAboutContentStore((state) => state.setData);
  const { isLoading, isRefetching } = useQuery({
    queryKey: ["profileContent", userId],
    refetchInterval: Infinity,
    queryFn: async () => {
      const basicInfo = await profileContentQuery.fetchBasicInfoInitialData(
        userId,
      );
      const workEducation = await profileContentQuery
        .fetchWorkEducationInitialData(userId);
      const location = await profileContentQuery.fetchLocationInitialData(
        userId,
      );
      const details = await profileContentQuery.fetchDetailsInitialData(
        userId,
      );
      return {
        ...basicInfo,
        ...workEducation,
        ...location,
        ...details,
      };
    },
    onSuccess: (data: ProfileAbout) => {
      setAboutData(data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsLoading(isLoading || isRefetching);
  }, [isLoading, setIsLoading, isRefetching]);

  return (
    <div className="flex flex-row justify-between">
      <Accordion
        type="single"
        collapsible
        className="w-full underline-0"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="px-5 py-1">
          <AccordionTrigger className="">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              About
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <AboutAccordionContent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutAccordion;
