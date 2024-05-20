import Link from "next/link";
import React, { ReactNode } from "react";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getLocale} from "next-intl/server";
import {SideBar} from "@/components/common/side-bar";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();
    const locale = await getLocale();

    if (!session) {
        redirect(`/${locale}/auth/login`)
    }

    return (
        <main className="flex flex-row">
            <SideBar username={session?.user.name as string} profilPicture={session?.user.image as string} id={session.user.id as string} />
                <div className="flex-1 bg-muted/40 p-4 md:p-10">
                    <div className="mx-auto max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto max-w-6xl grid grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className="flex flex-col my-5 gap-4 text-xl">
                            <Link
                                href={`/${locale}/my-account/${session?.user.id}`}
                                className="font-semibold"
                            >
                                General
                            </Link>
                            <Link href={`/${locale}/my-account/${session?.user.id}/security`}>
                                Security
                            </Link>
                            <Link href="#">Subscription</Link>
                            <Link href="#">Support</Link>
                            <Link href="#" className="text-red-600 underline">Delete Account</Link>
                        </nav>
                        <div className="grid gap-6">{children}</div>
                    </div>
                </div>
        </main>
    );
}
