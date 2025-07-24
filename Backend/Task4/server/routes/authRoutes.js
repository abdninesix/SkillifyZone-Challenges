import express from 'express';
import { registerUser, loginUser, deleteUser } from '../controllers/authController.js';
import { authorizeRoles } from '../middlewares/authorize.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete-user', protect, authorizeRoles('admin'), deleteUser);

export default router;
