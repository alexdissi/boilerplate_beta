import Link from "next/link";
import {auth} from "@/lib/auth";
import Header from "@/components/common/header";
import BuyButton from "@/components/billing/buyButton";
import {UserSettings} from "@/components/billing/userSettings";
import {SideBar} from "@/components/common/side-bar";
import {getLocale} from "next-intl/server";

export default async function Index() {
  const session = await auth();
  const locale = await getLocale();

  return (
      <main className={"flex flex-row"}>
          <SideBar username={session?.user.name as string} profilPicture={session?.user.image as string} id={session?.user.id as string} />
          <div>
              <Header session={session} userName={session?.user.name as string} />
              <section className={"mt-20"}>
                  <Link href={`${locale}/my-account/${session?.user.id}`}>Account</Link>
              </section>
              <BuyButton />
              <UserSettings />
          </div>
      </main>
  );
}
