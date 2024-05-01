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
                <div>
                    <Input
                        type="email"
                        placeholder={t("Email")}
                        defaultValue={email}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder={t("Name")}
                        defaultValue={name}
                        disabled
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        {...register("username")}
                        placeholder={t("UsernameLabel")}
                        defaultValue={username}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.username?.message as string}`)}
            </span>
                    )}
                </div>
                {submitting ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit">{t("Modify")}</Button>
                )}
            </form>
        </>
    );
}
