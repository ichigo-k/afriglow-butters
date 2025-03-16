import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import ownerOnly from "../middleware/ownerOnly.js"
import { changePassword, editInfo, getUser, profile } from "../controllers/user.controller.js"
import { adminOnly } from "../middleware/adminOnly.js"
const router = express.Router()

router.get("/:id/get", verifyToken, adminOnly, getUser)
router.patch("/edit", verifyToken, editInfo)
router.post("/change-password", verifyToken, changePassword)
router.get("/profile", verifyToken, profile)


export default router