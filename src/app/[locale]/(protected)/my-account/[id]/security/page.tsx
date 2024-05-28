import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import PasswordReset from "@/components/user/password-reset";
import {getTranslations} from "next-intl/server";

export default async function Page() {
    const t = await getTranslations("User");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("security")}</CardTitle>
                <CardDescription>{t("changePassword")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"flex flex-col gap-4"}>
                   <PasswordReset />
                </div>
            </CardContent>
        </Card>
    )
}