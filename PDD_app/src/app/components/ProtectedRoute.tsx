import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) return <div className="p-10 text-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
