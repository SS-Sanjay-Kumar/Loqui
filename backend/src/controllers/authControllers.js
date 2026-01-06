import bcryptjs from 'bcryptjs';

import {User} from '../models/User.js' 
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';

export const signup = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!email || !password || !name){
            return res.status(400).json({
                sucess: false,
                message: "All fields are mandatory",
            });
        }

        const userAlreadyExists = await User.findOne({email});
        
        if(userAlreadyExists){
            return res.status(400).json({
                success: false,
                message: "User already exists, try logging in",
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10); 
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            name,
            email,
            password:hashedPassword,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24hours
        })

        await user.save();
        generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
            success: true,
            user:{
                ... user._doc,
                password:undefined,
                verificationCode: undefined,
                verificationCodeExpiresAt: undefined,
            }
        });

    } catch (error) {
        console.error("Error in signup route:", error);
        return res.status(500).json({
            success: false,
            message: "Error during signup"
        });
    }
}
export const signin = (req, res)=>{
    return;
}
export const login = (req, res)=>{
    return;
}
export const logout = (req, res)=>{
    return;
}