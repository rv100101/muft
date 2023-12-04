import { useEffect, useRef, useState } from "react";
import PostHeader from "@/components/home/postHeader";
import AuthenticatedLayout from "./authenticatedPages/layout";
// import Suggestions from "@/components/suggestions";
import PostItem from "@/components/home/postItem";
import { useQuery } from "@tanstack/react-query";
import membersQuery from "@/queries/home";
import { Skeleton } from "@/components/ui/skeleton";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useUserStore } from "@/zustand/auth/user";
import HomepageSearchInput from "@/components/homeSearchUsersInput";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "usehooks-ts";
// import { useFormik } from "formik";
// import * as Yup from "yup";

type Member = {
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
  nationality_code: string;
};

const HomePage = () => {
  const [ageSliderVal, setAgeSliderVal] = useState(23);
  const debouncedAgeFilterVal = useDebounce(ageSliderVal, 300);
  // const formik = useFormik({
  //   initialValues: {
  //     age: 0,
  //   },
  //   validationSchema: Yup.object({
  //     age: Yup.string().min(1, "Must be more than 1 characters"),
  //   }),

  //   // onSubmit: (values: FormDataType) => handleSignIn(values),
  //   onSubmit: () => {},
  // });

  const handleSliderChange = (val: Array<number>) => {
    setAgeSliderVal(val[0]);
  };

  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const { user } = useUserStore();
  const memberList = useHomepageViewStore((state) => state.modifiedMemberList);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const getMembers = membersQuery.getMembers(user?.gender == "F" ? 403 : 69);
  const getMemberLikes = membersQuery.getMemberLikes(user!.member_id);
  const getMemberFavorites = membersQuery.getMemberFavorites(user!.member_id);

  const { data: members, isLoading: retrievingMemberData } = useQuery({
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });

  // likes
  const { data: memberLikes } = useQuery({
    queryKey: ["home-members-likes"],
    queryFn: () => getMemberLikes,
  });

  // favorites
  const { data: memberFavorites } = useQuery({
    queryKey: ["home-members-favs"],
    queryFn: () => getMemberFavorites,
  });

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more PostItems (for example, by adding new instances to state)
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
    return () => {
      setSelectedProfileId(null);
    };
  });

  useEffect(() => {
    if (!retrievingMemberData && memberLikes && memberFavorites && members) {
      const updatedMemberList = members.map((member: Member) => {
        const memberHasLikes = memberLikes.find(
          (likes: Member) => member.member_id === likes.member_id
        );

        const memberHasFavorites = memberFavorites?.find(
          (favs: Member) => member.member_id === favs.member_id
        );

        // If a match is found, update the object in the first array
        if (memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: true,
          };
        } else if (!memberHasLikes && memberHasFavorites) {
          return {
            ...member,
            isLiked: false,
            isFavorite: true,
          };
        } else if (memberHasLikes && !memberHasFavorites) {
          return {
            ...member,
            isLiked: true,
            isFavorite: false,
          };
        } else {
          return {
            ...member,
            isLiked: false,
            isFavorite: false,
          };
        }
      });

      const filteredMemberList = updatedMemberList.filter(
        (member: Member) => member.age <= debouncedAgeFilterVal
      );
      // Update state with the modified array
      // console.log(
      //   "🦺 ~ file: homePage.tsx:131 ~ useEffect ~ updatedMemberList:",
      //   ageSliderVal != 0 ? filteredMemberList : updatedMemberList
      // );

      setMemberList(
        debouncedAgeFilterVal > 0 ? filteredMemberList : updatedMemberList
      );
    }
  }, [
    memberLikes,
    memberFavorites,
    members,
    setMemberList,
    retrievingMemberData,
    debouncedAgeFilterVal,
  ]);

  // if (likesLoading || favoritesLoading) {
  //   return <></>;
  // }

  return (
    <AuthenticatedLayout>
      <div className="flex justify-center w-full">
        <div className="flex justify-center lg:grid-cols-9 grid-cols-1 gap-4">
          <div className="hidden lg:block w-32"></div>
          <div className="col-span-4 w-min overflow-auto no-scrollbar 2xl:w-1/2">
            {retrievingMemberData ? (
              <>
                {/* <div className="flex flex-col justify-center space-x-4 w-full ml-5 mt-10 border w-full"> */}
                <div className="flex flex-col items-start space-y-2 p-5 border bg-white m-5 w-[470px]">
                  <Skeleton className="h-[50px] w-full" />
                </div>

                <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                  <Skeleton className="h-[500px] w-full" />
                </div>
                <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                  <Skeleton className="h-[300px] w-full" />
                </div>
                <div className="flex flex-col items-center space-y-2 p-5 border bg-white m-5 w-[470px]">
                  <Skeleton className="h-[300px] w-full" />
                </div>
                {/* </div> */}
              </>
            ) : (
              <>
                <PostHeader />
                <div
                  className="no-scrollbar lg:p-8 px-0 lg:w-full h-screen w-screen rounded-b-xl space-y-4 border border-[#E0E0E0] lg:h-min overflow-y-auto scroll-smooth"
                  ref={containerRef}
                >
                  {memberList.length > 0 ? (
                    memberList.map((post, index: number) => {
                      return (
                        // <h1 className="bg-red-500">{post.nickname}</h1>
                        <PostItem
                          key={index}
                          nickname={post.nickname}
                          country={post.country_name}
                          nationalityCode={post.nationality_code}
                          state={post.state_name}
                          age={post.age}
                          image={post.imagePath}
                          member_id={post.member_id}
                          isLiked={post.isLiked}
                          isFavorite={post.isFavorite}
                          status={post.status}
                          nationality={post.nationality}
                        />
                      );
                    })
                  ) : (
                    <div className="rounded-t-md lg:w-[460px] w-[350px] h-[554px] object-cover h-screen">
                      No members associated with current user
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="md:col-span-3 col-span-0 xs:hidden overflow-auto no-scrollbar ml-10">
            {/* <Suggestions members={memberList} /> */}
            <div className="w-[380px] h-5/6 pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
              <HomepageSearchInput />
              {/* filter */}
              <div className="border mt-5 py-5 mx-2  rounded-lg">
                <div className="flex flex-row justify-between items-center">
                  <p className="px-5 text-[#cfd8e4]">Filter By</p>
                  <p className="px-5 text-[#7e7e7e] text-xs underline hover:cursor-pointer">
                    Clear
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center mt-5">
                  <p className="px-5 text-sm">Age</p>
                  <p className="px-5 text-sm">{`${debouncedAgeFilterVal}-40`}</p>
                </div>
                {/* <form action="post" onSubmit={formik.handleSubmit}> */}
                <div className="flex flex-row justify-center align-center py-5">
                  <Slider
                    // defaultValue={[50]}
                    defaultValue={[ageSliderVal]}
                    max={100}
                    step={1}
                    className="w-full px-5"
                    onValueChange={handleSliderChange}
                    // {...formik.getFieldProps("age")}
                    // onChange={formik.handleChange}
                    name="age"
                  />
                  {/* <p className="text-red">
                        {formik.values.age ? formik.values.age : "not defined"}
                      </p> */}
                  {/* <p>{ageSliderVal}</p> */}
                </div>
                <div className="flex flex-row px-5 space-x-2 py-3">
                  <button className="float-right bg-white border border-[#ff569a] w-full text-[#ff569a] py-3 px-5 rounded-md text-xs">
                    Cancel
                  </button>
                  <button className="float-right bg-[#ff569a] w-full text-white py-3 px-5 rounded-md text-xs">
                    Apply
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
