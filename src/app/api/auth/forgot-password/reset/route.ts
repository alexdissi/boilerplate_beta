import {NextResponse} from "next/server"
import cryptoRandomString from "crypto-random-string"
import {passwordForgotSchema} from "@/validator/registration"
import {render} from "@react-email/render"
import {ChangePasswordEmail} from "../../../../../../emails/resetPassword";
import prisma from "@/lib/db";
import {sendMail} from "@/lib/mailer";

export async function POST(req: Request) {
    const { email } = passwordForgotSchema.parse(await req.json())
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({
            status: "error",
            message: "User with that email does not exist"
        }, {status: 400})
    }

    const encrypt = cryptoRandomString({length: 32, type: "alphanumeric"})
    const passwordResetTokenExp = new Date()
    passwordResetTokenExp.setMinutes(passwordResetTokenExp.getMinutes() + 10)

    await prisma.user.update({
        where: {
            email
        },
        data: {
            passwordResetToken: encrypt,
            passwordResetTokenExp,
        }
    })

    const name = user.name as string
    const link = `${process.env.APP_URL}/auth/reset-password/${encrypt}`
    await sendMail(email, "Password reset", render(ChangePasswordEmail({ name,link })) )

    return NextResponse.json({
        status: "success",
        link,
        message: "Password reset link sent successfully"
    })
}