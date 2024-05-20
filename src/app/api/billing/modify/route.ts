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
            id: session.user.id,
        },
        select: {
            stripeCustomerId: true,
        }
    })
    const stripeCustomerID = user?.stripeCustomerId as string
    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerID,
        return_url: `${process.env.NEXTAUTH_URL}/fr`,
    });

    return NextResponse.json(stripeSession.url, { status: 200 });
}