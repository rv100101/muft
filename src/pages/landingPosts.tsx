import { useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

// const posts: Post[] = [
//   {
//     authorized: true,
//     ip_address: "54.86.50.139:21585",
//     post_id: "1001",
//     post_uuid: "07A5EA7F-13DA-4D71-9D98-79637EBF0771",
//     post_title: "10 Tips for Successful Dating",
//     post_text: "<h1>10 Tips for Successful Dating</h1><p>In the quest for companionship...</p>",
//     post_language: "en"
//   },
//   {
//     authorized: true,
//     ip_address: "54.86.50.140:21586",
//     post_id: "1002",
//     post_uuid: "07A5EA7F-13DA-4D71-9D98-79637EBF0772",
//     post_title: "The Best Travel Destinations",
//     post_text: "<h1>The Best Travel Destinations</h1><p>Discover the most beautiful places...</p>",
//     post_language: "en"
//   },
//   {
//     authorized: true,
//     ip_address: "54.86.50.141:21587",
//     post_id: "1001",
//     post_uuid: "07A5EA7F-13DA-4D71-9D98-79637EBF0773",
//     post_title: "How to Stay Fit",
//     post_text: "<h1>How to Stay Fit</h1><p>Fitness is essential for a healthy lifestyle...</p>",
//     post_language: "en"
//   },
//   {
//     authorized: true,
//     ip_address: "54.86.50.142:21588",
//     post_id: "1001",
//     post_uuid: "07A5EA7F-13DA-4D71-9D98-79637EBF0774",
//     post_title: "Mastering the Art of Cooking",
//     post_text: "<h1>Mastering the Art of Cooking</h1><p>Cooking is an essential skill...</p>",
//     post_language: "en"
//   },
//   {
//     authorized: true,
//     ip_address: "54.86.50.143:21589",
//     post_id: "1002",
//     post_uuid: "07A5EA7F-13DA-4D71-9D98-79637EBF0775",
//     post_title: "Financial Tips for Young Adults",
//     post_text: "<h1>Financial Tips for Young Adults</h1><p>Managing finances can be challenging...</p>",
//     post_language: "en"
//   }
// ];

export interface Post {
  authorized: boolean;
  ip_address: string;
  post_id: string;
  post_uuid: string;
  post_title: string;
  post_text: string;
  post_language: string;
}

const LandingPosts = ({ posts }: { posts: Post[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMediumScreen = useMediaQuery('(min-width: 768px)');

  const getScrollAmount = () => {
    if (isLargeScreen) {
      return window.innerWidth - 288;
    } else if (isMediumScreen) {
      return window.innerWidth - 96;
    } else {
      return window.innerWidth - 64;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && !isScrolling) {
      setIsScrolling(true);
      const distance = direction === 'left' ? -getScrollAmount() : getScrollAmount();
      scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
      setTimeout(() => {
        setIsScrolling(false);
      }, 500); // Adjust timeout duration to match the scroll duration
    }
  };

  return (
    <div className="relative mt-4 mb-2 sm:mt-4 sm:mb-8 rounded-xl">
      <div className="overflow-x-auto whitespace-nowrap no-scrollbar" ref={scrollRef}>
        <div className="flex space-x-4">
          {posts.map((post) => (
            <div key={post.post_id} className="flex-none w-full">
              <img
                src={`https://muffin0.blob.core.windows.net/posts/${post.post_id}.png`}
                alt={post.post_title}
                className="w-full h-42 sm:h-[600px] rounded-2xl object-scale-down sm:object-fill"
              />
              <h3 className="mt-2 sm:mt-8 text-center text-xl sm:text-2xl font-semibold">{post.post_title}</h3>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => scroll('left')}
        className={`absolute top-1/2 text-2xl left-4 hover:bg-[#ff599b]/80 mt-5 dark:bg-[#ae2e51] transform -translate-y-1/2 bg-primary w-12 h-12 text-white p-2 rounded-full ${isScrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isScrolling}
      >
        &lt;
      </button>
      <button
        onClick={() => scroll('right')}
        className={`absolute top-1/2 text-2xl right-4 hover:bg-[#ff599b]/80 mt-5 dark:bg-[#ae2e51] transform -translate-y-1/2 bg-primary w-12 h-12 text-white p-2 rounded-full ${isScrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isScrolling}
      >
        &gt;
      </button>
    </div>
  );
};

export default LandingPosts;
