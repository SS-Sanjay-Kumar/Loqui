import mongoose from 'mongoose';
import dotenv from 'dotenv/config.js';

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully Connected to MONGO DB");
        
    } catch (error) {
        console.error("Error connecting with db", error);
        process.exit(1);
    }
}

export default connectDB;