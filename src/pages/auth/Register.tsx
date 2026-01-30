export default function Register() {
  return (
    <>
      <div className="container">
        <div>
          <img
            src="/src/assets/images/auth/register.jpg"
            alt="Luxury hotel lounge with chairs and couches"
            height={300}
          ></img>
        </div>
        <div>
          <div>
            <hr></hr>
            <h1>Register an account with us</h1>
          </div>
          <div>
            <p>
              Choose how you’d like to use <strong>Holidaze</strong> — whether booking stays or
              managing venues, your account gives you full access.
            </p>
            {/* Register form (dynamically generated) */}
            <div className="register-form"></div>
          </div>
        </div>
      </div>
    </>
  );
}
