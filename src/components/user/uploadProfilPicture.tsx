"use client"

import React, {ChangeEvent, useState} from "react";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Label} from "@/components/ui/label";
import {useTranslations} from "next-intl";

export default function UploadProfilePicture({userPicture}: { userPicture: string}) {
    const [loading, setLoading] = useState(false);
    const {data: session, update} = useSession();
    const router = useRouter();
    const t = useTranslations("User");

    const generateRandomFileName = (originalName: string) => {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 8);
        const extension = originalName.split(".").pop();

        return `${timestamp}_${randomString}.${extension}`;
    };

    const onSubmit = async (file: File) => {
        try {
            const formData = new FormData();
            const newFileName = generateRandomFileName(file.name);
            formData.append("file", file, newFileName);
            const response = await fetch("/api/user/update/upload-picture", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                toast.error(t("uploadFailed"));
                setLoading(false);
                return;
            }

            const imageUrl = await response.json();
            await update({ ...session?.user, image: imageUrl });
            toast.success(t("uploadSuccess"));
            router.refresh()
        } catch (error) {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (fileList && fileList.length > 0) {
            setLoading(true);
            await onSubmit(fileList[0]);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <img src={userPicture} alt={`Profil picture of ${session?.user?.name}`} className="w-40 h-40 rounded-full mx-auto" />
            <form>
                <div className="flex flex-col gap-3 items-start">
                    <Label>{t("uploadPicture")}</Label>
                    <Input type="file" name="file" onChange={handleFileChange} disabled={loading}/>
                </div>
            </form>
        </div>
);
}
