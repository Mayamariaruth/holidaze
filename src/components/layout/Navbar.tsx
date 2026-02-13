import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.stores';
import logo from '../../assets/images/logo.png';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  const dashboardRoute = '/dashboard';

  return (
    <nav className="navbar navbar-expand-lg position-absolute w-100 py-4">
      {/* Logo */}
      <Link className="navbar-brand ps-4" to="/">
        <img src={logo} alt="Holidaze" />
      </Link>

      <div className="collapse navbar-collapse justify-content-end pe-5 gap-5 pt-3">
        <ul className="navbar-nav gap-5">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link fw-normal text-white" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-normal text-white" to="/venues">
                  Venues
                </Link>
              </li>
            </>
          ) : (
            <ul className="navbar-nav gap-5">
              <li className="nav-item">
                <Link className="nav-link fw-normal text-white" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-normal text-white" to="/venues">
                  Venues
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-normal text-white" to={dashboardRoute}>
                  Dashboard
                </Link>
              </li>
            </ul>
          )}
        </ul>

        {/* Buttons */}
        <div>
          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-outline-white nav-btn">
              Login
            </Link>
          ) : (
            <button className="btn btn-cta nav-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
