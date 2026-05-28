import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isReady, user } = useAuth();
  const location = useLocation();

  if (!isReady) return <div className="p-10 text-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const isProfileIncomplete = !user?.phone || !user?.age || !user?.gender || !(user.location || user.country);
  if (isProfileIncomplete && location.pathname !== '/create-profile') {
    return <Navigate to="/create-profile" replace />;
  }

  return children;
}
