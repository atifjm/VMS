import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import vehicleRoute from "./routes/vehicles.js"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/vehicle", vehicleRoute)

const connection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfully")
    } catch (err) {
        console.log(err)  
    }
}

app.listen(5000, ()=> {
    connection()
    console.log("server is live at port 5000")
})
