import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';
import logo from '../../assets/images/logo-blue.png';

export default function NavbarOther() {
  const { isAuthenticated, role, logout } = useAuthStore();

  const dashboardRoute = role === 'venue_manager' ? '/dashboard/manager' : '/dashboard/customer';

  return (
    <nav className="navbar navbar-expand-lg navbar-other bg-white py-4">
      {/* Logo */}
      <Link className="navbar-brand ps-4" to="/">
        <img src={logo} alt="Holidaze" />
      </Link>

      <div className="collapse navbar-collapse justify-content-end pe-5 gap-5">
        <ul className="navbar-nav gap-5">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link nav-link-other fw-normal text-primary" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-other fw-normal text-primary" to="/venues">
                  Venues
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link nav-link-other fw-normal text-primary" to={dashboardRoute}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Buttons */}
        <div>
          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-primary nav-login-btn">
              Login
            </Link>
          ) : (
            <button className="btn btn-cta" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
