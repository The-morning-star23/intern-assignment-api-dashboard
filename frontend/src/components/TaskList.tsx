// frontend/src/components/TaskList.tsx
import type { TaskData } from './TaskForm';
interface TaskListProps {
  tasks: TaskData[];
  onEdit: (task: TaskData) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found. Create one above!</p>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task._id} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-md">
          <div>
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-bold text-gray-800">{task.title}</h4>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{task.description}</p>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={() => onEdit(task)}
              className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Edit
            </button>
            <button 
              onClick={() => task._id && onDelete(task._id)}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;