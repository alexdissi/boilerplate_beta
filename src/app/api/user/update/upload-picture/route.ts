import {NextResponse} from "next/server"
import {uploadImage} from "@/lib/awsUpload"
import {auth} from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    const session = await auth()

    if (!session) {
        return NextResponse.json({
            error: "Unauthorized",
        })
    }

    try {
        const formData = await req.formData()
        const file = formData.get("file")
        const imageUrl = await uploadImage(file) as string
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                image: imageUrl
            },
        })
        return NextResponse.json(imageUrl)
    } catch (error) {
        return NextResponse.json({error: "Error"})
    }
}