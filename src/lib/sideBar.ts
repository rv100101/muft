import { SideBarLinks } from "@/types/sideBar";
import { BellIcon, HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react";

const links: SideBarLinks = [
  {
    path: "/",
    icon: HomeIcon,
    name: "Home",
  },
  {
    path: "/messages",
    icon: MessageSquareIcon,
    name: "Messages",
  },
  {
    path: "/notifications",
    icon: BellIcon,
    name: "Notifications",
  },
  {
    path: "/profile",
    icon: UserIcon,
    name: "Profile",
  },
];

export default links;
