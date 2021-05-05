import express from "express"
import cors from "cors"
import gimnasio from "./api/routes/gym.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/gimnasio", gimnasio)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app