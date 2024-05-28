import React, { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { SideBar } from "@/components/common/side-bar";
import SettingMenu from "@/components/user/setting-menu";
import Nav from "@/components/common/nav";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  const locale = await getLocale();

  if (!session) {
    redirect(`/${locale}/auth/login`);
  }

  return (
    <main className="flex flex-col">
      <Nav />
      <div className={"flex flex-row h-[91vh]"}>
        <SideBar
          username={session?.user.name as string}
          profilPicture={session?.user.image as string}
          id={session.user.id as string}
        />
        <div className="flex-1 bg-background p-4 md:px-5">
          <div className="mx-auto max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto max-w-6xl grid grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <SettingMenu />
            <div className="grid gap-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
