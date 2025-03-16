import { transporter } from "./gmail.config.js";
import { WELCOME_EMAIL, PASSWORD_RESET_MAIL, PASSWORD_RESET_SUCCESS_MAIL, PURCHASE_SUCCESSFUL } from "./emailTemplates.js";


export async function sendWelcomeEmail(email, name, url) {
    transporter.sendMail({
        to: email,
        subject: "Welcome to AfriGlow Butters",
        html: WELCOME_EMAIL.replace("{name}", name).replace("{shop_link}", url)
    })
        .then(() => {
            console.log("Email sent 🔥🔥")
        })
        .catch((e) => {
            console.log("Something went wrong")
            console.log(e)
        })
}

export async function sendResetPasswordEmail(email, name, url) {
    transporter.sendMail({
        to: email,
        subject: "Account Password Reset",
        html: PASSWORD_RESET_MAIL.replace("{reset_link}", url).replace('{name}', name)
    })
        .then(() => {
            console.log("Email sent 🔥🔥")
        })
        .catch((e) => {
            console.log("Something went wrong")
            console.log(e)
        })
}

export async function sendResetSuccessEmail(email, url) {
    transporter.sendMail({
        to: email,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_MAIL.replace("{login_link}", url)
    })
        .then(() => {
            console.log("Email sent 🔥🔥")
        })
        .catch((e) => {
            console.log("Something went wrong")
            console.log(e)
        })

}

export async function sendPurchaseSuccessEmail(email, url, order_id) {
    transporter.sendMail({
        to: email,
        subject: "Purchase Successful",
        html: PURCHASE_SUCCESSFUL
            .replace("{order_id}", order_id)
            .replace("{order_tracking_link}", url)
    })
        .then(() => {
            console.log("Email sent 🔥🔥");
        })
        .catch((e) => {
            console.log("Something went wrong");
            console.log(e);
        });
}
