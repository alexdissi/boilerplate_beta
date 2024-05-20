import React from "react"
import ResetPasswordForm from "@/components/auth/resetPasswordForm"
import type {Metadata} from "next"
export const metadata: Metadata = {
    title: "Password Reset | Boilerplate",
    description: "Boilerplate Nextjs",
}

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    return (
        <>
            <ResetPasswordForm token={params.token} />
        </>
    )
}

