import express from 'express';
import {
    signup,
    login,
    logout,
    editProfile,
} from '../controllers/authControllers.js'
import {protectRoute} from '../middleware/protectRoute.js';

// -> /api/auth
const router  = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
//put
router.put("/edit-profile/:userId", protectRoute ,editProfile);

export default router;