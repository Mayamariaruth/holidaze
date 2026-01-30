import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuthStore();

  const dashboardRoute = role === 'venue_manager' ? '/dashboard/manager' : '/dashboard/customer';

  return (
    <nav className="navbar navbar-expand-lg">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img src="src/assets/images/logo.png" alt="Holidaze" height={40} />
      </Link>

      {/* Nav links */}
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/venues">
              Venues
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div>
          {!isAuthenticated ? (
            <Link to="/login" className="btn">
              Login
            </Link>
          ) : (
            <>
              <Link to={dashboardRoute} className="btn">
                Dashboard
              </Link>

              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
