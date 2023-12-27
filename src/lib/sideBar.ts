import {
  // BellIcon,
  HeartIcon,
  HomeIcon,
  LucideIcon,
  MessageSquareIcon,
  Settings,
  Star,
  UserIcon,
} from "lucide-react";

const links: (
  userId: number | null
) => { path: string; icon: LucideIcon; name: string }[] = (userId) => [
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
  // {
  //   path: "/notifications",
  //   icon: BellIcon,
  //   name: "Notifications",
  // },
  {
    path: userId ? `/profile/${userId}` : "",
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
  {
    path: "/Settings",
    icon: Settings,
    name: "Settings",
  },
];

export default links;
