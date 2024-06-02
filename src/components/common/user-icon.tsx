"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function UserIcon({ name, image }: { image: string; name: string }) {
  const t = useTranslations("Navigation");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border border-gray-200 w-12 h-12 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <img
            alt="Avatar"
            className="rounded-full w-12 h-12"
            src={image}
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild align="end" className="w-48">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            className="cursor-pointer"
          >
            {t("logout")}
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
