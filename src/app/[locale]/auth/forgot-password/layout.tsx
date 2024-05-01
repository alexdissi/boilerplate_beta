import {ReactNode} from "react"
import type {Metadata} from "next"

export const metadata: Metadata = {
    title: "Forgot-Password | Boilerplate",
    description: "Boilerplate Nextjs",
}
export default function ForgotPasswordLayout({children}: {children: ReactNode}) {
    return (
        <main className="w-full mt-4 md:mt-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen">
            <div className="flex items-center justify-center flex-col gap-5">
                {children}
            </div>
            <div className="hidden bg-muted h-screen lg:block">
                <img
                    src="/sample.jpg"
                    alt="Image"
                />
            </div>
        </main>
    )
}
