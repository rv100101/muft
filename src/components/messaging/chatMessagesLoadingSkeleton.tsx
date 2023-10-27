import { Skeleton } from "../ui/skeleton";

const ChatMessagesLoadingSkeleton = () => {
  return (
    <div>
      <div className="space-y-2 flex flex-col items-start">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-3 w-8" />
      </div>
      <div className="space-y-2 flex flex-col items-end">
        <Skeleton className="h-24 w-1/2" />
        <Skeleton className="h-3 w-8" />
      </div>
      <div className="space-y-2 flex flex-col items-start">
        <Skeleton className="h-16 w-2/5" />
        <Skeleton className="h-3 w-8" />
      </div>
      <div className="space-y-2 flex flex-col items-end">
        <Skeleton className="h-24 w-1/2" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
};

export default ChatMessagesLoadingSkeleton;
