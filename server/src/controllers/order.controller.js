import { PrismaClient } from "@prisma/client";
import z from "zod"

const prisma = new PrismaClient();

export async function getAllOrders(req, res) {
    try {
        const orders = await prisma.order.findMany();
        const count = await prisma.order.count();
        res.status(200).json({ success: true, count, orders });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


export async function getOrdersByStatus(req, res) {
    try {
        const { status } = req.params;
        const orders = await prisma.order.findMany({
            where: { status }
        });
        const count = await prisma.order.count({ where: { status } });
        res.status(200).json({ success: true, count, orders });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


export async function getSingleOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                address: true
            }
        });

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}


const orderSchema = z.object({
    orderDetails: z.object({
        total: z.number().positive("Total must be a positive number"),
    }),
    items: z.array(
        z.object({
            productId: z.string().min(1, "Product ID is required"),
            quantity: z.number().int().positive("Quantity must be a positive integer"),
        })
    ).nonempty("At least one item is required"),
    address: z.object({
        region: z.string().min(1, "Region is required"),
        town: z.string().min(1, "Town is required"),
        landmark: z.string().optional(),
    }),
});

export async function addOrder(req, res) {
    const validatedData = orderSchema.parse(req.body);
    const { orderDetails, items, address } = validatedData;
    const { userId } = req;

    try {

        const newAddress = await prisma.address.create({
            data: {
                region: address.region,
                town: address.town,
                landmark: address.landmark,
            },
        });


        const newOrder = await prisma.order.create({
            data: {
                total: orderDetails.total,
                userId: userId,
                addressId: newAddress.id,
            },
        });


        for (const item of items) {
            await prisma.orderItem.create({
                data: {
                    productId: item.productId,
                    orderId: newOrder.id,
                    quantity: item.quantity,
                },
            });
        }

        res.status(201).json({ success: true, order: newOrder });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(400).json({ success: false, error: err.message });
    }
}
