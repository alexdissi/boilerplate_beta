/* eslint-disable camelcase */
import {TypeOf, object, string} from "zod"

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/u

export const createUserSchema = object({
    firstName: string({required_error: "firstnamerequired"}).min(
        1,
        "firstnamerequired"
    )
        .max(32, "firstnamemaxlength"),
    lastName: string({required_error: "lastnamerequired"}).min(
        1,
        "lastnamerequired"
    )
        .max(32, "lastnamemaxlength"),
    email: string({required_error: "emailrequired"})
        .min(1, "emailrequired")
        .email("emailvalid"),
    password: string({ required_error: "passwordrequired" })
        .min(1, "passwordrequired")
        .min(8, "passwordminlength")
        .max(32, "passwordmaxlength")
        .regex(passwordValidation, "passwordRegex"),
    passwordConfirm: string({
        required_error: "confirmpasswordrequired",
    }).min(1, "confirmpasswordrequired"),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "confirmpasswordmatch",
})

export const loginUserSchema = object({
    email: string({ required_error: "emailrequired" })
        .min(1, "emailrequired")
        .email("emailvalid"),
    password: string({ required_error: "passwordrequired" }).min(
        1,
        "passwordrequired"
    ),
})

export const magicLinkSchema = object({
    email: string({ required_error: "emailrequired" })
        .min(1, "emailrequired")
        .email("emailvalid"),
})

export const passwordForgotSchema = object({
    email: string({ required_error: "emailrequired" })
        .min(1, "emailrequired")
        .email("emailvalid"),
})

export const passwordReset = object({
    password: string({ required_error: "passwordrequired" })
        .min(1, "passwordrequired")
        .min(8, "passwordminlength")
        .max(32, "passwordmaxlength")
        .regex(passwordValidation, "passwordRegex"),
    passwordConfirm: string({
        required_error: "confirmpasswordrequired",
    }).min(1, "confirmpasswordrequired"),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "confirmpasswordmatch",
})


export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
export type MagicLinkInput = TypeOf<typeof magicLinkSchema>
export type PasswordForgotInput = TypeOf<typeof passwordForgotSchema>
export type PasswordResetInput = TypeOf<typeof passwordReset>