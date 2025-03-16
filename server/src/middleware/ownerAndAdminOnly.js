import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function ownerAndAdminOnly(req, res, next) {
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
        if (user.role !== "admin" && user.id !== order.userId) throw new Error("Access Denied -- cannot access this resource")
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}