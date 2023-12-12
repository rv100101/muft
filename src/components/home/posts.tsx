import { Member } from "@/zustand/home/homepageView.ts";
import PostItem from "./postItem";
const Posts = ({ memberList }: { memberList: Member[] }) => {

  return (
    memberList.map((post, index: number) => {
      return (
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
  );
};

export default Posts;
