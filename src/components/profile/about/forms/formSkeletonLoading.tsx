import { Skeleton } from "@/components/ui/skeleton";

const FormSkeletonLoading = (rows: { rows: number }) => {
  const skel = new Array(rows).map(
    () => {
      return <Skeleton className="h-6 w-[400px]" />;
    },
  );
  return <div>{skel}</div>;
};

export default FormSkeletonLoading;
