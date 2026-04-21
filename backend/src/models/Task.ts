// backend/src/models/Task.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const taskSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This links it to our User model
    },
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;