import prisma from "../config/prisma.js";
import { z } from "zod";
import bcrypt from "bcrypt"



const userSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional()
});
export async function editInfo(req, res) {
    try {
        const validatedData = userSchema.parse(req.body)
        const { userId } = req


        if (validatedData.email) {
            const emailAlreadyExists = await prisma.user.findUnique({
                where: { email: validatedData.email },
            })
            if (emailAlreadyExists) {
                throw new Error("Email already taken");
            }
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) throw new Error("User not found")
        await prisma.user.update({
            where: {
                id: userId
            }, data: validatedData
        })
        res.status(201).json({ success: true, message: "User details updated successfully" })

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


const passwordSchema = z.object({
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
    currentPassword: z.string().min(1, "Current password is required")
});

export async function changePassword(req, res) {
    try {
        const { userId } = req
        console.log("This is it ", userId)
        const validatedData = passwordSchema.parse(req.body);
        const { currentPassword, newPassword } = validatedData;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) throw new Error("User not found");

        const isCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isCorrect) throw new Error("Incorrect current password");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id: id }
        })
        if (!user) throw new Error("User does not exist")
        res.status(200).json({ success: true, user })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function profile(req, res) {
    try {
        const { userId } = req
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                order: {
                    where: {
                        paid: false
                    }
                },
            }
        })
        if (!user) throw new Error("User does not exist")
        res.status(200).json({ success: true, user })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}