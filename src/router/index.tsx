import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Venues from '../pages/venues/Venues';
import VenueDetail from '../pages/venues/VenueDetail';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard';

import { ProtectedRoute } from '../components/layout/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer dashboard */}
      <Route element={<ProtectedRoute role="customer" />}>
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      </Route>

      {/* Venue manager dashboard */}
      <Route element={<ProtectedRoute role="venue_manager" />}>
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
      </Route>
    </Routes>
  );
}
