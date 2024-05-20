import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createUserSchema } from "@/validator/registration";
import { WelcomeEmail } from "../../../../../emails/welcome";
import prisma from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { render } from "@react-email/render";
import {stripe} from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = createUserSchema.parse(await req.json());
        const hashedPassword: string = await hash(password, 12);
        const name: string = `${firstName} ${lastName}`;
        const cleanEmail: string = email.toLowerCase();
        const defaultAvatar: string = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`

        if (!name || !email || !password) {
            return NextResponse.json("Missing Fields", { status: 400 });
        }

        const exist = await prisma.user.findUnique({
            where: {
                email: cleanEmail,
            },
        });

        if (exist) {
            return NextResponse.json("User.ts already exists!", { status: 500 });
        }

        const stripeCustomer = await stripe.customers.create({
            email
        })

        await prisma.user.create({
            data: {
                name,
                email: cleanEmail,
                password: hashedPassword,
                image: defaultAvatar,
                stripeCustomerId: stripeCustomer.id
            },
        });

        await sendMail(cleanEmail, "BoilerPlate", render(WelcomeEmail({ name })));

        return NextResponse.json("User.ts created successfully!", { status: 200 });
    } catch (error) {
        console.error("Une erreur s'est produite :", error);

        return NextResponse.json("Une erreur s'est produite lors du traitement de la requête.", { status: 500 });
    }
}