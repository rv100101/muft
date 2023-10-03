import SideBar from "@/components/sideBar";
import { ReactNode } from "react";

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden flex w-full">
      <SideBar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
