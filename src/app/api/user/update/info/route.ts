import { NextResponse } from "next/server";
import {updateInfoSchema} from "@/validator/user";
import prisma from "@/lib/db";
import {auth} from "@/lib/auth";

export async function PUT(req: Request) {
    const requestData = await req.json();
    const { username } = updateInfoSchema.parse(requestData);
    const { id } = requestData;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    console.log(id);

    if (!user) {
        throw new Error("Email does not exists");
    }

    try {
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                username,
            },
        });

        return new Response("Email Updated", { status: 200 });
    } catch (error) {
        return new Response("Internal Error", { status: 500 });
    }
}

export async function GET() {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            {
                status: "error",
                message: "You must be logged in to view your profile",
            },
            { status: 401 },
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    return NextResponse.json({
        user: {
            name: user?.name,
            email: user?.email,
            username: user?.username,
        },
    });
}
