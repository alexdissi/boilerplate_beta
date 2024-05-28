import Link from "next/link";
import {auth} from "@/lib/auth";
import Header from "@/components/common/header";
import BuyButton from "@/components/billing/buyButton";
import {UserSettings} from "@/components/billing/userSettings";
import {getLocale} from "next-intl/server";

export default async function Index() {
  const session = await auth();
  const locale = await getLocale();

  return (
      <main className={"flex flex-row"}>
          <div>
              <Header session={session} />
              <section className={"mt-20"}>
                  <Link href={`${locale}/my-account/${session?.user.id}`}>Account</Link>
              </section>
              <BuyButton />
              <UserSettings />
          </div>
      </main>
  );
}
