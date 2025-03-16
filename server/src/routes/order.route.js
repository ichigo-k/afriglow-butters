import express from "express"
import { addOrder, cancelOrder, changeStatus, getAllOrders, getOrdersByStatus, getSingleOrder, makePayment, verifyPayment } from "../controllers/order.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { adminOnly } from "../middleware/adminOnly.js"
import ownerAndAdminOnly from "../middleware/ownerAndAdminOnly.js"
import ownerOnly from "../middleware/ownerOnly.js"

const router = express.Router()

router.get("/verify_payment", verifyToken, verifyPayment)
router.get("/", verifyToken, adminOnly, getAllOrders)
router.get("/status/:status", verifyToken, adminOnly, getOrdersByStatus)
router.get("/:id", verifyToken, ownerAndAdminOnly, getSingleOrder)
router.post("/", verifyToken, addOrder)
router.post("/pay/:id", verifyToken, ownerOnly, makePayment)
router.delete("/cancel/:id", verifyToken, ownerOnly, cancelOrder)
router.post("/change-status/:id", verifyToken, adminOnly, changeStatus)


export default router