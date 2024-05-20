import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { UserSettings } from "@/components/billing/userSettings";
import Link from "next/link";

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion de l'abonnement</CardTitle>
                <CardDescription>
                        Bienvenue sur la page de gestion de votre abonnement. Ici, vous pouvez modifier votre abonnement à l'application
                        selon vos besoins.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <UserSettings />
                </div>
            </CardContent>
            <CardFooter className={"flex justify-center"}>
                You can change your subscription here. <Link href={"/"}>Go back</Link>
            </CardFooter>
        </Card>
    );
}
