"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export const UserSettings = () => {
    const router = useRouter();
    const handleClick = async () => {
        const response = await fetch("/api/billing/modify", {
            method: "GET",
        });
        const url = await response.json();
        router.push(url);
    }

    return (
        <Button onClick={handleClick}>
        Modify Subscription
        </Button>
    );
}