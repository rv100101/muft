import TopBar from "@/components/topBar";
import AuthenticatedLayout from "./layout";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/searchInput";
import likesQuery from "@/queries/likes";
import { useQuery } from "@tanstack/react-query";
import { Like } from "@/types/like";
import { getImagePath } from "@/lib/images";
const LikesAndFavouritesPage = () => {

  const getMemberLikes = likesQuery.getLikes(69);

  const likesQueryResults = useQuery({
    queryKey: ['member-likes'],
    queryFn: ()=>getMemberLikes
  });

  const likes = likesQueryResults.data?.map((like: Like, index: number) => {
    console.log(like);
    return (
      <div
        key={index}
        className="w-full p-8 flex justify-between h-48 border rounded-xl"
      >
        <div className="flex space-x-2 items-center">
          <div className="border-4 border-primary w-24 h-24 border-pink p-1 rounded-full">
            <img className="w-full h-full rounded-full" src={getImagePath(like.gallery_uuid, like.gender, like.member_uuid)} alt="user"/>
          </div>
          <div>
            <p>
             {like.nickname}, {like.age} 
            </p>
            <p>
            {like.country_name}
            </p>
          </div>
        </div>
        <button>
          <MoreHorizontal />
        </button>
      </div>
    );
  });

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="pt-4">
          <TopBar>
            <div className="w-full h-full flex items-center justify-between">
              <h1 className="font-semibold">LIKES AND FAVOURITES</h1>
              <Button variant={"ghost"}>
                <MoreVertical />
              </Button>
            </div>
          </TopBar>
        </div>
        <div className="w-full flex h-max">
          <Button className="w-full rounded-0 bg-transparent text-black border-r border-t rounded-none border-b border-b-4">
            LIKES
          </Button>
          <Button className="w-full bg-transparent text-black border-t rounded-none border-b">
            FAVOURITES
          </Button>
        </div>
        <div className="flex justify-between h-max items-center px-8">
          <div>
            <Button variant={"ghost"} className="rounded-none border-b">
              All
            </Button>
            <Button variant={"ghost"}>Current Country</Button>
          </div>
          <SearchInput />
        </div>
          <div className="grid gap-4 py-2 px-8 grid overflow-y-auto grid-cols-2 rows-auto">
            {likes}
          </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default LikesAndFavouritesPage;
