import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/images/auth/login.jpg';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors: typeof errors = {};
    if (!email.trim()) fieldErrors.email = 'Email is required';
    if (!password.trim()) fieldErrors.password = 'Password is required';
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ ...fieldErrors, password: err.message });
      } else {
        setErrors({ ...fieldErrors, password: 'Login failed' });
      }
    }
  };

  return (
    <div className="hero py-5 mb-4 mt-4 rounded-4" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="hero-overlay rounded-4"></div>
      <div className="auth-form bg-white rounded-4 p-5 position-relative">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4">Login to your account</h1>
          <p className="auth-text fw-medium mb-4">
            Login to access your bookings, manage your profile, or update your venues — all from one
            place.
          </p>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}

          <button type="submit" className="btn btn-cta mt-4 w-100" disabled={isLoading}>
            {isLoading ? 'Logging in…' : 'Login'}
          </button>
          <p className="text-center text-neutral mt-2">
            Don't have an account? Register <Link to="/register">here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
