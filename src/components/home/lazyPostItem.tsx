import PostItem from "@/components/home/postItem";

const LazyPostItem = () => {
  return (
    <div className="transition ease-in duration-300 transform hover:scale-105">
      <PostItem />
    </div>
  );
};

export default LazyPostItem;
