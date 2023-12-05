import SideBar from "@/components/sideBar";
import { useUserStore } from "@/zustand/auth/user";
import { ReactNode } from "react";

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="h-screen overflow-hidden flex w-full">
      {user?.profile_completed && <SideBar />}
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
