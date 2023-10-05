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
      <div className="grid grid-cols-6 gap4">
        <div className="col-span-1"></div>
        <div className="col-span-2 overflow-auto no-scrollbar">
          <PostHeader />
          {/* post container */}
          <div
            className="no-scrollbar rounded-xl border border-[#E0E0E0] h-full overflow-y-auto"
            ref={containerRef}
          >
            <LazyPostItem />
            <LazyPostItem />
            <LazyPostItem />
            <LazyPostItem />
          </div>
        </div>
        <div className="col-span-2 overflow-auto">
          <Suggestions />
        </div>
        <div className="col-span-1"></div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
