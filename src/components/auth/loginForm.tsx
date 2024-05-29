"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LoginUserInput, loginUserSchema } from "@/validator/registration";
import { LoadingButton } from "@/components/ui/buttons";

export const LoginForm = () => {
  const local = useLocale();
  const router = useRouter();
  const redirect: string =
    local === "en" ? "/en/auth/register" : "/fr/auth/register";
  const t = useTranslations("Register");
  const [submitting, setSubmitting] = useState(false);
  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      setSubmitting(false);

      if (response?.error) {
        reset({ password: "" });
        toast.error(t("loginFailed"));
      }

      toast.success(t("loginSuccess"));
      router.push(`/${local}/dashboard`);
    } catch (error: any) {
      toast.error(t("loginFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">{t("titleLogin")}</h1>
      <h2 className="text-balance text-muted-foreground">
        {t("subtitleLogin")}
      </h2>
      <form
        className="flex flex-col gap-5 w-5/6  md:w-4/6 xl:w-3/6"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div>
          <Input
            type="email"
            {...register("email")}
            placeholder={t("placeholderEmail")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.email?.message as string}`)}
            </span>
          )}
        </div>
        <div>
          <Input
            type="password"
            {...register("password")}
            placeholder={t("placeholderPassword")}
          />
          <Link href={"forgot-password"} className="text-xs text-primary">
            {t("forgotPassword")}
          </Link>
          {errors.password && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.password?.message as string}`)}
            </span>
          )}
        </div>
        {submitting ? <LoadingButton /> : <Button>{t("buttonLogin")}</Button>}
      </form>
      <p className="text-center">
        {t("noAccount")}{" "}
        <Link className="underline " href={redirect}>
          {t("register")}
        </Link>
      </p>
    </>
  );
};
