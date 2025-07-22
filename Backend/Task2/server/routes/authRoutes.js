// routes/authRoutes.js
import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', register);
router.post('/login', login);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Get profile
router.get('/profile', protect, getProfile);

export default router;
