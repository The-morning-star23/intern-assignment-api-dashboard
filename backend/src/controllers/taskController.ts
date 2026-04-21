// backend/src/controllers/taskController.ts
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Task from '../models/Task';

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      res.status(400).json({ message: 'Please add a text field' });
      return;
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id, // Attach the user ID from the token
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Ensure the logged-in user owns this task before updating
    if (task.user.toString() !== req.user.id) {
      res.status(401).json({ message: 'User not authorized to update this task' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the updated document
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Ensure the logged-in user owns this task before deleting
    if (task.user.toString() !== req.user.id) {
      res.status(401).json({ message: 'User not authorized to delete this task' });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};