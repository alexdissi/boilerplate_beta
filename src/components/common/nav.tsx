import ToggleTheme from "@/components/ui/toggleTheme";
import LanguageSwitcher from "@/components/i18n/switcher";
import { auth } from "@/lib/auth";
import { UserIcon } from "@/components/common/user-icon";
import { SearchBar } from "@/components/common/search-bar";

const Nav = async () => {
  const session = await auth();

  return (
    <nav
      className={
        "px-8 h-[8vh] flex flex-row items-center justify-between text-gray-500 border-b-2 border-[#EAEAEC] dark:border-b-slate-900 shadow-inner"
      }
    >
      <h1 className={"text-3xl font-bold"}>Boilerplate</h1>
      <div className={"flex flex-row items-center gap-6"}>
        <ToggleTheme />
        <LanguageSwitcher />
        <SearchBar className={"hidden sm:flex"} />
        <UserIcon
          name={session?.user.name as string}
          image={session?.user.image as string}
        />
      </div>
    </nav>
  );
};

export default Nav;
