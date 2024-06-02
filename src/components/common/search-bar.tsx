import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function SearchBar({ className }: { className?: string }) {
  const t = useTranslations("Navigation");

  return (
    <Input
      className={`flex-1 focus:outline-none bg-[#e6e6e6] dark:bg-[#111415] border-none rounded-xl ${className}`}
      placeholder={t("search")}
      type="search"
    />
  );
}
