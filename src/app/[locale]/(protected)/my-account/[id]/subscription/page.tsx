import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserSettings } from "@/components/billing/userSettings";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";

export default async function Page() {
  const t = await getTranslations("Subscription");
  const session = await auth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        <CardDescription>
          {t("currentPlan")}:&nbsp;{session?.user.plan} Plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <UserSettings />
        </div>
      </CardContent>
      <CardFooter className={"flex justify-center"}>
        {t("ChangePlan.description")}&nbsp;
        <Link className={"underline font-semibold"} href={"/"}>
          {t("ChangePlan.button")}
        </Link>
      </CardFooter>
    </Card>
  );
}
