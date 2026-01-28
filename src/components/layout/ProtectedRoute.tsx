import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';
import type { UserRole } from '../../types/auth.types';

interface Props {
  role?: UserRole;
}

export function ProtectedRoute({ role }: Props) {
  const { isAuthenticated, role: userRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
