"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale, useTranslations } from "next-intl";
import { CreateUserInput, createUserSchema } from "@/validator/registration";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/buttons";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const local = useLocale();
  const router = useRouter();
  const redirect: string = local === "en" ? "/en/auth/login" : "/fr/auth/login";
  const t = useTranslations("Register");
  const [loading, setLoading] = useState(false);
  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        return toast.error(t(responseData));
      }

      toast.success(t(responseData));
      router.push(redirect);
    } catch (error: any) {
      toast.error(t(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <h2 className="text-balance text-muted-foreground">{t("subtitle")}</h2>
      <form
        className="flex flex-col gap-5 w-5/6  md:w-4/6 xl:w-3/6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            type="text"
            {...register("firstName")}
            placeholder={t("placeholderFirstName")}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.firstName?.message as string}`)}
            </span>
          )}
        </div>
        <div>
          <Input
            type="text"
            {...register("lastName")}
            placeholder={t("placeholderLastName")}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.lastName?.message as string}`)}
            </span>
          )}
        </div>
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
          {errors.password && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.password?.message as string}`)}
            </span>
          )}
        </div>
        <div>
          <Input
            type="password"
            {...register("passwordConfirm")}
            placeholder={t("placeholderConfirmPassword")}
          />
          {errors.passwordConfirm && (
            <span className="text-red-500 text-xs pt-1 block">
              {t(`${errors.passwordConfirm?.message as string}`)}
            </span>
          )}
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" required={true} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("acceptTerms")}
            </label>
            <p className="text-sm text-muted-foreground">{t("terms")}</p>
          </div>
        </div>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">{t("button")}</Button>
        )}
        <Separator />
        <p className="text-center">
          {t("alreadyAccount")}{" "}
          <Link className="underline " href={redirect}>
            {t("login")}
          </Link>
        </p>
      </form>
    </>
  );
}
