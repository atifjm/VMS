import express from "express"
import { authorization, login, register } from "../controllers/user.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"


const router = express.Router()

//REGISTER
router.post("/register", register)

//LOGIN
router.post("/login", login)

//AUTHENTICATION
router.post("/getUserData", authMiddleware, authorization)

export default router