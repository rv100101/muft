import { useEffect, useState } from "react";
import {
  HeartIcon,
  HomeIcon,
  LucideIcon,
  MessageSquareIcon,
  Settings,
  Star,
  UserIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidebarLink {
  path: string;
  icon: LucideIcon;
  name: string;
}

const useSidebarLinks = (userId: number | null): SidebarLink[] => {
  const [t] = useTranslation();
  const [links, setLinks] = useState<SidebarLink[]>([]);

  useEffect(() => {
    const updatedLinks: SidebarLink[] = [
      {
        path: "/",
        icon: HomeIcon,
        name: t("menu.home"),
      },
      {
        path: "/messages",
        icon: MessageSquareIcon,
        name: t("menu.messages"),
      },
      {
        path: userId ? `/profile/${userId}` : "",
        icon: UserIcon,
        name: t("menu.myProfile"),
      },
      {
        path: "/likes",
        icon: HeartIcon,
        name: t("menu.likes"),
      },
      {
        path: "/favourites",
        icon: Star,
        name: t("menu.favorites"),
      },
      {
        path: "/settings",
        icon: Settings,
        name: t("menu.settings"),
      },
    ];

    setLinks(updatedLinks);
  }, [t, userId]);

  return links;
};

export default useSidebarLinks;
