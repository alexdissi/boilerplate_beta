import Link from "next/link";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import {auth} from "@/lib/auth";
import ToggleTheme from "@/components/ui/toggleTheme";
import LanguageSwitcher from "@/components/i18n/switcher";

export default async function Navigation() {
    const session = await auth();
    const locale = useLocale();
    const t = await getTranslations("Common");

    return (
        <nav className="p-5 mx-5 flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold">Boilerplate</h1>
            <div className="flex flex-row items-center gap-4">
                <ToggleTheme />
                <LanguageSwitcher />
                    <>
                        <Link href={`${session ? `/${locale}/dashboard` : `/${locale}/auth/register`}`}>{t("register")}</Link>
                        <Link href={`${locale}/auth/login`}>{t("login")}</Link>
                    </>
            </div>
        </nav>
    );
}
