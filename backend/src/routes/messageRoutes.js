import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import {
    fetchUsers,
    fetchMessages,
    sendMessage,
} from '../controllers/messageControllers.js';

const router = express.Router();

//get
router.get("/users", protectRoute, fetchUsers );
router.get("/:id", protectRoute, fetchMessages );

//post
router.post("/send/:id", protectRoute, sendMessage);

export default router;