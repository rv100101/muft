import { Skeleton } from "@/components/ui/skeleton";

const FormSkeletonLoading = (rows: { rows: number }) => {
  const skel = new Array(rows).map((_, index: number) => {
    return <Skeleton key={index} className="h-6 w-[400px]" />;
  });
  return <div>{skel}</div>;
};

export default FormSkeletonLoading;
