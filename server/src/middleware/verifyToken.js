import jwt from "jsonwebtoken"

export async function verifyToken(req, res, next) {
    const token = req.cookies.token
    try {
        if (!token) throw new Error("Access denied -- no token provided")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) throw new Error("Access denied -- invalid token")
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}