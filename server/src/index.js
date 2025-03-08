import express from "express"
import "dotenv/config.js"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/products.route.js"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use(productRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))