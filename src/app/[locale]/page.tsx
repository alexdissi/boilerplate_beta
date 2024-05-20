import Link from "next/link";
import {auth} from "@/lib/auth";
import Header from "@/components/common/header";
import BuyButton from "@/components/billing/buyButton";
import {UserSettings} from "@/components/billing/userSettings";
import {SideBar} from "@/components/common/side-bar";

export default async function Index() {
  const session = await auth();

  return (
      <main className={"flex flex-row"}>
          <SideBar username={session?.user.name as string} profilPicture={session?.user.image as string} />
          <div>
              <Header session={session} userName={session?.user.name as string} />
              <section>
                  <Link locale={"fr"} href={`/my-account/${session?.user.id}`}>Account</Link>
              </section>
              <BuyButton />
              <UserSettings />
          </div>
      </main>
  );
}
