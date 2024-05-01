"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/buttons";
import { useTranslations } from "next-intl";
import { UpdateInfoInput, updateInfoSchema } from "@/validator/user";
import { useSession } from "next-auth/react";
import {Label} from "@/components/ui/label";

export default function ChangeInfo({
                                       id,
                                       email,
                                       name,
                                       username,
                                   }: {
    id: string;
    email: string;
    name: string;
    username: string;
}) {
    const t = useTranslations("User");
    const router = useRouter();
    const { data: session, update } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const methods = useForm<UpdateInfoInput>({
        resolver: zodResolver(updateInfoSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;
    const onSubmitHandler: SubmitHandler<UpdateInfoInput> = async (data) => {
        try {
            setSubmitting(true);
            const response = await fetch("/api/user/update/info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, id }),
            });

            if (!response.ok) {
                throw new Error(t("registerFailed"));
            }

            toast.success(t("UpdateProfilSuccess"));
            await update({ ...session?.user, username: data.username });
            router.refresh();
        } catch (error: string | any) {
            toast.error(error.message || t("UpdateProfilFailed"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <div className="flex flex-col gap-3 items-start">
                    <Label>{t("name")}</Label>
                    <Input
                        type="text"
                        placeholder={t("name")}
                        defaultValue={name}
                        disabled
                    />
                </div>
                <div className="flex flex-col gap-3 items-start">
                    <Label>{t("email")}</Label>
                    <Input
                        type="email"
                        placeholder={t("email")}
                        defaultValue={email}
                        disabled
                    />
                </div>
                <div className="flex flex-col gap-3 items-start">
                    <Label>{t("username")}</Label>
                    <Input
                        type="text"
                        {...register("username")}
                        placeholder={t("usernameLabel")}
                        defaultValue={username}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.username?.message as string}`)}
            </span>
                    )}
                </div>
                {submitting ? (
                    <LoadingButton/>
                ) : (
                    <Button type="submit">{t("modify")}</Button>
                )}
            </form>
        </>
    );
}
