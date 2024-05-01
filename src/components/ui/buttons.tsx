"use client"
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";

export const LoadingButton = () => {
    const t = useTranslations("Common");

    return (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
    );
};

export const LogoutButton = () => {
    const t = useTranslations("Common");

    return (
        <Button variant={"destructive"} onClick={() => signOut({ callbackUrl: "/", redirect:true })}>
            {t("logout")}
        </Button>
    );
};
