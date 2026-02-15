import { useAuthStore } from '../../stores/auth.stores';
import CustomerDashboard from './CustomerDashboard';
import ManagerDashboard from './ManagerDashboard';

/**
 * Main Dashboard wrapper component.
 *
 * Renders either the `ManagerDashboard` or `CustomerDashboard` depending on user role.
 *
 * @component
 * @example
 * <Dashboard />
 *
 * @remarks
 * - Uses `useAuthStore` to determine the role of the logged-in user.
 * - If role is `venue_manager`, renders `ManagerDashboard`.
 * - Otherwise renders `CustomerDashboard`.
 */
export default function Dashboard() {
  const { role } = useAuthStore();

  if (role === 'venue_manager') {
    return <ManagerDashboard />;
  }

  return <CustomerDashboard />;
}
