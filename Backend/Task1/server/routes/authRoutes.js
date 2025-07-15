import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


// In routes/authRoutes.js (temporary only)
router.delete('/delete-user', async (req, res) => {
  const { email } = req.body;
  try {
    const deleted = await User.findOneAndDelete({ email });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
