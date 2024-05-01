import {hash} from "bcryptjs"
import {NextResponse} from "next/server"
import {createUserSchema} from "@/validator/registration"
import {WelcomeEmail} from "../../../../../emails/welcome";
import prisma from "@/lib/db";
import {sendMail} from "@/lib/mailer";
import {render} from "@react-email/render";
export async function POST(req: Request) {
    const {firstName, lastName, email, password} = createUserSchema.parse(await req.json())
    const hashedPassword: string = await hash(password, 12)
    const name: string = `${firstName} ${lastName}`
    const cleanEmail: string = email.toLowerCase()

    if (!name || !email || !password) {
        return NextResponse.json("Missing Fields", {status: 400})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: cleanEmail,
        },
    })

    if (exist) {
        return NextResponse.json("User.ts already exists!", {status: 500})
    }

    await prisma.user.create({
        data: {
            name,
            email: cleanEmail,
            password: hashedPassword,
        },
    })

    await sendMail(cleanEmail, "BoilerPlate", render(WelcomeEmail({ name })))

    return NextResponse.json("User.ts created successfully!", {status: 200})
}