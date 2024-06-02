import { updatePasswordSchema } from "@/validator/user";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();
  const { newPassword, oldPassword } = updatePasswordSchema.parse(data);
  const session = await auth();
  const passwordHash = await hash(newPassword as string, 12);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) {
    return NextResponse.json("noAccountExists", { status: 404 });
  }

  const isValid = await compare(oldPassword as string, user.password as string);

  if (!isValid) {
    return NextResponse.json("oldPasswordInvalid", { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        password: passwordHash,
      },
    });

    return NextResponse.json("PasswordResetSuccess", { status: 200 });
  } catch (error) {
    return NextResponse.json("PasswordResetFailed", { status: 500 });
  }
}
