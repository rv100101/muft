import { SideBarLinks } from "@/types/sideBar";
import { BellIcon, HeartIcon, HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react";

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
  {
    path: "/likes-and-favourites",
    icon: HeartIcon,
    name: "Likes & Favourites",
  },
];

export default links;
