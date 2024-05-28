/* eslint-disable camelcase */

import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import {stripe} from "@/lib/stripe";

export async function GET() {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id as string,
        },
        select: {
            stripeCustomerId: true,
        }
    })
    const stripeCustomerID = user?.stripeCustomerId as string
    const stripeSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerID,
        mode: "subscription",
        payment_method_types: ["card","paypal"],
        line_items: [
            {
                price: process.env.NODE_ENV === "development" ? "price_1PHZohHvWY7Zh28WHt9gBv45" : "",
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXTAUTH_URL}/fr`,
        cancel_url: `${process.env.NEXTAUTH_URL}/fr`,
    });

    return NextResponse.json(stripeSession.url, { status: 200 });
}