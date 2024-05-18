"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {ReloadIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import {PasswordResetInput, passwordResetSchema} from "@/validator/registration";
import {toast} from "sonner";
export default function PasswordReset() {
    const router = useRouter()
    const t = useTranslations("ChangePassword")
    const [loading, setLoading] = useState(false)
    const methods = useForm<PasswordResetInput>({
        resolver: zodResolver(passwordResetSchema),
    })
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods
    const onSubmit: SubmitHandler<PasswordResetInput> = async (data) => {
        try {
            setLoading(true)
            const response = await fetch("/api/auth/passwordreset", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const responseData = await response.json()
            toast.success(responseData.message)

            if (response.ok) {
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input type="password" {...register("oldPassword")} placeholder={t("placeholderOldPassword")}/>
                            {errors.oldPassword && (
                                <span className="text-red-500 text-xs pt-1 block">
                            {errors.oldPassword?.message as string}
                          </span>
                            )}
                        </div>
                        <div>
                            <Input type="password" {...register("newPassword")} placeholder={t("placeholderNewPassword")}/>
                            {errors.newPassword && (
                                <span className="text-red-500 text-xs pt-1 block">
                             {errors.newPassword?.message as string}
                              </span>
                            )}
                        </div>
                            {loading ? (
                                <Button disabled>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                    {t("pleasewait")}
                                </Button>
                            ) : (
                                <Button type='submit'>
                                    {t("title")}
                                </Button>
                            )}
                    </form>
        </div>
    )
}