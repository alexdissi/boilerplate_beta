import Link from "next/link";
import {useLocale} from "next-intl";
import {auth} from "@/lib/auth";
import Header from "@/components/common/header";
import BuyButton from "@/components/billing/buyButton";
import {UserSettings} from "@/components/billing/userSettings";

export default async function Index() {
  const session = await auth();
  const locale = useLocale();
  return (
      <div>
        <Header session={session} userName={session?.user.name as string} />
          <section>
              <Link href={`${locale}/my-account/${session?.user.id}`}>Account</Link>
          </section>
          <BuyButton />
          <UserSettings />
      </div>
  );
}
