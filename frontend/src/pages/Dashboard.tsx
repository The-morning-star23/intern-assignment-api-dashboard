// frontend/src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import { useAuthStore } from '../store/authStore';
import TaskForm, { type TaskData } from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialTasks = async () => {
      try {
        const { data } = await API.get('/tasks');
        if (isMounted) setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadInitialTasks();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFormSubmit = async (taskData: TaskData) => {
    try {
      if (editingTask && editingTask._id) {
        await API.put(`/tasks/${editingTask._id}`, taskData);
        setEditingTask(null);
      } else {
        await API.post('/tasks', taskData);
      }
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        await fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 text-white bg-gray-800 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-xl font-bold">📋 Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Welcome, {user?.name}</span>
            <button onClick={logout} className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <TaskForm 
          key={editingTask ? editingTask._id : 'new-task'}
          onSubmit={handleFormSubmit} 
          initialData={editingTask} 
          clearSelection={() => setEditingTask(null)} 
        />
        <TaskList 
          tasks={tasks} 
          onEdit={(task) => setEditingTask(task)} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );
};

export default Dashboard;