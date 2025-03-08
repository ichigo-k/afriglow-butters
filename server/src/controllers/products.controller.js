import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllProducts(req, res) {
    try {
        const products = await prisma.product.findMany({})
        const count = await prisma.product.count()
        res.status(200).json({ success: true, count: count, products: products })

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function getSingleProduct(req, res) {
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: { id }
        })
        if (!product) {
            throw new Error("Product not found!")
        }
        res.status(200).json({ success: true, product: product })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function addProduct(req, res) {
    try {
        const { name, price, image, discount, stock } = req.body
        if (!name || !price || !stock) throw new Error("All fields required")
        const product = await prisma.product.create({
            data: {
                name, price, image, stock, discount
            }
        })
        res.status(201).json({ success: true, product: product, message: "Product added successfully" })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function updateProduct(req, res) {
    try {
        const data = req.body
        const { id } = req.params
        const productExists = await prisma.product.findUnique({
            where: { id }
        })
        if (!productExists) {
            throw new Error("Product not found!")
        }
        const product = await prisma.product.update({
            where: { id }, data
        })
        res.status(200).json({ success: true, product: product, message: "Product updated successfully" })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: { id }
        })
        if (!product) {
            throw new Error("Product not found!")
        }
        await prisma.product.delete({
            where: { id }
        })
        res.status(200).json({ success: true, product: product, message: "Product deleted successfully " })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}