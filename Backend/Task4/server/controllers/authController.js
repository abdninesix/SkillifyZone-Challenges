import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, 
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, 
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const deleted = await User.findOneAndDelete({ email });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
