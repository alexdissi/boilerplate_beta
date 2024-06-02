"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const UserSettings = () => {
  const router = useRouter();
  const t = useTranslations("Subscription");
  const handleClick = async () => {
    const response = await fetch("/api/billing/modify", {
      method: "GET",
    });
    const url = await response.json();
    router.push(url);
  };

  return (
    <Button onClick={handleClick}>{t("ManageSubscription.button")}</Button>
  );
};
