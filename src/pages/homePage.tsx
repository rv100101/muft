// HomePage.js
import { useRef, useEffect } from "react";
import PostHeader from "@/components/home/postHeader";
import LazyPostItem from "@/components/home/lazyPostItem";

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

  return (
    <>
      <div>
        <PostHeader />
        {/* post container */}
        <div
          className="rounded-xl border border-[#E0E0E0] h-full m-5 overflow-hidden"
          ref={containerRef}
        >
          {/* Lazy-loaded PostItems go here */}
          <LazyPostItem />
          <LazyPostItem />
          {/* Add more LazyPostItem instances as needed */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
