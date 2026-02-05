import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
    <div className="container py-5">
      <hr></hr>
      <h1>Register an account with us</h1>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Name */}
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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

        {/* Account type checkbox */}
        <div className="form-check my-3">
          <input
            type="checkbox"
            id="venueManager"
            className="form-check-input"
            checked={venueManager}
            onChange={(e) => setVenueManager(e.target.checked)}
          />
          <label htmlFor="venueManager" className="form-check-label">
            Register as Venue Manager
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Registering…' : 'Register'}
        </button>
      </form>
      <div>
        <img
          src="src/assets/images/auth/register.jpg"
          className="register-img"
          alt="Luxury hotel lounge"
        />
      </div>
    </div>
  );
}
