// frontend/src/App.tsx
import React from 'react'; // ADD THIS IMPORT
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; 
};

const DashboardPlaceholder = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
      <button 
        onClick={logout} 
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;