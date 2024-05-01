"use client"
import {useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast } from "sonner"
import {useRouter} from "next/navigation"
import {useTranslations} from "next-intl"
import {PasswordForgotInput, passwordForgotSchema} from "@/validator/registration";
import {LoadingButton} from "@/components/ui/buttons";

export default function ForgotPasswordForm() {
    const router = useRouter()
    const t = useTranslations("Register")
    const [loading, setLoading] = useState(false)
    const methods = useForm<PasswordForgotInput>({
        resolver: zodResolver(passwordForgotSchema),
    })
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods
    const onSubmit: SubmitHandler<PasswordForgotInput> = async (data) => {
        try {
            setLoading(true)
            const response = await fetch("/api/auth/forgot-password/reset", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            toast.success(t("linkSent"))
            setTimeout(() => {
                router.refresh()
            }, 1000)
        } catch (error: string | any) {
            toast.error(t("noAccountExists"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold">{t("passwordReset")}</h1>
            <h2 className="text-balance text-muted-foreground">{t("passwordResetEmail")}</h2>
            <form className='flex flex-col gap-3 w-[24rem]' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="email" {...register("email")} placeholder="Email"/>
                    {errors.email && (
                        <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.email?.message as string}`)}
          </span>
                    )}
                </div>
                {loading ? (
                    <LoadingButton/>
                ) : (
                    <Button type='submit'>
                        {t("reset")}
                    </Button>
                )}
            </form>
        </>
    )
}
