import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import ChangeInfo from "@/components/user/changeInfo";
import {auth} from "@/lib/auth";

export default async function MyAccount({
                                            params,
                                        }: {
    params: { id: string };
}) {
    const t = await getTranslations("User");
    const session = await auth();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("General")}</CardTitle>
                <CardDescription>{t("titleEdit")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"flex flex-col gap-4"}>
                    <ChangeInfo
                        id={params.id}
                        name={session?.user.name as string}
                        email={session?.user.email as string}
                        username={session?.user.username as string}
                    />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4"></CardFooter>
        </Card>
    );
}
