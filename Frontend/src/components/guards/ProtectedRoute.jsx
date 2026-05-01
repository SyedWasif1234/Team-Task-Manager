import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { PageLoader } from '../ui/Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading  , user} = useAuthStore();

  if (isLoading ) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
