import { SideBarLinks } from "@/types/sideBar";
import {
  BellIcon,
  HeartIcon,
  HomeIcon,
  MessageSquareIcon,
  Star,
  UserIcon,
} from "lucide-react";

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
    name: "My Profile",
  },
  {
    path: "/likes",
    icon: HeartIcon,
    name: "Likes",
  },
  {
    path: "/favourites",
    icon: Star,
    name: "Favorites",
  },
];

export default links;
