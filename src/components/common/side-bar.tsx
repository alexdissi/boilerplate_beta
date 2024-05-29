"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseIcon,
  CalendarIcon,
  CircleCheckIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { LogoutButton } from "@/components/ui/buttons";
import { useLocale, useTranslations } from "next-intl";
const sidebarItems = [
  { href: "/dashboard", icon: HomeIcon, label: "home" },
  { href: "/projects", icon: BriefcaseIcon, label: "projects" },
  { href: "/tasks", icon: CircleCheckIcon, label: "tasks" },
  { href: "/calendar", icon: CalendarIcon, label: "calendar" },
  { href: "/messages", icon: MessageSquareIcon, label: "messages" },
];

export function SideBar({
  profilPicture,
  username,
  id,
}: {
  profilPicture: string;
  username: string;
  id: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("SideBar");
  const locale = useLocale();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const localizedSidebarItems = sidebarItems.map((item) => ({
    ...item,
    href: `/${locale}/${item.href}`,
  }));

  return (
    <div className="flex bg-[#111415] h-screen rounded-tr rounded-br">
      <motion.div
        initial={{ width: 96 }}
        animate={{ width: isExpanded ? 208 : 96 }}
        exit={{ width: 96 }}
        className="shrink-0 flex flex-col items-center justify-between py-6 transition-width"
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
      >
        <div
          className={`flex flex-col items-center justify-center gap-6 ${isExpanded && "w-56"}`}
        >
          <img
            src={
              "https://seeklogo.com/images/C/corporate-company-logo-749CEE6ADC-seeklogo.com.png"
            }
            alt={"logo"}
            className={"w-28 h-14"}
          />
          <Button
            variant="ghost"
            className={
              "text-gray-500 hover:bg-gray-800  hover:text-gray-50 duration-100"
            }
            onClick={toggleSidebar}
          >
            {isExpanded ? <ArrowLeft /> : <ArrowRight />}
          </Button>
          <div
            className={`flex flex-col items-center justify-center gap-4 ${isExpanded && "w-48"}`}
          >
            {localizedSidebarItems.map((item, index) => (
              <Link
                key={index}
                className="flex flex-row gap-3 items-start w-full rounded-2xl p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 hover:bg-gray-800 hover:text-gray-50 dark:focus:ring-gray-300"
                href={item.href}
              >
                <item.icon />
                <span
                  className={`text-xs mt-1 duration-500 ${isExpanded ? "flex" : "hidden"}`}
                >
                  {t(item.label)}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div
            className={`flex flex-col items-center justify-center gap-4 ${isExpanded && "w-48"}`}
          >
            <Link
              className="flex flex-row gap-3 items-start w-full rounded-md p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 hover:bg-gray-800 hover:text-gray-50 dark:focus:ring-gray-300"
              href={`/${locale}/my-account/${id}`}
            >
              <SettingsIcon />
              <span
                className={`text-xs mt-1 duration-500 ${isExpanded ? "flex" : "hidden"}`}
              >
                {t("settings")}
              </span>
            </Link>
          </div>
          <div className={"flex flex-row items-center gap-4"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img
                src={profilPicture}
                alt={`Avatar of ${username}`}
                className={"w-10 h-10 rounded-full"}
              />
              <p className={`${isExpanded ? "flex" : "hidden"} text-sm`}>
                {username}
              </p>
            </div>
            <div className={`${isExpanded ? "flex" : "hidden"}`}>
              <LogoutButton />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
