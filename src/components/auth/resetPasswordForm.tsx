"use client"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Input} from "@/components/ui/input"
import {toast} from "sonner"
import {zodResolver} from "@hookform/resolvers/zod"
import {SubmitHandler, useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {useLocale, useTranslations} from "next-intl"
import {passwordResetSchema, PasswordResetInput} from "@/validator/registration"
import {LoadingButton} from "@/components/ui/buttons";

export default function ResetPasswordForm({token}: { token: string}) {
    const local = useLocale()
    const redirectLogin: string = local === "en" ? "/en/auth/login" : "/fr/auth/login"
    const redirectForgot: string = local === "en" ? "/en/auth/forgot-password" : "/fr/auth/forgot-password"
    const t = useTranslations("ResetPassword")
    const [user, setUser] = useState({
        email: "",
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const methods = useForm<PasswordResetInput>({
        resolver: zodResolver(passwordResetSchema),
    })

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch(`/api/auth/forgot-password/verify-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                    }),
                })

                if (res.status === 200) {
                    setUser({
                        email: (await res.json()).email
                    })
                }
            } catch (error: any) {
                toast.error(error?.response?.data)
                router.push(redirectForgot)
            }
        }

        verifyToken()
    }, [router, token])


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods
    const onSubmit: SubmitHandler<PasswordResetInput> = async (values) => {
        try {
            setLoading(true)
            const response= await fetch("/api/auth/forgot-password/update", {
                method: "POST",
                body: JSON.stringify({
                    email: user.email,
                    password: values.password,
                }),
            })
            const responseData = await response.json()
            setLoading(false)

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            toast.success(t("resetSuccess"))
            setTimeout(() => {
                router.push(redirectLogin)
            }, 1000)
        } catch (error: string | any) {
            toast.error(t("resetFailed"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-1 justify-center mx-auto mt-10 w-[24rem]">
                <div
                    className="shadow-xl border mx-1 md:mx-0 rounded-xl p-8 sm:p-10">
                    <h1 className="tracking-tight text-center text-title-font font-title-weight">
                        {t("title")}
                    </h1>
                    <form className='flex flex-col mx-auto gap-3 w-full mt-2' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input type="password" {...register("password")} placeholder={t("placeholderPassword")}/>
                            {errors.password && (
                                <span className="text-red-500 text-xs pt-1 block">
                                {t(`${errors.password?.message as string}`)}
                            </span>
                            )}
                        </div>
                        <div>
                            <Input type="password" {...register("passwordConfirm")} placeholder={t("placeholderConfirmPassword")}/>
                            {errors.passwordConfirm && (
                                <span className="text-red-500 text-xs pt-1 block">
         {t(`${errors.password?.message as string}`)}
            </span>
                            )}
                        </div>
                        {loading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">{t("button")}</Button>)
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
