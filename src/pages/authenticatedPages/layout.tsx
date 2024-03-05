import SideBar from "@/components/sideBar";
import { useUserStore } from "@/zustand/auth/user";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const [, i18n] = useTranslation();
  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="h-screen overflow-hidden flex w-screen"
    >
      {user?.profile_completed && <SideBar />}
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
