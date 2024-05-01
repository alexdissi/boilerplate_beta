import nodemailer from "nodemailer"

const email = process.env.MAIL as string
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,},
})

export const sendMail = async (to: string,subject:string, html: string) => {
    await transporter.sendMail({
        from: email,
        to,
        subject,
        html
    })
}