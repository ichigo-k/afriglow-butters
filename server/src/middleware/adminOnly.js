import prisma from "../config/prisma.js";

export async function adminOnly(req, res, next) {
    try {
        const { userId } = req
        if (!userId) throw new Error("Access denied -- No user logged in")
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) throw new Error("Access denied -- Invalid user id")
        if (user.role !== "admin") throw new Error("Access Denied -- Admin only route")
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}