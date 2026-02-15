import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';
import type { UserRole } from '../../types/auth.types';

interface Props {
  role?: UserRole;
}

/**
 * A route guard component that protects routes based on authentication and user role.
 *
 * Renders the nested routes (`<Outlet />`) if the user is authenticated and their role
 * matches the required `role` prop. If the user is not authenticated, it redirects to the
 * login page. If the user's role does not match the required role, it redirects to the home page.
 *
 * @param {Object} props The props for the route.
 * @param {UserRole} [props.role] The required user role to access the route. If not provided, the route is accessible by any authenticated user.
 * @returns {JSX.Element} The rendered route or a redirect.
 *
 * @example
 * <ProtectedRoute role="admin" />
 */
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
