import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../../stores/auth.stores';
import logo from '../../assets/images/logo-blue.png';

export default function NavbarOther() {
  const { isAuthenticated, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardRoute = '/dashboard';

  return (
    <>
      <nav className="navbar navbar-other bg-white py-4 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand ps-4" to="/">
          <img src={logo} alt="Holidaze" />
        </Link>

        {/* Desktop menu */}
        <div className="d-none d-lg-flex align-items-center gap-5 pe-5">
          <Link className="nav-link nav-link-other fw-normal text-primary" to="/">
            Home
          </Link>
          <Link className="nav-link nav-link-other fw-normal text-primary" to="/venues">
            Venues
          </Link>

          {isAuthenticated && (
            <Link className="nav-link nav-link-other fw-normal text-primary" to={dashboardRoute}>
              Dashboard
            </Link>
          )}

          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-primary nav-btn">
              Login
            </Link>
          ) : (
            <button className="btn btn-cta nav-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="d-lg-none btn me-4"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars text-primary fs-2"></i>
        </button>
      </nav>

      {/* Mobile white overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {/* Logo */}
          <Link className="navbar-brand ps-4" to="/">
            <img className="mt-4" src={logo} alt="Holidaze" />
          </Link>
          <button
            className="btn position-absolute top-0 end-0 m-4"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-bars text-primary fs-2"></i>
          </button>

          {/* Links */}
          <div className="d-flex flex-column align-items-center justify-content-start gap-4 h-100 p-5">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/venues" onClick={() => setMenuOpen(false)}>
              Venues
            </Link>

            {isAuthenticated && (
              <Link to={dashboardRoute} onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <Link to="/login" className="btn btn-primary mt-3 nav-btn">
                Login
              </Link>
            ) : (
              <button
                className="btn btn-cta mt-3 nav-btn"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
