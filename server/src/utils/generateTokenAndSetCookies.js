import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET || "This is for development"

export function generateTokenAndSetCookie(res, id) {
    const token = jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 20 * 24 * 60 * 60 * 1000
    })

    return token;

}