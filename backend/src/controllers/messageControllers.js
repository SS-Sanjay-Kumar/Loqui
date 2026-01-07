import { User } from "../models/User.js"

export const fetchUsers = async(req, res)=>{
    try {
        const users = await User.find({}).select("-password");

        return res.status(200).json({
            success:true,
            users,
        });
    } catch (error) {
        console.error("Error in fetchUsers: ", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}