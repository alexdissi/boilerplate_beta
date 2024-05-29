"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/ui/buttons";
import { useLocale, useTranslations } from "next-intl";
import SidebarItem from "@/data/sidebarItem";
import { Sidebar } from "@/interfaces/sidebar";
import { Separator } from "@/components/ui/separator";

const sidebarItems = SidebarItem;

export function SideBar({ profilPicture, username, id }: Sidebar) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("SideBar");
  const locale = useLocale();
  const pathname = usePathname();
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const localizedSidebarItems = sidebarItems.map((item) => ({
    ...item,
    href: `/${locale}${item.href}`,
  }));

  return (
    <div className="flex bg-[#111415] h-screen rounded-tr rounded-br relative border-r-slate-800 border">
      {isExpanded && (
        <span className="absolute top-0 left-[-3rem] bg-primary w-44 h-10 blur-3xl"></span>
      )}
      <motion.div
        initial={{ width: 96 }}
        animate={{ width: isExpanded ? 208 : 96 }}
        exit={{ width: 96 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-between py-6 transition-width"
      >
        <div
          className={`flex flex-col items-center justify-center gap-6 ${isExpanded && "w-56"}`}
        >
          <img src="/app_logo.png" alt="logo" className="w-20 h-16" />
          <Button
            variant="ghost"
            className="text-gray-500 hover:bg-gray-800 hover:text-gray-50 duration-100"
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
                href={item.href}
                className={`flex flex-row gap-3 items-start w-full rounded-2xl p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 ${pathname === item.href ? "bg-primary text-white" : "hover:bg-gray-800 hover:text-gray-50"}`}
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
            <Separator />
            <Link
              href={`/${locale}/my-account/${id}`}
              className={`flex flex-row gap-3 items-start w-full rounded-md p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 ${pathname === `/${locale}/my-account/${id}` ? "bg-primary text-white" : "hover:bg-gray-800 hover:text-gray-50"}`}
            >
              <SettingsIcon />
              <span
                className={`text-xs mt-1 duration-500 ${isExpanded ? "flex" : "hidden"}`}
              >
                {t("settings")}
              </span>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <img
                src={profilPicture}
                alt={`Avatar of ${username}`}
                className="w-10 h-10 rounded-full"
              />
              <p
                className={`text-xs text-white ${isExpanded ? "flex" : "hidden"}`}
              >
                {username}
              </p>
            </div>
            {isExpanded && <LogoutButton />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
