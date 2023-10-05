import PostItem from "@/components/home/postItem";

const LazyPostItem = () => {
  return (
    <div className="transition ease-in duration-300 transform ">
      <PostItem />
    </div>
  );
};

export default LazyPostItem;
