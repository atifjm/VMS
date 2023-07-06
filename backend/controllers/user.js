import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async(req,res) => {
    try {
        //CHECKING EMAIL ALREADY EXIST
        const existingUser = await User.findOne({email: req.body.emil})
        if(existingUser){
            return res.status(200).send({success:false, message: `Email already registered`})
        }

        //HASHING PASSWORD
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword

        //REGISTRING NEW USER
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        res.status(201).send({success:true, message: "User registered successfully"})
 
    } catch (err) {
        console.log(err)
        res.status(500).send({success:false, message: `Error in Register Controller ${err.message}`})   
    }
}

export const login = async(req,res) => {
    try {
        //CHECKING USER EXIST
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({success:false, message:`User Doesnot Exist`})
        }
        //CHECKING PASSWORD MATCH
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({success:false, message:`Incorrect Password`})
        }
        //ASSIGNING TOKEN
        const token = jwt.sign({id:user._id}, process.env.JWT_KEY, {expiresIn:'1d'})
        res.status(200).send({success:true, message: `Login Successfully`, token})
        
    } catch (err) {
        console.log(err)
        res.status(500).send({success:false, message: `Error in Login Controller ${err.message}`})        
    }
}

export const authorization = async(req,res) => {
    try {
        const user = await User.findOne({_id:req.body.userId})
        user.password = undefined
        if(!user){
            return res.status(200).send({success:false, message: "User Not Found"})
        }else {
            res.status(200).send({success:true, data:user});
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send({success:false, message: `Authorization Error`, err}) 
    }
}