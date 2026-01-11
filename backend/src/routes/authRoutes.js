import express from 'express';
import {
    signup,
    login,
    logout,
    editProfile,
    checkAuth,
} from '../controllers/authControllers.js'
import { protectRoute } from '../middleware/protectRoute.js';

// -> /api/auth
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
//put
router.put("/edit-profile", protectRoute, editProfile);
// get
router.get("/check-auth", protectRoute, checkAuth);

export default router;