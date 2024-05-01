import * as React from "react"
import { Tailwind } from "@react-email/components"

interface WelcomeEmailProps {
    name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#004E8F",
                        },
                    },
                },
            }}
        >
            <div className="text-center bg-white mx-auto">
                <p className="text-3xl text-black font-bold">Bonjour {name},</p>
                <p className="text-xl text-black">Bienvenue à bord ! Nous sommes ravis de vous avoir parmi nous.</p>
                <a className="underline">Commencer maitenant</a>
                <br/>
                <p>Best, Boilerplate Team</p>
            </div>
        </Tailwind>
    )
}