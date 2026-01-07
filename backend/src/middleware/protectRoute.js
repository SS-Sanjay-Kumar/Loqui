import dotenv from 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No Token Provided"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid/Expired Token"
            })
        }
        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({
                successs: false,
                message: "User not found"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in protectRoute middleware: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}