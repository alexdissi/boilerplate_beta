import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/db";

export const { handlers, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password as string,
                    user.password as string,
                );

                if (!isPasswordValid) {
                    return null;
                }

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.username = user.username;
            }

            if (trigger === "update" && session) {
                token.name = session.name;
                token.email = session.email;
                token.username = session.username;
            }

            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.username = token.username as string;
            }

            return session;
        },
    },
});
