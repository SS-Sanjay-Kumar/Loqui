import cloudinary from '../config/cloudinary.js';
import { getReceiverSocketId, io } from '../config/socket.js';

import { Message } from "../models/Message.js";
import { User } from "../models/User.js"

export const fetchUsers = async (req, res) => {
    try {
        //fetch everyone except the current user, ne -> not equal
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Error in fetchUsers: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export const fetchMessages = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const messages = await User.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ]
        });

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error("Error in fetchMessages: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { text, image } = req.body;

        let imageUrl;
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image)
            imageUrl = uploadedImage.secure_url;
        }

        else if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message text is required",
            });
        }

        const isValidReceiver = await User.findById(receiverId).select("_id");
        if (!isValidReceiver) {
            return res.status(400).json({
                success: false,
                message: "Receiver not found"
            });
        }
        const message = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await message.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        io.to(receiverSocketId).emit("newMessage", message);

        return res.status(201).json(message);
    } catch (error) {
        console.error("Error in sendMessage: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}