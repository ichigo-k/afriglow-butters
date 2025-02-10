import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure: true,
    auth:{
        user:process.env.EMAIL_ACCOUNT,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})