import {
  CalendarIcon,
  CircleCheckIcon,
  HomeIcon,
  Landmark,
  MessageSquareIcon,
} from "lucide-react";

const SideBarItems = [
  { href: "/dashboard", icon: HomeIcon, label: "home" },
  { href: "/account", icon: Landmark, label: "account" },
  { href: "/tasks", icon: CircleCheckIcon, label: "tasks" },
  { href: "/calendar", icon: CalendarIcon, label: "calendar" },
  { href: "/messages", icon: MessageSquareIcon, label: "messages" },
];

export default SideBarItems;
