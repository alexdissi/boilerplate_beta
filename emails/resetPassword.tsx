import * as React from "react";
import { Tailwind } from "@react-email/components";

interface ChangePasswordEmailProps {
  name: string;
  link: string;
}

export function ChangePasswordEmail({ name, link }: ChangePasswordEmailProps) {
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
        <p className="text-xl text-black">
          Vous venez de demander une reinitialisation de votre mot de passe{" "}
        </p>
        <a href={link} className="underline text-brand">
          Changer de mot de passe
        </a>
        <br />
        <p className="text-xl text-black">
          Si vous n'avez pas demandé de réinitialisation de mot de passe,
          veuillez ignorer cet email.
        </p>
        <p>Best, Boilerplate Team</p>
      </div>
    </Tailwind>
  );
}
