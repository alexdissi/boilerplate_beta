import ToggleTheme from "@/components/ui/toggleTheme";
import LanguageSwitcher from "@/components/i18n/switcher";
import { SearchIcon } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function Nav() {
  const session = await auth();

  return (
    <nav
      className={
        "px-8 h-[8vh] flex flex-row items-center justify-between text-gray-500"
      }
    >
      <h1 className={"text-3xl font-bold"}>Boilerplate</h1>
      <div className={"flex flex-row items-center gap-6"}>
        <ToggleTheme />
        <LanguageSwitcher />
        <SearchIcon className={"text-slate-950 dark:text-white"} />
        <img
          src={session?.user.image as string}
          alt="profile"
          className={"w-10 h-10 rounded-full"}
        />
      </div>
    </nav>
  );
}
