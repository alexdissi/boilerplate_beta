import React, { ReactNode } from "react";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getLocale} from "next-intl/server";
import {SideBar} from "@/components/common/side-bar";
import Nav from "@/components/common/nav";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();
    const locale = await getLocale();

    if (!session) {
        redirect(`/${locale}/auth/login`)
    }

    return (
        <main className="flex flex-col">
            <Nav />
            <div className={"flex flex-row h-[91vh]"}>
            <SideBar username={session?.user.name as string} profilPicture={session?.user.image as string} id={session.user.id as string} />
            <div className={"w-full"}>
                {children}
            </div>
            </div>
        </main>
    );
}
