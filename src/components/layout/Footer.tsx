import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-blue.png';
import footer from '../../assets/icons/footer.png';

export default function Footer() {
  return (
    <footer className="footer bg-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row d-flex justify-content-between gap-4 gap-lg-0">
          {/* Logo + description */}
          <div className="col-12 col-lg-4">
            <img src={logo} alt="Holidaze logo" className="footer-logo mb-3" height={65} />
            <p className="footer-text">
              Holidaze connects modern travellers with carefully selected places to stay, combining
              luxury and simplicity in one booking experience.
            </p>
          </div>

          {/* Contact */}
          <div className="col-12 col-lg-3 mt-lg-4">
            <h4 className="mb-3">Contact</h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li className="d-flex align-items-center">
                <i className="fa-solid fa-square-phone me-2 text-primary fs-4"></i> +14722771809
              </li>
              <li className="d-flex align-items-center">
                <i className="fa-solid fa-square-envelope me-2 text-primary fs-4"></i>{' '}
                holidaze@support.com
              </li>
              <li className="d-flex align-items-center">
                <img src={footer} alt="Location icon" className="me-2" height={19} />
                <p className="mb-0">
                  400 Market Street,
                  <br />
                  San Francisco, 94102 CA
                </p>
              </li>
            </ul>
          </div>

          {/* Navigate */}
          <div className="col-6 col-lg-2 mt-lg-4">
            <h4 className="mb-3">Navigate</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link className="text-decoration-none text-dark" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to="/venues">
                  Venues
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-dark" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-6 col-lg-2 mt-lg-4">
            <h4 className="mb-3">Follow Us</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <a className="text-decoration-none text-dark" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-dark" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-dark" href="#">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-dark" href="#">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 mt-4 text-neutral small">©2026 Holidaze. All rights reserved.</div>
      </div>
    </footer>
  );
}
