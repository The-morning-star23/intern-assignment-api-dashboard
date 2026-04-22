// frontend/src/components/TaskForm.tsx
import React, { useState } from 'react';

export interface TaskData {
  _id?: string;
  title: string;
  description?: string;
  status: string;
}

interface TaskFormProps {
  onSubmit: (taskData: TaskData) => void;
  initialData?: TaskData | null;
  clearSelection?: () => void;
}

const TaskForm = ({ onSubmit, initialData, clearSelection }: TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-6 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold">{initialData ? 'Edit Task' : 'Create New Task'}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <textarea
            placeholder="Task Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            rows={2}
          ></textarea>
        </div>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
            {initialData ? 'Update Task' : 'Add Task'}
          </button>
          {initialData && (
            <button 
              type="button" 
              onClick={clearSelection}
              className="w-full px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;