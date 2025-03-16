import express from "express"
import cookieParser from "cookie-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/products.route.js"
import orderRoutes from "./routes/order.route.js"
import userRoutes from "./routes/user.route.js"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "views")));



app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname })
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/order", orderRoutes)
app.use(userRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))