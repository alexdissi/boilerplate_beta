"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function SettingMenu() {
  const { data: session } = useSession();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("User");
  const generateHref = (path: string) =>
    `/${locale}/my-account/${session?.user.id}${path}`;

  console.log(pathname);

  const links = [
    { path: "", label: t("general") },
    { path: "/security", label: t("security") },
    { path: "/subscription", label: t("subscription") },
    { path: "#", label: t("support") },
    {
      path: "#",
      label: t("deleteAccount"),
      className: "text-red-600 underline",
    },
  ];

  return (
    <nav className="flex flex-col my-5 gap-4 text-xl">
      {links.map(({ path, label, className = "" }) => (
        <Link
          key={path}
          href={path.startsWith("#") ? path : generateHref(path)}
          className={`font-medium ${pathname === generateHref(path) ? "text-primary underline duration-100" : ""} ${className}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
