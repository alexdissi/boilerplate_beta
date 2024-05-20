import Stripe from "stripe";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json() as Stripe.Event;

        switch (body.type) {
            case "checkout.session.completed": {
                await handleCheckoutSessionCompleted(body.data.object as Stripe.Checkout.Session);

                break;
            }

            case "invoice.paid": {
                await handleInvoicePaid(body.data.object as Stripe.Invoice);

                break;
            }

            case "invoice.payment_failed": {
                await handleInvoicePaymentFailed(body.data.object as Stripe.Invoice);

                break;
            }

            case "customer.subscription.deleted": {
                await handleSubscriptionDeleted(body.data.object as Stripe.Subscription);

                break;
            }

            default:
                console.warn(`Unhandled event type ${body.type}`);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
        const stripeCustomerId = session.customer as string;
        const user = await findUserFromStripeCustomerId(stripeCustomerId);

        if (!user?.id) {return;}

        await prisma.user.update({
            where: { id: user.id },
            data: { plan: "PREMIUM" },
        });
    } catch (error: any) {
        throw new error
    }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
    try {
        const stripeCustomerId = invoice.customer as string;
        const user = await findUserFromStripeCustomerId(stripeCustomerId);

        if (!user?.id) {return;}

        await prisma.user.update({
            where: { id: user.id },
            data: { plan: "PREMIUM" },
        });
    } catch (error: any) {
        throw new error
    }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    try {
        const stripeCustomerId = invoice.customer as string;
        const user = await findUserFromStripeCustomerId(stripeCustomerId);

        if (!user?.id) {return;}

        await prisma.user.update({
            where: { id: user.id },
            data: { plan: "FREE" },
        });
    } catch (error: any) {
        throw new error
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    try {
        const stripeCustomerId = subscription.customer as string;
        const user = await findUserFromStripeCustomerId(stripeCustomerId);

        if (!user?.id) {return;}

        await prisma.user.update({
            where: { id: user.id },
            data: { plan: "FREE" },
        });
    } catch (error: any) {
        throw new error
    }
}

function findUserFromStripeCustomerId(stripeCustomerId: unknown) {
    if (typeof stripeCustomerId !== "string") {
        return null;
    }

    return prisma.user.findFirst({
        where: {stripeCustomerId},
    });
}
