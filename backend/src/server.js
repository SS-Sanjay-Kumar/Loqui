import express from 'express';
import dotenv from 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import connectDB from './config/db.js';

const app = express()
const PORT = process.env.PORT || 5001

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
));

//routes and controllers
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    connectDB();
})
