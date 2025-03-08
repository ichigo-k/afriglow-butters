import express from "express"
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/products.controller.js"
import { adminOnly } from "../middleware/adminOnly.js"
import { verifyToken } from "../middleware/verifyToken.js"


const router = express.Router()
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.post("/", verifyToken, adminOnly, addProduct)
router.patch("/:id", verifyToken, adminOnly, updateProduct)
router.delete("/:id", verifyToken, adminOnly, deleteProduct)

export default router