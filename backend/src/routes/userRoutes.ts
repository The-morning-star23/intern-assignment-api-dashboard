// backend/src/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import User from '../models/User';

const router = express.Router();

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
router.get('/', protect, admin, async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords from result
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;