// HomePage.js
import { useRef, useEffect } from "react";
import PostHeader from "@/components/home/postHeader";
import LazyPostItem from "@/components/home/lazyPostItem";
import AuthenticatedLayout from "./authenticatedPages/layout";
import Suggestions from "@/components/suggestions";

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
    <AuthenticatedLayout>
      <div className="flex flex-row ">
        <div className="w-1/2"></div>
        <div className="flex flex-col pl-20">
          <PostHeader />
          {/* post container */}
          <div
            className="no-scrollbar rounded-xl border border-[#E0E0E0] h-full m-5 overflow-y-auto"
            ref={containerRef}
          >
            {/* Lazy-loaded PostItems go here */}

            <LazyPostItem />
            <LazyPostItem />
            <LazyPostItem />
            <LazyPostItem />
            {/* Add more LazyPostItem instances as needed */}
          </div>
        </div>
        <Suggestions />
        <div className="w-1/4"></div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
