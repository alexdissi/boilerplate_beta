import React from "react"
import ResetPasswordForm from "@/components/auth/resetPasswordForm"
import {getTranslations} from "next-intl/server"
import type {Metadata} from "next"
export const metadata: Metadata = {
    title: "Password Reset | Boilerplate",
    description: "Boilerplate Nextjs",
}

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
    const t = await getTranslations("PasswordReset")

    return (
        <>
            <ResetPasswordForm title={t("titleResetPassword")} token={params.token} />
        </>
    )
}

