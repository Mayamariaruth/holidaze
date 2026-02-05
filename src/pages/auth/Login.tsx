import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <div className="container">
        <div>
          <img
            src="/src/assets/images/auth/login.jpg"
            alt="Luxury hotel entrance with a fountain"
            height={300}
          ></img>
        </div>
        <div>
          <div>
            <hr></hr>
            <h1>Login to your account</h1>
          </div>
          <div>
            <p>
              Login to access your bookings, manage your profile, or update your venues — all from
              one place.
            </p>
            {/* Login form */}
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                {/* Email field */}
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@stud.noroff.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password field */}
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Button */}
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Logging in…' : 'Login'}
                </button>
                <p>Forgot your password?</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
