import {PutObjectCommand, S3Client,} from "@aws-sdk/client-s3"
import {NextResponse} from "next/server"

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
})

export async function uploadFileToS3(file: any, fileName: string) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: file,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)

    return fileName
}

export async function uploadImage(file: any) {
    const awsUrl = process.env.AWS_S3_BUCKET_URL

    if (!file) {
        return NextResponse.json({error: "File is required."}, {status: 400})
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadFileToS3(buffer, file.name)

    return `${awsUrl}/${fileName}`
}