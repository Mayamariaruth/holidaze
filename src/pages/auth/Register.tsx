import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/images/auth/register.jpg';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';

/**
 * Register page component.
 *
 * Provides a form for new users to create an account.
 * Users can register as a regular customer or as a venue manager.
 * Displays global alerts for success or failure and includes inline validation for name, email, and password.
 * Redirects to the Login page after successful registration.
 *
 * @component
 * @example
 * <Register />
 *
 * @remarks
 * - Uses `useAuth` hook for registration functionality and loading state.
 * - Inline validation ensures name, email, and password are provided.
 * - Enforces registration with a `@stud.noroff.no` email address.
 * - Users can optionally register as a venue manager via a checkbox.
 * - Shows a Loader overlay while registration request is in progress.
 * - Global alerts are automatically dismissed after 5 seconds.
 */
export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  // Inline field errors
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  // Global success/failure alert
  const [globalAlert, setGlobalAlert] = useState<{
    type: 'success' | 'danger';
    message: string;
  } | null>(null);

  /**
   * Handles form submission.
   * Validates fields, triggers registration, shows alerts, and navigates on success.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields
    const fieldErrors: typeof errors = {};
    if (!name.trim()) fieldErrors.name = 'Name is required';
    if (!email.trim()) fieldErrors.email = 'Email is required';
    else if (!email.endsWith('@stud.noroff.no'))
      fieldErrors.email = 'You must register with a stud.noroff.no email';
    if (!password.trim()) fieldErrors.password = 'Password is required';

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Perform registration API call
    try {
      await register(name, email, password, venueManager);
      setGlobalAlert({ type: 'success', message: 'Registration successful!' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';

      setGlobalAlert({ type: 'danger', message });
    }
  };

  return (
    <div
      className="auth-page py-5 mb-4 mt-4 rounded-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="hero-overlay rounded-4"></div>

      {/* Global alerts */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {globalAlert && (
          <Alert
            type={globalAlert.type}
            message={globalAlert.message}
            onClose={() => setGlobalAlert(null)}
            autoDismiss={5000}
          />
        )}
      </div>

      <div className="auth-form bg-white rounded-4 px-3 py-5 px-md-5 position-relative">
        {/* Loader overlay */}
        {isLoading && <Loader overlay size="lg" />}

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

          {/* Venue manager checkbox */}
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

          {/* Submit button */}
          <button type="submit" className="btn btn-primary mt-4 w-100" disabled={isLoading}>
            {isLoading ? 'Registering…' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
