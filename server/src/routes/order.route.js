import express from "express"
import { addOrder, getAllOrders, getOrdersByStatus, getSingleOrder } from "../controllers/order.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { adminOnly } from "../middleware/adminOnly.js"

const router = express.Router()

router.get("/", verifyToken, adminOnly, getAllOrders)
router.get("/status/:status", verifyToken, adminOnly, getOrdersByStatus)
router.get("/:id", verifyToken, getSingleOrder)
router.post("/", verifyToken, addOrder)

export default router