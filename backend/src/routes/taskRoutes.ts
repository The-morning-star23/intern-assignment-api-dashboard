// backend/src/routes/taskRoutes.ts
import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

export default router;