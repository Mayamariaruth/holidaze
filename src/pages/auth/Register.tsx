import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/images/auth/register.jpg';

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  // Track errors per field
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors: typeof errors = {};

    if (!name.trim()) fieldErrors.name = 'Name is required';
    if (!email.trim()) fieldErrors.email = 'Email is required';
    else if (!email.endsWith('@stud.noroff.no'))
      fieldErrors.email = 'You must register with a stud.noroff.no email';
    if (!password.trim()) fieldErrors.password = 'Password is required';

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) return;

    try {
      await register(name, email, password, venueManager);
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ ...fieldErrors, email: err.message });
      } else {
        setErrors({ ...fieldErrors, email: 'Registration failed' });
      }
    }
  };

  return (
    <div
      className="auth-page py-5 mb-4 mt-4 rounded-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="hero-overlay rounded-4"></div>
      <div className="auth-form bg-white rounded-4 p-5 position-relative">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-3">Register an account with us</h1>
          <p className="auth-text fw-medium mb-4">
            Choose how you’d like to use Holidaze — whether booking stays or managing venues, your
            account gives you full access.
          </p>
          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Heidi123"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="heidi@stud.noroff.no"
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
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}

          {/* Account type checkbox */}
          <div className="form-check my-3">
            <input
              type="checkbox"
              id="venueManager"
              className="form-check-input me-2"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
            <label htmlFor="venueManager" className="form-check-label">
              Register as Venue Manager
            </label>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-100" disabled={isLoading}>
            {isLoading ? 'Registering…' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
