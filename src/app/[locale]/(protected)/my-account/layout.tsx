import Link from "next/link";
import { ReactNode } from "react";
import { useLocale } from "next-intl";
import {auth} from "@/lib/auth";
import Navigation from "@/components/common/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();
    const locale = useLocale();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navigation />
            <main className="flex-1 bg-muted/40 p-4 md:p-10">
                <div className="mx-auto max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto max-w-6xl grid grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] gap-6">
                    <nav className="flex flex-col my-5 gap-4 text-xl">
                        <Link
                            href={`${locale}/my-account/${session?.user.id}`}
                            className="font-semibold"
                        >
                            General
                        </Link>
                        <Link href={`${locale}/my-account/${session?.user.id}/security`}>
                            Security
                        </Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Organizations</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">{children}</div>
                </div>
            </main>
        </div>
    );
}
