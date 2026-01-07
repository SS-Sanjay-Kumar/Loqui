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
        if(password.length <6){
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 6 characters long",
            })
        }
        const userAlreadyExists = await User.findOne({email});
        
        if(userAlreadyExists){
            return res.status(400).json({
                success: false,
                message: "User already exists, try logging in",
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10); 
        const user = new User({
            name,
            email,
            password:hashedPassword,
        })

        if(user){
            generateTokenAndSetCookie(res, user._id);
            await user.save();

        }else{
            return res.status(500).json({
                success: false,
                message: "Error creating user"
            });
        }
        
        return res.status(201).json({
            success: true,
            user:{
                ... user._doc,
                password:undefined,
            }
        });

    } catch (error) {
        console.error("Error in signup route:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);

        if(!isCorrectPassword){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now();
        await user.save();

        return res.status(200).json({
            success: true,
            user:{
                ... user._doc,
                password:undefined,
            }
        });

    } catch (error) {
        console.error("Error in login: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const logout = (req, res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Error in logout route: " ,error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}