import { useAuthStore } from '../../stores/auth.stores';
import CustomerDashboard from './CustomerDashboard';
import ManagerDashboard from './ManagerDashboard';

export default function Dashboard() {
  const { role } = useAuthStore();

  if (role === 'venue_manager') {
    return <ManagerDashboard />;
  }

  return <CustomerDashboard />;
}
