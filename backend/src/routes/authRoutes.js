import express from 'express';
import {
    signup,
    login,
    logout,
    editProfile,
} from '../controllers/authControllers.js'

// -> /api/auth
const router  = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/edit-profile", editProfile);

export default router;