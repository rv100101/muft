import { useRef, useEffect } from 'react';

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

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollRef.current) {
        if (event.deltaY !== 0) {
          scrollRef.current.scrollLeft += event.deltaY;
          event.preventDefault();
        }
      }
    };
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative mt-4 sm:mt-6 rounded-xl">
      <div ref={scrollRef} className="overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex space-x-4">
          {posts.map((post) => (
            <div key={post.post_id} className="overflow-y-hidden flex-none w-48 sm:w-[600px]">
              <img
                src={`https://muffin0.blob.core.windows.net/posts/${post.post_id}.png`}
                alt={post.post_title}
                className="w-48 sm:w-[600px] h-32 sm:h-[400px] rounded-2xl object-cover"
              />
              <h3 className="mt-2 sm:mt-4 w-48 sm:w-[600px] text-center text-xs sm:text-2xl font-semibold whitespace-normal break-words">
                {post.post_title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPosts;
