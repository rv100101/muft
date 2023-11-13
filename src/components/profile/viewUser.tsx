import { useEffect, useRef } from "react";
import useHomepageViewStore from "@/zustand/home/homepageView";
import AuthenticatedLayout from "@/pages/authenticatedPages/layout";
import ProfilePageBody from "@/pages/authenticatedPages/profilePageBody";

const ViewUser = ({ id }: { id: string }) => {
  const setSelectedProfileId = useHomepageViewStore((state) =>
    state.setSelectedProfileId
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  setSelectedProfileId(parseInt(id));

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        return;
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
    return () => {
      setSelectedProfileId(null);
    };
  });

  return (
    <AuthenticatedLayout>
      <ProfilePageBody />
    </AuthenticatedLayout>
  );
};

export default ViewUser;
