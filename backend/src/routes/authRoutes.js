import express from 'express';
import {
    signup,
    signin,
    login,
    logout,
} from '../controllers/authControllers.js'

// -> /api/auth
const router  = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/login", login);
router.post("/logout", logout);

export default router;