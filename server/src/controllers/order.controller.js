import prisma from "../config/prisma.js";
import { z } from "zod"
import axios from "axios"
import { sendPurchaseSuccessEmail } from "../mail/emails.js";



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
        if (!Object.values(OrderStatus).includes(status.toUpperCase())) {
            return res.status(400).json({ success: false, error: "Invalid order status" });
        }

        const enumStatus = OrderStatus[status.toUpperCase()];

        const orders = await prisma.order.findMany({
            where: { status: enumStatus }
        });
        const count = await prisma.order.count({ where: { status: enumStatus } });

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
                items: {
                    include:{
                        product: true
                    }
                },
                address: true,
                User: true,
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

    try {

        const result = orderSchema.parse(req.body);

        // if (!result.success) {
        //     return res.status(400).json({
        //         message: "Validation failed",
        //         errors: result.error.errors,
        //     });
        // }
        const { orderDetails, items, address } = result;
        const { userId } = req;


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

export async function makePayment(req, res) {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id }, include: {
                User: true
            }
        });

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (order.paid === true) throw new Error("Order already paid")


        const url = "https://api.paystack.co/transaction/initialize";
        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json"
        };
        const data = {
            email: order.User.email,
            amount: Math.round(parseFloat(order.total) * 100)
        };

        axios.post(url, data, { headers })
            .then(async response => {
                await prisma.order.update({
                    where: {
                        id: id
                    }, data: { reference: response.data.data.reference }

                })
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(400).json({ success: false, message: "An error occurred " });
                console.log(error)
            });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function verifyPayment(req, res) {
    try {
        const { userId } = req
        const { reference } = req.query;
        if (!reference) {
            return res.redirect(`${process.env.CLIENT_URL}/error`);
        }
        const order = await prisma.order.findFirst({
            where: {
                reference: reference
            }
        })
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!order) return res.redirect(`${process.env.CLIENT_URL}/error`);

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });
        const paymentData = response.data;
        if (paymentData.data.status === "success") {
            await prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    paid: true
                }
            })

            sendPurchaseSuccessEmail(user.email, process.env.CLIENT_URL, order.id)
            return res.redirect(`${process.env.CLIENT_URL}/success`);
        } else {
            return res.redirect(`${process.env.CLIENT_URL}/error`);
        }
    } catch (error) {
        console.log(error)
        return res.redirect(`${process.env.CLIENT_URL}/error`);
    }
}

export async function cancelOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (order.paid) throw new Error("This order has already been paid for and cannot be canceled.");
        await prisma.order.delete({
            where: { id }
        })
        res.status(200).json({ success: true, message: "Order has been cancelled" })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function changeStatus(req, res) {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        if (!order.paid) throw new Error("Order status cannot be changed because payment has not been made.");
        const { status } = req.params;
        if (!Object.values(OrderStatus).includes(status.toUpperCase())) {
            return res.status(400).json({ success: false, error: "Invalid order status" });
        }

        const enumStatus = OrderStatus[status.toUpperCase()];
        await prisma.order.update({
            where: { id },
            data: {
                status: enumStatus
            }
        })
        res.status(200).json({ success: true, message: "Order status has been updated" })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}




