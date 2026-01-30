import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div>
        <img src="/logo-blue.png" alt="Holidaze logo" />
        <p>
          Holidaze connects modern travellers with carefully selected places to stay, combining
          luxury and simplicity in one booking experience.
        </p>
      </div>

      <div>
        <h4>Contact</h4>
        <ul>
          <li>
            <i className="fa-solid fa-square-phone"></i> +14722771809
          </li>
          <li>
            <i className="fa-solid fa-square-envelope"></i> Holidaze@support.com
          </li>
          <li>
            <i className="fa-solid fa-square-location-dot"></i> 400 Market Street, San Francisco,
            94102 CA
          </li>
        </ul>
      </div>

      <div>
        <h4>Navigate</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/venues">Venues</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4>Follow Us</h4>
        <ul>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
