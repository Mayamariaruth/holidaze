export default function Login() {
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
              <form>
                <label>Email</label>
                <input placeholder="name@stud.noroff.no" />
                <label>Password</label>
                <input placeholder="*********" />
                <button type="button">Login</button>
                <p>Forgot your password?</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
