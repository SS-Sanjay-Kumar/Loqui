import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import {fetchUsers} from '../controllers/messageControllers.js';

const router = express.Router();

router.get("/users", protectRoute, fetchUsers );

export default router;