import prisma from "../config/prisma.js";

export default async function ownerOnly(req, res, next) {
    try {
        const { userId } = req
        const { id } = req.params
        if (!userId) throw new Error("Access denied -- No user logged in")
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) throw new Error("Access denied -- Invalid user id")
        const order = await prisma.order.findUnique({
            where: {
                id: id
            }
        })
        if (!order) throw new Error("Invalid order ID")
        if (user.id !== order.userId) throw new Error("Access Denied -- Cannot access this resource")
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}