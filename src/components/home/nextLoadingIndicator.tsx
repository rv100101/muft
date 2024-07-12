import membersQuery from "@/queries/home";
import useHomePageNumber from "@/zustand/home/pageNumber";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/zustand/auth/user";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useFilterStore } from "@/zustand/home/filter";
import logo from "@/assets/single-logo.png";

const NextLoadingIndicator = () => {
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );

  const filterValues = useFilterStore((state) => state.filters);

  const currentMemberList = useHomepageViewStore(
    (state) => state.modifiedMemberList
  );

  const { value: pageNumber, setPageNumber } = useHomePageNumber();
  const user = useUserStore((state) => state.user);
  const [, i18n] = useTranslation();
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const [isFetchingNewMembers, setIsFetchingNewMembers] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const getMembers = membersQuery.getMembersAndIsBlocked(
    user!.member_id,
    i18n.language,
    pageNumber + 1
  );

  useEffect(() => {
    const getNewMemberListing = async () => {
      setIsFetchingNewMembers(true);
      try {
        const res = await getMembers;
        setPageNumber(pageNumber + 1);
        if (res) {
          setMemberList(
            [...currentMemberList, ...res.HomePage]
          );
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetchingNewMembers(false);
    }
    if (!entry && hasEntered) {
      setHasEntered(false);
    }
    if (entry && !isFetchingNewMembers && !hasEntered && filterValues?.min_age == 18 && filterValues?.max_age == 80) {
      setHasEntered(true);
      getNewMemberListing();
    }
  }, [currentMemberList, entry, filterValues?.max_age, filterValues?.min_age, getMembers, hasEntered, isFetchingNewMembers, pageNumber, setMemberList, setPageNumber])

  return (
    <div ref={ref} className="flex flex-col items-center bg-white m-5 lg:w-[500px] w-[350px] dark:bg-[#334155]">
      {/* <Skeleton className="h-[500px] w-full" /> */}
      <img src={logo} className="animate-bounce h-16 md:h-24 md:mt-4" alt="muffin-logo" />
      <div className="h-8" />
    </div>
  )
}

export default NextLoadingIndicator;
