import { Skeleton } from "../ui/skeleton";

const ChatListLoadingSkeleton = () => {
  return [...Array(10)].map((_, index) => (
    <li className="px-2" key={index}>
      <Skeleton className="h-12 w-full" />
    </li>
  ));
};

export default ChatListLoadingSkeleton;
