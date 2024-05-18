"use client";
import {redirect, useRouter} from "next/navigation";

export default function BuyButton() {
    const router = useRouter();
    const handleClick = async () => {
        const response = await fetch("/api/billing/subscription", {
            method: "GET",
        });
        const url = await response.json();
        router.push(url);
    }
    return (
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Buy Now
        </button>
    );
}