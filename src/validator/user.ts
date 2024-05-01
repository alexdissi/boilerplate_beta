/* eslint-disable camelcase */
import { object, string, TypeOf } from "zod";

const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/u;

export const updatePasswordSchema = object({
    password: string({ required_error: "passwordrequired" })
        .min(1, "passwordrequired")
        .min(8, "passwordminlength")
        .max(32, "passwordmaxlength")
        .regex(passwordValidation, "passwordRegex"),
});

export const updateInfoSchema = object({
    username: string({ required_error: "usernamerequired" })
        .min(1, "UsernameMinLength")
        .max(32, "UsernameMaxLength"),
});

export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>;
export type UpdateInfoInput = TypeOf<typeof updateInfoSchema>;
